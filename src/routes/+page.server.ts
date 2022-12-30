import { CollectionName, type Post_FsDoc, type Series_FsDoc } from '$lib/schemas';
import { getBaseConverter } from '$lib/server/collections';
import { getFirestoreAdmin } from '$lib/server/firebase-admin';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const firestore = getFirestoreAdmin();

	const [latestPosts, series] = await Promise.all([
		(
			await firestore
				.collectionGroup(CollectionName.posts)
				.limit(6)
				.orderBy('createdAt', 'desc')
				.withConverter(getBaseConverter<Post_FsDoc>())
				.get()
		).docs.map((s) => s.data()),
		(
			await firestore
				.collection(CollectionName.series)
				.limit(4)
				.orderBy('createdAt', 'desc')
				.withConverter(getBaseConverter<Series_FsDoc>())
				.get()
		).docs.map((s) => s.data())
	]);

	const seriesWithPosts = await Promise.all(
		series.map(async (series) => {
			const posts = (
				await firestore
					.collection(CollectionName.series)
					.doc(series.slug)
					.collection(CollectionName.posts)
					.withConverter(getBaseConverter<Post_FsDoc>())
					.get()
			).docs.map((s) => s.data());

			return {
				series,
				posts
			};
		})
	);

	return {
		latestPosts,
		seriesWithPosts
	};
}
