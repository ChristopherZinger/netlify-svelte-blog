import {
	CollectionName,
	type About_FsDoc,
	type PostContent_FsDoc,
	type Post_WP,
	type Category_WP,
	type Tag_WP
} from '$lib/schemas';
import type admin from 'firebase-admin';
import { getFirestoreAdmin } from './firebase-admin';

export const getBaseConverter = <
	T extends admin.firestore.DocumentData
>(): admin.firestore.FirestoreDataConverter<T> => ({
	toFirestore: (item: T) => item,
	fromFirestore: (snapshot: admin.firestore.QueryDocumentSnapshot<T>) => {
		const data = snapshot.data();
		return {
			...data
		};
	}
});

const firestore = getFirestoreAdmin();

export const getDraftCollectionRef = () =>
	firestore.collection(CollectionName.drafts).withConverter(getBaseConverter<Post_WP>());

export const getDraftContentCollectionRef = (slug: string) =>
	getDraftCollectionRef()
		.doc(slug)
		.collection(CollectionName.content)
		.withConverter(getBaseConverter<PostContent_FsDoc>());

export const getAboutCollectionRef = () =>
	firestore.collection(CollectionName.about).withConverter(getBaseConverter<About_FsDoc>());

export const getTagsCollectionRef = () =>
	firestore.collection(CollectionName.tags).withConverter(getBaseConverter<Tag_WP>());

export const getIndependentPostCollectionRef = () =>
	firestore.collection(CollectionName.posts).withConverter(getBaseConverter<Post_WP>());

export const getPostCollectionGroupRef = () =>
	firestore.collectionGroup(CollectionName.posts).withConverter(getBaseConverter<Post_WP>());

export const getIndependentPostContentCollectionRef = ({ postId }: { postId: string }) =>
	getIndependentPostCollectionRef()
		.doc(postId)
		.collection(CollectionName.content)
		.withConverter(getBaseConverter<PostContent_FsDoc>());

export const getSeriesCollectionRef = () =>
	firestore.collection(CollectionName.series).withConverter(getBaseConverter<Category_WP>());

export const getSeriesPostCollectionRef = ({ series }: { series: string }) =>
	getSeriesCollectionRef()
		.doc(series)
		.collection(CollectionName.posts)
		.withConverter(getBaseConverter<Post_WP>());

export const getSeriesPostContentCollectionRef = ({
	series,
	postId
}: {
	series: string;
	postId: string;
}) =>
	getSeriesPostCollectionRef({ series })
		.doc(postId)
		.collection(CollectionName.content)
		.withConverter(getBaseConverter<PostContent_FsDoc>());
