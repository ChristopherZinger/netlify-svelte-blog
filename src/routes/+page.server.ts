import {
	LOGBOOK_CATEGORY_ID,
	SUPPORTED_THREAD_SLUGS
} from '$lib/schemas';
import {
	getWordpressCategories,
	getWordpressPosts,
	getWordpressTags
} from '$lib/wordpress/wordpressApiUtils';

export async function load() {
	const [tags, posts, logBooks, categories] = await Promise.all([
		getWordpressTags(),
		getWordpressPosts({
			limit: 100,
			categories_exclude: [LOGBOOK_CATEGORY_ID]
		}),
		getWordpressPosts({ limit: 100, category: LOGBOOK_CATEGORY_ID }),
		getWordpressCategories({ limit: 100 })
	]);

	return {
		tags,
		posts,
		logBooks,
		categories: categories.filter((c) =>
			SUPPORTED_THREAD_SLUGS.includes(c.slug)
		)
	};
}
