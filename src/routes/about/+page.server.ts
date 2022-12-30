import { getAboutCollectionRef } from '$lib/server/collections';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const about = (await getAboutCollectionRef().get()).docs.map((s) => s.data())[0];

	if (!about) {
		throw error(404, 'Not found');
	}

	return {
		about
	};
}
