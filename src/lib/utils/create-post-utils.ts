import {
	getIndependentPostCollectionRef,
	getIndependentPostContentCollectionRef,
	getSeriesCollectionReference,
	getSeriesPostCollectionRef,
	getSeriesPostContentCollectionRef,
	getTagCollectionReference
} from '$lib/collections';
import { getAllSeries } from '$lib/retrievers/series';
import { ContentType } from '$lib/schemas';
import type { TagWithIsNew } from '$lib/stores/createPostInputStore';
import { doc, Firestore, runTransaction } from 'firebase/firestore';
import { marked } from 'marked';
import { slugifyURL } from './slugify-utils';

export const createPost = async (
	firestore: Firestore,
	data: {
		post: {
			title: string;
			excerpt: string;
		};
		tags: TagWithIsNew[];
		series: null | { slug: string; name: string; description: string };
		markdown: string;
	}
) => {
	const postId = slugifyURL(data.post.title);

	const postCollection = !!data.series
		? getSeriesPostCollectionRef(data.series.slug)
		: getIndependentPostCollectionRef();

	const postContentCollection = !!data.series
		? getSeriesPostContentCollectionRef(data.series.slug, postId)
		: getIndependentPostContentCollectionRef(postId);

	const existingSeries = await getAllSeries();
	const shouldCreateNewSeires =
		data.series?.slug && existingSeries.every((s) => s.slug !== data.series?.slug);
	const tagsToCreate = data.tags.filter((t) => t.isNew);

	runTransaction(firestore, async (transaction) => {
		transaction.set(doc(postCollection, postId), {
			title: data.post.title,
			excerpt: data.post.excerpt,
			slug: postId,
			seriesSlug: data.series?.slug || null,
			tags: data.tags.map((t) => t.slug),
			createdAt: new Date().getTime()
		});

		/*
        check if post with this name already exists, 
        distinguish between create and update
      */

		transaction.set(doc(postContentCollection, ContentType.html), {
			content: marked.parse(data.markdown),
			postId
		});

		transaction.set(doc(postContentCollection, ContentType.markdown), {
			content: data.markdown,
			postId
		});

		if (shouldCreateNewSeires) {
			if (!data.series) {
				throw new Error('new_series_required_but_data_not_provided');
			}
			transaction.set(doc(getSeriesCollectionReference(), data.series.slug), {
				createdAt: new Date().getTime(),
				...data.series
			});
		}

		for (const { name, slug } of tagsToCreate) {
			transaction.set(doc(getTagCollectionReference(), slug), {
				name,
				slug
			});
		}
	});
};
