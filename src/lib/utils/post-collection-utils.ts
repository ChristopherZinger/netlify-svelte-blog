import {
	getIndependentPostCollectionRef,
	getIndependentPostContentCollectionRef,
	getSeriesPostCollectionRef,
	getSeriesPostContentCollectionRef
} from '$lib/collections';

export const getPostCollectionRefForPost = (post: { seriesSlug: string | null }) => {
	return post.seriesSlug
		? getSeriesPostCollectionRef(post.seriesSlug)
		: getIndependentPostCollectionRef();
};

export const getPostContentCollectionRefForPost = (post: {
	slug: string;
	seriesSlug: string | null;
}) => {
	return post.seriesSlug
		? getSeriesPostContentCollectionRef(post.seriesSlug, post.slug)
		: getIndependentPostContentCollectionRef(post.slug);
};
