import { getSeriesCollectionRef, getSeriesPostCollectionRef } from '$lib/server/collections';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const { series_slug } = params;
	const [posts, series] = await Promise.all([
		(await getSeriesPostCollectionRef({ series: series_slug }).get()).docs.map((s) => s.data()),
		(await getSeriesCollectionRef().doc(series_slug).get())?.data()
	]);

	if (!series) {
		throw error(404, 'Not found');
	}

	return {
		posts,
		series
	};
}
