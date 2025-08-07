import { SUPPORTED_THREAD_SLUGS } from '$lib/schemas';
import {
	getLogBooks,
	getPosts
} from '$lib/wordpress/posts-retrieval-utils';
import {
	getWordpressCategories,
	getWordpressTags
} from '$lib/wordpress/wordpressApiUtils';

export async function load() {
	const [tags, posts, logBooks, categories] = await Promise.all([
		getWordpressTags({ limit: 100 }),
		getPosts({ limit: 15 }),
		getLogBooks({ limit: 15 }),
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
