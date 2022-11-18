import { getSeriesCollectionReference } from '$lib/collections';
import type { Series_FsDoc } from '$lib/schemas';
import { doc, getDoc, getDocs, limit, orderBy, query } from 'firebase/firestore';

export const getLatestSeries = async (): Promise<Series_FsDoc[]> =>
	(
		await getDocs(query(getSeriesCollectionReference(), limit(4), orderBy('createdAt', 'desc')))
	).docs.map((s) => s.data());

export const getSeriesBySlug = async (seriesSlug: string): Promise<Series_FsDoc | undefined> =>
	(await getDoc(doc(getSeriesCollectionReference(), seriesSlug)))?.data();

export const getAllSeries = async (): Promise<Series_FsDoc[]> =>
	(await getDocs(query(getSeriesCollectionReference(), orderBy('createdAt', 'desc')))).docs.map(
		(s) => s.data()
	);
