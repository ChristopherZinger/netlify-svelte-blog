import { LOGBOOK_CATEGORY_ID } from '$lib/schemas';
import {
	getWordpressPosts,
	getWordpressTags
} from '$lib/wordpress/wordpressApiUtils';

export async function load() {
	const [tags, posts, logBooks] = await Promise.all([
		getWordpressTags(),
		getWordpressPosts({
			limit: 100,
			categories_exclude: [LOGBOOK_CATEGORY_ID]
		}),
		getWordpressPosts({ limit: 100, category: LOGBOOK_CATEGORY_ID })
	]);

	return { tags, posts, logBooks };
}
