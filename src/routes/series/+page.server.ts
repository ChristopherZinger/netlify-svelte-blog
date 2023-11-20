import { getSeriesCollectionRef } from '$lib/server/collections';

export async function load() {
	const series = (await getSeriesCollectionRef().orderBy('createdAt', 'desc').get()).docs.map((s) =>
		s.data()
	);

	return {
		series
	};
}
