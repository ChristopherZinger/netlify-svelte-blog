import { getSeriesCollectionRef } from '$lib/server/collections';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const series = (await getSeriesCollectionRef().get()).docs.map((s) => s.data());

	return {
		series
	};
}
