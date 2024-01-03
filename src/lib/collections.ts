import {
	collection,
	collectionGroup,
	CollectionReference,
	doc,
	DocumentReference,
	getFirestore,
	Query,
	QueryDocumentSnapshot,
	type FirestoreDataConverter
} from 'firebase/firestore';
import {
	CollectionName,
	type About_FsDoc,
	type PostContent_FsDoc,
	type Post_WP,
	type Category_WP,
	type Tag_WP
} from './schemas';
import type { DocumentData } from 'firebase/firestore';

const getBaseConverter = <T extends DocumentData>(): FirestoreDataConverter<T> => ({
	toFirestore: (item: T) => item,
	fromFirestore: (snapshot: QueryDocumentSnapshot<T>, options) => {
		const data = snapshot.data(options);
		return {
			...data
		};
	}
});
const getCollectionRef = <T extends DocumentData>(
	collectionName: string,
	base: null | DocumentReference = null
) =>
	base
		? collection(base, collectionName).withConverter(getBaseConverter<T>())
		: collection(getFirestore(), collectionName).withConverter(getBaseConverter<T>());

const getCollectionGroupRef = <T extends DocumentData>(collectionName: string) =>
	collectionGroup(getFirestore(), collectionName).withConverter(getBaseConverter<T>());

export const getIndependentPostCollectionRef = (): CollectionReference<Post_WP> =>
	getCollectionRef<Post_WP>(CollectionName.posts);

export const getSeriesPostCollectionRef = (seriesSlug: string): CollectionReference<Post_WP> => {
	return getCollectionRef<Post_WP>(
		CollectionName.posts,
		doc(getCollectionRef(CollectionName.series), seriesSlug)
	);
};

export const getPostCollectionGroupRef = (): Query<Post_WP> =>
	getCollectionGroupRef<Post_WP>(CollectionName.posts);

export const getTagCollectionReference = (): CollectionReference<Tag_WP> =>
	getCollectionRef<Tag_WP>(CollectionName.tags);

export const getSeriesCollectionReference = (): CollectionReference<Category_WP> =>
	getCollectionRef<Category_WP>(CollectionName.series);

export const getSeriesPostsCollectionReference = (
	seriesName: string
): CollectionReference<Post_WP> =>
	collection(
		getFirestore(),
		`${CollectionName.series}/${seriesName}/${CollectionName.posts}`
	).withConverter(getBaseConverter<Post_WP>());

export const getIndependentPostContentCollectionRef = (
	postId: string
): CollectionReference<PostContent_FsDoc> =>
	getCollectionRef<PostContent_FsDoc>(
		CollectionName.content,
		doc(getIndependentPostCollectionRef(), postId)
	);

export const getSeriesPostContentCollectionRef = (
	seriesSlug: string,
	postSlug: string
): CollectionReference<PostContent_FsDoc> =>
	getCollectionRef<PostContent_FsDoc>(
		CollectionName.content,
		doc(getSeriesPostCollectionRef(seriesSlug), postSlug)
	);

export const getPostContentCollectionGroupRef = (): Query<PostContent_FsDoc> => {
	return getCollectionGroupRef(CollectionName.content);
};

export const getDraftCollectionRef = (): CollectionReference<Post_WP> => {
	return getCollectionRef<Post_WP>(CollectionName.drafts);
};

export const getDraftContentCollectionRef = (
	draftSlug: string
): CollectionReference<PostContent_FsDoc> => {
	return getCollectionRef<PostContent_FsDoc>(
		CollectionName.content,
		doc(getDraftCollectionRef(), draftSlug)
	);
};

export const getAboutCollectionRef = () => {
	return getCollectionRef<About_FsDoc>(CollectionName.about, null);
};
