import type { Post_FsDoc } from '$lib/schemas';

export const getPostUrl = (post: Post_FsDoc): string => {
	const base = post.seriesSlug ? `/series/${post.seriesSlug}` : '/posts';
	return [base, post.slug].join('/');
};
