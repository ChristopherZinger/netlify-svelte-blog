import { getSeriesPostCollectionRef, getTagsCollectionRef } from '$lib/server/collections';
import { getPostCollectionGroupRef, getSeriesCollectionRef } from '$lib/server/collections';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const [latestPosts, series, tags] = await Promise.all([
		(
			await getPostCollectionGroupRef().limit(6).orderBy('createdAt', 'desc').get()
		).docs.map((s) => s.data()),
		(
			await getSeriesCollectionRef().limit(4).orderBy('createdAt', 'desc').get()
		).docs.map((s) => s.data()),
		(await getTagsCollectionRef().get()).docs.map((s) => s.data())
	]);

	const seriesWithPosts = await Promise.all(
		series.map(async (series) => {
			const posts = (await getSeriesPostCollectionRef({ series: series.slug }).get()).docs.map(
				(s) => s.data()
			);

			return {
				series,
				posts
			};
		})
	);

	return {
		latestPosts,
		seriesWithPosts,
		tags
	};
}
