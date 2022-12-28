import { TIER } from '$lib/firebase';
import * as publicData from '$env/static/public';
import { z } from 'zod';

/** @type {import('./$types').LayoutLoad} */
export function load() {
	const { PUBLIC_STAGING_OR_PROD } = publicData as any;
	const tier = z.nativeEnum(TIER).parse(PUBLIC_STAGING_OR_PROD);

	return { tier };
}
