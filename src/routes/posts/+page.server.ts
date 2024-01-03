import { getWordpressPosts, getWordpressTags } from '$lib/wordpress/wordpressApiUtils';

export async function load() {
	const [tags, posts] = await Promise.all([getWordpressTags(), getWordpressPosts({ limit: 100 })]);

	return {
		posts,
		tags
	};
}
