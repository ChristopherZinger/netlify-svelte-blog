import { AppError } from '$lib/utils/AppError';
import { doc, getDoc, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import {
	getIndependentPostContentCollectionRef,
	getPostCollectionGroupRef,
	getIndependentPostCollectionRef,
	getSeriesPostsCollectionReference,
	getSeriesPostContentCollectionRef,
	getPostContentCollectionGroupRef
} from '../collections';
import { ContentType, type PostContent_FsDoc, type Post_FsDoc } from '../schemas';

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

export const getSeriesPost = async (
	seriesSlug: string,
	postSlug: string
): Promise<Post_FsDoc | undefined> =>
	(await getDoc(doc(getSeriesPostsCollectionReference(seriesSlug), postSlug)))?.data();

export const getPostBySlug = async (slug: string): Promise<Post_FsDoc | undefined> => {
	const posts = (await getDocs(query(getPostCollectionGroupRef(), where('slug', '==', slug)))).docs;
	if (posts.length > 1) {
		throw new AppError('post_slug_is_not_unique');
	}
	return posts[0]?.data() || undefined;
};

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

export const getPostContentBySlug = async (
	slug: string
): Promise<PostContent_FsDoc | undefined> => {
	const markdowns = (
		await getDocs(query(getPostContentCollectionGroupRef(), where('postId', '==', slug)))
	).docs.filter((s) => s.id === ContentType.markdown);
	if (markdowns.length > 1) {
		throw new AppError('post_slug_is_not_unique_for_markdown');
	}
	return markdowns[0]?.data() || undefined;
};
