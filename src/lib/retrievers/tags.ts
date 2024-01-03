import { getTagCollectionReference } from '$lib/collections';
import type { Tag_WP } from '$lib/schemas';
import { getDoc, getDocs, doc, limit, query } from 'firebase/firestore';

export const getTags = async (): Promise<Tag_WP[]> =>
	(await getDocs(query(getTagCollectionReference(), limit(8)))).docs.map((s) => s.data());

export const getAllTags = async (): Promise<Tag_WP[]> =>
	(await getDocs(getTagCollectionReference())).docs.map((s) => s.data());

export const getTagBySlug = async (slug: string): Promise<Tag_WP | undefined> => {
	return (await getDoc(doc(getTagCollectionReference(), slug)))?.data();
};
