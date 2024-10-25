import type { SeriesWithPosts } from '$lib/components/homePage/HomePage.svelte';
import {
	getWordpressCategories,
	getWordpressPosts,
	getWordpressTags
} from '$lib/wordpress/wordpressApiUtils';

export async function load() {
	const [tags, posts] = await Promise.all([
		getWordpressTags(),
		getWordpressPosts({ limit: 12 }),
		getWordpressCategories({ limit: 3 })
	]);

	return { tags, posts };
}
