import type { Category_WP, Page_WP, Post_WP, Tag_WP } from '$lib/schemas';
import { appendPathItemToUrl, wordpressApiUrl } from './url';

export async function getWordpressTags(limit = 10): Promise<Tag_WP[]> {
	const url = new URL(wordpressApiUrl);
	appendPathItemToUrl(url, 'tags');
	url.searchParams.set('per_page', limit.toString());
	const result = await (await fetch(url)).json();
	return result;
}

export async function getWordpressTagById(id: string): Promise<Tag_WP> {
	const url = new URL(wordpressApiUrl);
	appendPathItemToUrl(url, 'tags');
	appendPathItemToUrl(url, id);
	const response = await fetch(url);
	const result = await response.json();
	return result;
}

export async function getWordpressPosts(
	{
		limit,
		category,
		slug
	}: {
		limit: number;
		category?: number;
		slug?: string;
	} = { limit: 10 }
): Promise<Post_WP[]> {
	const url = new URL(wordpressApiUrl);
	appendPathItemToUrl(url, 'posts');
	url.searchParams.set('per_page', (limit || 10).toString());

	if (category) {
		url.searchParams.set('categories', category.toString());
	}

	if (slug) {
		url.searchParams.set('slug', slug);
	}

	const result = await (await fetch(url)).json();
	return result;
}

export async function getWordpressPostById(id: number | string): Promise<Post_WP> {
	const url = new URL(wordpressApiUrl);
	appendPathItemToUrl(url, 'posts');
	appendPathItemToUrl(url, id.toString());
	const result = await (await fetch(url)).json();
	return result;
}

export async function getWordpressCategories(
	{ limit, slug }: { limit: number; slug?: string } = { limit: 10 }
): Promise<Category_WP[]> {
	const url = new URL(wordpressApiUrl);
	appendPathItemToUrl(url, 'categories');
	url.searchParams.set('per_page', limit.toString());

	if (slug) {
		url.searchParams.set('slug', slug);
	}

	const result = await (await fetch(url)).json();
	return result;
}

export async function getWordpressPages(
	{ limit, slug }: { limit: number; slug?: string } = { limit: 10 }
): Promise<Page_WP[]> {
	const url = new URL(wordpressApiUrl);
	appendPathItemToUrl(url, 'pages');
	url.searchParams.set('per_page', limit.toString());

	if (slug) {
		url.searchParams.set('slug', slug);
	}

	const result = await (await fetch(url)).json();
	return result;
}
