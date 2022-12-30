import { getPostCollectionGroupRef, getTagsCollectionRef } from '$lib/server/collections';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const [posts, tags] = await Promise.all([
		(await getPostCollectionGroupRef().get()).docs.map((s) => s.data()),
		(await getTagsCollectionRef().get()).docs.map((s) => s.data())
	]);

	return {
		posts,
		tags
	};
}
