import type { SeriesWithPosts } from '$lib/components/homePage/HomePage.svelte';
import {
	getWordpressCategories,
	getWordpressPosts,
	getWordpressTags
} from '$lib/wordpress/wordpressApiUtils';

export async function load() {
	const [tags, posts, categories] = await Promise.all([
		getWordpressTags(),
		getWordpressPosts( {limit: 8}),
		getWordpressCategories({ limit: 3 })
	]);

	const postPerCategory = (
		await Promise.all(categories.map((c) => getWordpressPosts({ limit: 100, category: c.id })))
	).flat();

	const seriesWithPosts: SeriesWithPosts[] = [];

	const definedCategories = categories.filter((c) => c.id !== 1);

	definedCategories.forEach((c) => {
		seriesWithPosts.push({
			category: c,
			posts: postPerCategory.filter((p) => p.categories.includes(c.id))
		});
	});

	return { tags, posts, seriesWithPosts };
}
