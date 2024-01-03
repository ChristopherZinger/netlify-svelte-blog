import type { Post_WP } from '$lib/schemas';

export const getPostUrl = (post: Post_WP): string => {
	const base = post.seriesSlug ? `/series/${post.seriesSlug}` : '/posts';
	return [base, post.slug].join('/');
};
