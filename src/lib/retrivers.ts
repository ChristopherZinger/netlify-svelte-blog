import { getDocs } from 'firebase/firestore';
import {
	getPostCollectionGroupRef,
	getSeriesCollectionReference,
	getSeriesPostsCollectionReference,
	getTagCollectionReference
} from './collections';
import type { Post_FsDoc, Series_FsDoc, Tag_FsDoc } from './schemas';

export const getAllTags = async (): Promise<Tag_FsDoc[]> =>
	(await getDocs(getTagCollectionReference())).docs.map((s) => s.data());

export const getAllSeries = async (): Promise<Series_FsDoc[]> =>
	(await getDocs(getSeriesCollectionReference())).docs.map((s) => s.data());

export const getAllPosts = async (): Promise<Post_FsDoc[]> =>
	(await getDocs(getPostCollectionGroupRef())).docs.map((s) => s.data());

export const getSeriesPosts = async (seriesName: string): Promise<Post_FsDoc[]> =>
	(await getDocs(getSeriesPostsCollectionReference(seriesName))).docs.map((s) => s.data());
