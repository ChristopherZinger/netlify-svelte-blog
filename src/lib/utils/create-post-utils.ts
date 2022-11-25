import {
	getDraftCollectionRef,
	getDraftContentCollectionRef,
	getIndependentPostCollectionRef,
	getIndependentPostContentCollectionRef,
	getSeriesCollectionReference,
	getSeriesPostCollectionRef,
	getSeriesPostContentCollectionRef,
	getTagCollectionReference
} from '$lib/collections';
import { getAllSeries } from '$lib/retrievers/series';
import { ContentType } from '$lib/schemas';
import {
	createPostInput,
	createSeriesInput,
	type TagWithIsNew
} from '$lib/stores/createPostInputStore';
import { doc, Firestore, getDoc, runTransaction } from 'firebase/firestore';
import { marked } from 'marked';
import { get } from 'svelte/store';
import { markedOptions } from './marked-utils';
import { slugifyURL } from './slugify-utils';

marked.setOptions(markedOptions);

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

	await runTransaction(firestore, async (transaction) => {
		const postDocRef = doc(postCollection, postId);
		const postWithIdExists = (await transaction.get(postDocRef)).exists();

		if (postWithIdExists) {
			throw new Error('post_with_id_already_exists');
		}

		transaction.set(postDocRef, {
			title: data.post.title,
			excerpt: data.post.excerpt,
			slug: postId,
			seriesSlug: data.series?.slug || null,
			tags: data.tags.map((t) => t.slug),
			createdAt: new Date().getTime(), // todo: post was created when draf was created. this value should be passed should be passed. update indexes
			publishedAt: new Date().getTime() // todo: post is created from draft. set the publishing date
		});

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

			const seriesDocRef = doc(getSeriesCollectionReference(), data.series.slug);
			const seriesExists = (await transaction.get(seriesDocRef)).exists();

			if (seriesExists) {
				throw new Error('series_already_exists');
			}

			transaction.set(seriesDocRef, {
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

export const createDraft = async (
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
): Promise<void> => {
	const postSlug = slugifyURL(data.post.title);
	const draftDocRef = doc(getDraftCollectionRef(), postSlug);
	const draftHTMLContentDocRef = doc(getDraftContentCollectionRef(postSlug), ContentType.html);
	const draftMarkdownContentDocRef = doc(
		getDraftContentCollectionRef(postSlug),
		ContentType.markdown
	);

	const seriesSlugs = (await getAllSeries()).map((d) => d.slug);

	if (data.series?.slug && seriesSlugs.includes(data.series.slug)) {
		throw new Error('series_with_this_slug_already_exists');
	}

	await runTransaction(firestore, async (t) => {
		const draftExists = (await t.get(draftDocRef)).exists();

		if (draftExists) {
			throw new Error('draft_with_id_already_exists');
		}

		if (data.series) {
			t.set(doc(getSeriesCollectionReference(), data.series.slug), {
				...data.series,
				createdAt: new Date().getTime()
			});
		}

		t.set(draftDocRef, {
			title: data.post.title,
			excerpt: data.post.excerpt,
			slug: postSlug,
			seriesSlug: data.series?.slug || null,
			tags: data.tags.map((t) => t.slug),
			createdAt: new Date().getTime(),
			publishedAt: new Date().getTime()
		});

		t.set(draftHTMLContentDocRef, {
			postId: postSlug,
			content: marked.parse(data.markdown)
		});

		t.set(draftMarkdownContentDocRef, {
			postId: postSlug,
			content: data.markdown
		});
	});

	createSeriesInput.resetAll();
	createPostInput.resetAll();
};

export const publishDraft = async (firestore: Firestore, draftSlug: string) => {
	const draftDocRef = doc(getDraftCollectionRef(), draftSlug);
	const draftHTMLContentDocRef = doc(getDraftContentCollectionRef(draftSlug), ContentType.html);
	const draftMarkdownContentDocRef = doc(
		getDraftContentCollectionRef(draftSlug),
		ContentType.markdown
	);

	const [draft, html, markdown] = await Promise.all([
		(await getDoc(draftDocRef)).data(),
		(await getDoc(draftHTMLContentDocRef)).data(),
		(await getDoc(draftMarkdownContentDocRef)).data()
	]);

	if (!draft || !html || !markdown) {
		throw new Error('insufficient_data_to_create_post');
	}

	if (draft.seriesSlug) {
		const series = await getDoc(doc(getSeriesCollectionReference(), draft.seriesSlug));
		if (!series.exists()) {
			throw new Error('cant_assign_post_to_nonexisting_series');
		}
	}

	const postCollection = draft.seriesSlug
		? getSeriesPostCollectionRef(draft.seriesSlug)
		: getIndependentPostCollectionRef();

	const postContentCollection = draft.seriesSlug
		? getSeriesPostContentCollectionRef(draft.seriesSlug, draft.slug)
		: getIndependentPostContentCollectionRef(draft.slug);

	runTransaction(firestore, async (t) => {
		return await Promise.all([
			t.set(doc(postCollection, draft.slug), {
				...draft,
				publishedAt: new Date().getTime()
			}),
			t.set(doc(postContentCollection, ContentType.html), html),
			t.set(doc(postContentCollection, ContentType.markdown), markdown),
			t.delete(draftDocRef),
			t.delete(draftHTMLContentDocRef),
			t.delete(draftMarkdownContentDocRef)
		]);
	});
};
