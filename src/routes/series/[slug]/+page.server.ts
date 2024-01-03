import { getWordpressCategories, getWordpressPosts } from '$lib/wordpress/wordpressApiUtils.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const slug = params.slug;

	const categories = await getWordpressCategories({ limit: 1, slug });

	if (!Array.isArray(categories) || !categories[0]) {
		throw error(404, 'Not found');
	}

	const series = categories[0];

	const posts = await getWordpressPosts({ limit: 100, category: series.id });

	return {
		posts,
		series
	};
}
