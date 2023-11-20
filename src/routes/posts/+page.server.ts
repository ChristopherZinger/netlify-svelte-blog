import { getPostCollectionGroupRef, getTagsCollectionRef } from '$lib/server/collections';

export async function load() {
	const [posts, tags] = await Promise.all([
		(
			await getPostCollectionGroupRef().orderBy('createdAt', 'desc').get()
		).docs.map((s) => s.data()),
		(await getTagsCollectionRef().get()).docs.map((s) => s.data())
	]);

	return {
		posts,
		tags
	};
}
