import { ContentType } from '$lib/schemas';
import {
	getSeriesPostCollectionRef,
	getSeriesPostContentCollectionRef
} from '$lib/server/collections';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const { post_slug, series_slug } = params;
	const [post, content] = await Promise.all([
		(await getSeriesPostCollectionRef({ series: series_slug }).doc(post_slug).get())?.data(),
		(
			await getSeriesPostContentCollectionRef({ series: series_slug, postId: post_slug })
				.doc(ContentType.html)
				.get()
		).data()
	]);

	if (!post || !content) {
		throw error(404, 'Not found');
	}

	return {
		post,
		content
	};
}
