import {
	collection,
	collectionGroup,
	CollectionReference,
	getFirestore,
	Query,
	QueryDocumentSnapshot,
	type FirestoreDataConverter
} from 'firebase/firestore';
import { CollectionName, type Post_FsDoc, type Series_FsDoc, type Tag_FsDoc } from './schemas';
import type { DocumentData } from 'firebase/firestore';

const firestore = getFirestore();

const getBaseConverter = <T extends DocumentData>(): FirestoreDataConverter<T> => ({
	toFirestore: (item: T) => item,
	fromFirestore: (snapshot: QueryDocumentSnapshot<T>, options) => {
		const data = snapshot.data(options);
		return {
			...data,
			id: snapshot.id
		};
	}
});
const getCollectionRef = <T extends DocumentData>(collectionName: string) =>
	collection(firestore, collectionName).withConverter(getBaseConverter<T>());

const getCollectionGroupRef = <T extends DocumentData>(collectionName: string) =>
	collectionGroup(firestore, collectionName).withConverter(getBaseConverter<T>());

export const getPostCollectionRef = (): CollectionReference<Post_FsDoc> =>
	getCollectionRef<Post_FsDoc>(CollectionName.posts);

export const getPostCollectionGroupRef = (): Query<Post_FsDoc> =>
	getCollectionGroupRef<Post_FsDoc>(CollectionName.posts);

export const getTagCollectionReference = (): CollectionReference<Tag_FsDoc> =>
	getCollectionRef<Tag_FsDoc>(CollectionName.tags);

export const getSeriesCollectionReference = (): CollectionReference<Series_FsDoc> =>
	getCollectionRef<Series_FsDoc>(CollectionName.series);

export const getSeriesPostsCollectionReference = (
	seriesName: string
): CollectionReference<Post_FsDoc> =>
	collection(
		firestore,
		`${CollectionName.series}/${seriesName}/${CollectionName.posts}`
	).withConverter(getBaseConverter<Post_FsDoc>());
