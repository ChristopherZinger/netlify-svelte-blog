import { getTagBySlug } from '$lib/retrievers/tags';
import { ContentType } from '$lib/schemas';
import { getDraftCollectionRef, getDraftContentCollectionRef } from '$lib/server/collections';
import { error } from '@sveltejs/kit';
import { compact } from 'lodash';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
	const draftSlug = (url.searchParams as URLSearchParams).get('doc_slug');

	if (!draftSlug) {
		return error(404, 'draft-not-found');
	}

	const [draft, content] = await Promise.all([
		(await getDraftCollectionRef().doc(draftSlug).get()).data(),
		(await getDraftContentCollectionRef(draftSlug).doc(ContentType.markdown).get()).data()
	]);

	if (!draft || !content) {
		throw error(404, 'Not found');
	}

	const tags = compact(await Promise.all(draft.tags.map(async (t) => await getTagBySlug(t))));

	const data = {
		draft,
		content,
		tags
	};

	return data;
}
