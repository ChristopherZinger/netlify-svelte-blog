import { getAboutCollectionRef } from '$lib/server/collections';
import { getWordpressPages } from '$lib/wordpress/wordpressApiUtils';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const pages = await getWordpressPages({ limit: 1, slug: 'about' });

	if (!Array.isArray(pages) || !pages[0]) {
		throw error(404, 'Not found');
	}

	return {
		about: pages[0]
	};
}
