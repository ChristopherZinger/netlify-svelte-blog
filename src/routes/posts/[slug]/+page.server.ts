import { THREAD_CATEGORY_ID } from '$lib/schemas';
import {
	getWordpressCategories,
	getWordpressPosts
} from '$lib/wordpress/wordpressApiUtils.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const { slug } = params;

	if (!slug) {
		throw error(404, 'Not found');
	}

	const posts = await getWordpressPosts({ limit: 1, slug, page: 1 });

	if (!Array.isArray(posts) || !posts[0]) {
		throw error(404, 'Not found');
	}

	const post = posts[0];

	const threads = (
		await Promise.all(
			post.categories.map((id) =>
				getWordpressCategories({ id, limit: 1 })
			)
		)
	)
		.flat()
		.filter((c) => c.parent === THREAD_CATEGORY_ID);

	return { post, threads };
}
