import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const res = await fetch(
		'https://raw.githubusercontent.com/ChristopherZinger/netlify-svelte-blog/master/README.md'
	);

	if (res.ok) {
		const data = await res.text();

		return {
			data
		};
	}

	throw error(500, 'Could not load content');
}
