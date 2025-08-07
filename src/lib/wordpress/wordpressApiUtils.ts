import type {
	Category_WP,
	Page_WP,
	Post_WP,
	Tag_WP
} from '$lib/schemas';
import { appendPathItemToUrl, wordpressApiUrl } from './url';

export async function getWordpressTags(
	{ limit }: { limit: number } = { limit: 10 }
): Promise<Tag_WP[]> {
	const url = new URL(wordpressApiUrl);
	appendPathItemToUrl(url, 'tags');
	url.searchParams.set('per_page', limit.toString());
	const result = await (await fetch(url)).json();
	return result;
}

export async function getWordpressTagById(
	id: string
): Promise<Tag_WP> {
	const url = new URL(wordpressApiUrl);
	appendPathItemToUrl(url, 'tags');
	appendPathItemToUrl(url, id);
	const response = await fetch(url);
	const result = await response.json();
	return result;
}

export async function getWordpressPosts({
	limit = 10,
	category,
	categories_exclude,
	slug,
	page = 1,
	tags
}: {
	limit: number;
	category?: number;
	categories_exclude?: number[];
	slug?: string;
	page: number;
	tags?: number[];
}): Promise<Post_WP[]> {
	const url = new URL(wordpressApiUrl);
	appendPathItemToUrl(url, 'posts');
	url.searchParams.set('per_page', limit.toString());

	if (category) {
		url.searchParams.set('categories', category.toString());
	}

	if (categories_exclude && categories_exclude.length > 0) {
		url.searchParams.set(
			'categories_exclude',
			categories_exclude.join(',')
		);
	}

	if (slug) {
		url.searchParams.set('slug', slug);
	}

	if (tags && tags.length > 0) {
		url.searchParams.set('tags', tags.join(','));
	}

	url.searchParams.set('page', page.toString());

	const result = await (await fetch(url)).json();
	return result;
}

export async function getWordpressPostById(
	id: number | string
): Promise<Post_WP> {
	const url = new URL(wordpressApiUrl);
	appendPathItemToUrl(url, 'posts');
	appendPathItemToUrl(url, id.toString());
	const result = await (await fetch(url)).json();
	return result;
}

export async function getWordpressCategories<
	T extends string | undefined = undefined
>(
	{ limit, slug, id }: { limit: number; slug?: T; id?: number } = {
		limit: 10
	}
): Promise<T extends string ? Category_WP : Category_WP[]> {
	const url = new URL(wordpressApiUrl);
	appendPathItemToUrl(url, 'categories');
	url.searchParams.set('per_page', limit.toString());

	if (id !== undefined) {
		appendPathItemToUrl(url, id.toString());
		const result = await (await fetch(url)).json();
		return result;
	}

	if (slug) {
		url.searchParams.set('slug', slug);
	}

	const result = await (await fetch(url)).json();

	return slug ? result[0] : result;
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
