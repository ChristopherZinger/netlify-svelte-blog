import { ContentType } from '$lib/schemas';
import {
	getIndependentPostCollectionRef,
	getIndependentPostContentCollectionRef
} from '$lib/server/collections';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const { id } = params;

	if (!id) {
		throw error(404, 'Not found');
	}

	const [post, content] = await Promise.all([
		(await getIndependentPostCollectionRef().doc(id).get())?.data(),
		(
			await getIndependentPostContentCollectionRef({ postId: id }).doc(ContentType.html).get()
		)?.data()
	]);

	if (!post || !content) {
		throw error(404, 'Not found');
	}

	return {
		post,
		content
	};
}
