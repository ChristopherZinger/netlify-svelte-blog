import { doc, getDoc, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import {
	getIndependentPostContentCollectionRef,
	getPostCollectionGroupRef,
	getIndependentPostCollectionRef,
	getSeriesPostsCollectionReference,
	getSeriesPostContentCollectionRef
} from '../collections';
import { ContentType, type PostContent_FsDoc, type Post_FsDoc } from '../schemas';

export const getSeriesPost = async (
	seriesSlug: string,
	postSlug: string
): Promise<Post_FsDoc | undefined> =>
	(await getDoc(doc(getSeriesPostsCollectionReference(seriesSlug), postSlug)))?.data();

export const getSeriesPosts = async (seriesSlug: string): Promise<Post_FsDoc[]> =>
	(await getDocs(getSeriesPostsCollectionReference(seriesSlug)))?.docs.map((s) => s.data());

export const getPostsForTag = async (tagSlug: string): Promise<Post_FsDoc[]> =>
	(
		await getDocs(
			query(
				getPostCollectionGroupRef(),
				orderBy('createdAt', 'desc'),
				where('tags', 'array-contains', tagSlug)
			)
		)
	).docs.map((s) => s.data());

export const getLatestPosts = async (): Promise<Post_FsDoc[]> => {
	return (
		await getDocs(query(getPostCollectionGroupRef(), limit(6), orderBy('createdAt', 'desc')))
	).docs.map((s) => s.data());
};

export const getAllPosts = async (): Promise<Post_FsDoc[]> =>
	(await getDocs(query(getPostCollectionGroupRef(), orderBy('createdAt', 'desc')))).docs.map((s) =>
		s.data()
	);

// SINGLE POSTS
export const getIndependentPostDocForId = async (postId: string): Promise<Post_FsDoc | undefined> =>
	(await getDoc(doc(getIndependentPostCollectionRef(), postId)))?.data();

// POST CONTENT
export const getIndependentPostHtmlContentDocForId = async (
	postId: string
): Promise<PostContent_FsDoc | undefined> =>
	(await getDoc(doc(getIndependentPostContentCollectionRef(postId), ContentType.html)))?.data();

export const getSeriesPostHtmlContentDocForId = async (seriesSlug: string, postSlug: string) => {
	return (
		await getDoc(doc(getSeriesPostContentCollectionRef(seriesSlug, postSlug), ContentType.html))
	)?.data();
};
