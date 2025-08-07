import { LOGBOOK_CATEGORY_ID } from '$lib/schemas';
import { getWordpressPosts } from './wordpressApiUtils';

export async function getPosts({
	limit,
	page = 1,
	tags
}: {
	limit: number;
	page?: number;
	tags?: number[];
}) {
	return await getWordpressPosts({
		limit,
		categories_exclude: [LOGBOOK_CATEGORY_ID],
		page,
		tags
	});
}

export async function getLogBooks({
	limit,
	page = 1,
	tags
}: {
	limit: number;
	page?: number;
	tags?: number[];
}) {
	return await getWordpressPosts({
		limit,
		category: LOGBOOK_CATEGORY_ID,
		page,
		tags
	});
}
