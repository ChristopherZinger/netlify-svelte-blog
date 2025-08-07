import {
	getWordpressCategories,
	getWordpressPosts
} from '$lib/wordpress/wordpressApiUtils';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const { categorySlug } = params;

	const category = await getWordpressCategories({
		slug: categorySlug,
		limit: 1
	});

	if (!category) {
		throw error(404, 'Not found');
	}

	const [posts] = await Promise.all([
		getWordpressPosts({
			limit: 15,
			category: category.id,
			page: 1
		})
	]);

	return { posts, category };
}
