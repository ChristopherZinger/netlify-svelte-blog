import { doc, getDoc, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import {
	getIndependentPostContentCollectionRef,
	getPostCollectionGroupRef,
	getPostCollectionRef,
	getSeriesCollectionReference,
	getSeriesPostsCollectionReference,
	getTagCollectionReference
} from './collections';
import {
	ContentType,
	type PostContent_FsDoc,
	type Post_FsDoc,
	type Series_FsDoc,
	type Tag_FsDoc
} from './schemas';

export const getAllTags = async (): Promise<Tag_FsDoc[]> =>
	(await getDocs(getTagCollectionReference())).docs.map((s) => s.data());

export const getAllSeries = async (): Promise<Series_FsDoc[]> =>
	(await getDocs(query(getSeriesCollectionReference(), orderBy('createdAt', 'desc')))).docs.map(
		(s) => s.data()
	);

export const getLatestSeries = async (): Promise<Series_FsDoc[]> =>
	(
		await getDocs(query(getSeriesCollectionReference(), limit(4), orderBy('createdAt', 'desc')))
	).docs.map((s) => s.data());

export const getAllPosts = async (): Promise<Post_FsDoc[]> =>
	(await getDocs(query(getPostCollectionGroupRef(), orderBy('createdAt', 'desc')))).docs.map((s) =>
		s.data()
	);

export const getPostsForTag = async (tag: string): Promise<Post_FsDoc[]> =>
	(
		await getDocs(
			query(
				getPostCollectionGroupRef(),
				orderBy('createdAt', 'desc'),
				where('tags', 'array-contains', tag)
			)
		)
	).docs.map((s) => s.data());

export const getLatestPosts = async (): Promise<Post_FsDoc[]> =>
	(
		await getDocs(query(getPostCollectionGroupRef(), limit(6), orderBy('createdAt', 'desc')))
	).docs.map((s) => s.data());

export const getSeriesPosts = async (seriesName: string): Promise<Post_FsDoc[]> =>
	(await getDocs(getSeriesPostsCollectionReference(seriesName))).docs.map((s) => s.data());

export const getIndependentPostDocForId = async (postId: string): Promise<Post_FsDoc | undefined> =>
	(await getDoc(doc(getPostCollectionRef(), postId)))?.data();

export const getIndependentPostHtmlContentDocForId = async (
	postId: string
): Promise<PostContent_FsDoc | undefined> =>
	(await getDoc(doc(getIndependentPostContentCollectionRef(postId), ContentType.html)))?.data();

export const getTags = async (): Promise<Tag_FsDoc[]> =>
	(await getDocs(query(getTagCollectionReference(), limit(8)))).docs.map((s) => s.data());
