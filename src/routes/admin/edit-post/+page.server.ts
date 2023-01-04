/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
	const draftSlug = (url.searchParams as URLSearchParams).get('doc_slug');

	const data = {};

	return data;
}
