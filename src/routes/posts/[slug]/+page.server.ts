import { getWordpressPosts } from '$lib/wordpress/wordpressApiUtils.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const { slug } = params;

	console.log('slug: slug', slug);

	if (!slug) {
		throw error(404, 'Not found');
	}

	const posts = await getWordpressPosts({ limit: 1, slug });

	if (!Array.isArray(posts) || !posts[0]) {
		throw error(404, 'Not found');
	}

	return {
		post: posts[0]
	};
}
