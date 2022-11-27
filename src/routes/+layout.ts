import { getFirebaseConf, TIER } from '$lib/firebase';
import { initializeApp } from 'firebase/app';
import { PUBLIC_STAGING_OR_PROD } from '$env/static/public';
import { z } from 'zod';

/** @type {import('./$types').LayoutLoad} */
export function load() {
	const tier = z.nativeEnum(TIER).parse(PUBLIC_STAGING_OR_PROD);
	const firebaseConfig = getFirebaseConf(tier);
	initializeApp(firebaseConfig);

	return;
}
