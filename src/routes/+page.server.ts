import { error } from '@sveltejs/kit';
import { marked } from 'marked';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const res = await fetch(
		'https://raw.githubusercontent.com/ChristopherZinger/netlify-svelte-blog/master/README.md'
	);

	if (res.ok) {
		const data = await res.text();

		const htmlData = marked.parse(data);

		return {
			data: htmlData
		};
	}

	throw error(500, 'Could not load content');
}
