import { getWordpressCategories } from '$lib/wordpress/wordpressApiUtils';

export async function load() {
	const categories = await getWordpressCategories({ limit: 100 });

	const definedCategories = categories.filter((c) => c.id !== 1);

	return {
		series: definedCategories
	};
}
