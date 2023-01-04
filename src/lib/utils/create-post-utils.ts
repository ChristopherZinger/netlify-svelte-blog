import {
	getDraftCollectionRef,
	getDraftContentCollectionRef,
	getSeriesCollectionReference,
	getTagCollectionReference
} from '$lib/collections';
import { getPostBySlug } from '$lib/retrievers/posts';
import { getSeriesBySlug } from '$lib/retrievers/series';
import { getTagBySlug } from '$lib/retrievers/tags';
import {
	ContentType,
	DocType,
	type PostContent_FsDoc,
	type Post_FsDoc,
	type Tag_FsDoc
} from '$lib/schemas';
import type { TagWithIsNew } from '$lib/stores/createPostInputStore';
import {
	CollectionReference,
	doc,
	Firestore,
	getDoc,
	getFirestore,
	runTransaction,
	Transaction,
	type DocumentData
} from 'firebase/firestore';
import { compact } from 'lodash';
import { AppError } from './AppError';
import { markdownToHTML } from './marked-utils';
import {
	getPostCollectionRefForPost,
	getPostContentCollectionRefForPost
} from './post-collection-utils';
import { slugifyURL } from './slugify-utils';

const expectDocInCollection = async <T extends DocumentData>(
	collection: CollectionReference<T>,
	id: string
): Promise<T> => {
	const snap = await getDoc(doc(collection, id));
	if (!snap.exists()) {
		throw 'no_document_when_expected';
	}
	return snap.data();
};

export const editDraft = async (
	slug: string,
	data: {
		post: Partial<{
			title: string;
			excerpt: string;
		}> & {
			seriesSlug: string | null;
		};
		markdown: string;
		tags: Tag_FsDoc[];
	}
) => {
	const draftDocRef = doc(getDraftCollectionRef(), slug);
	await expectDocInCollection(getDraftCollectionRef(), slug);
	if (data.post.seriesSlug) {
		await expectDocInCollection(getSeriesCollectionReference(), data.post.seriesSlug);
	}

	const newData: Partial<Post_FsDoc> = {
		...data.post,
		tags: data.tags.map((t) => t.slug)
	};

	await runTransaction(getFirestore(), async (t) => {
		t.update(draftDocRef, newData);
		t.update(doc(getDraftContentCollectionRef(slug), ContentType.html), {
			content: markdownToHTML(data.markdown)
		});

		createTagsTransaction(t, data.tags);
	});
};

export const editPostOrDraft = async (
	firestore: Firestore,
	info: {
		docType: DocType;
		data: {
			post: {
				slug: string;
				seriesSlug: string | null;
			};
			postNewData: {
				title: string;
				excerpt: string;
			};
			tags: TagWithIsNew[];
			series: null | string | { slug: string; name: string; description: string };
			markdown: string;
		};
	}
) => {
	const { data, docType } = info;
	const seriesSlug: null | string = data.series
		? typeof data.series === 'string'
			? data.series
			: data.series.slug
		: null;

	const oldDocDocRef = doc(
		getPostOrDraftCollectionRef({ seriesSlug: data.post.seriesSlug }, docType),
		data.post.slug
	);
	const oldDocHTMLContentDocRef = doc(
		getPostOrDraftContentCollectionRef(
			{ seriesSlug: data.post.seriesSlug, slug: data.post.slug },
			docType
		),
		ContentType.html
	);
	const oldDocMarkdownContentDocRef = doc(
		getPostOrDraftContentCollectionRef(
			{ seriesSlug: data.post.seriesSlug, slug: data.post.slug },
			docType
		),
		ContentType.markdown
	);

	const [docInfo, html, markdown] = await Promise.all([
		(await getDoc(oldDocDocRef)).data(),
		(await getDoc(oldDocHTMLContentDocRef)).data(),
		(await getDoc(oldDocMarkdownContentDocRef)).data()
	]);

	if (!docInfo || !html || !markdown) {
		throw new AppError('some_data_is_missnig');
	}

	const tagsToCreate = compact(
		await Promise.all(data.tags.map(async (t) => ((await getTagBySlug(t.slug)) ? null : t)))
	);

	const shouldCreateNewSeries = seriesSlug ? !(await getSeriesBySlug(seriesSlug)) : false;

	await runTransaction(firestore, async (t) => {
		await Promise.all(
			compact([
				...postOrDraftAndContentDeleteTransaction(
					t,
					{ slug: docInfo.slug, seriesSlug: docInfo.seriesSlug },
					docType
				),
				...postOrDraftAndContentCreateTransaction(
					t,
					{
						post: {
							...docInfo,
							...data.postNewData,
							seriesSlug,
							tags: data.tags.map((t) => t.slug)
						},
						html: {
							...html,
							content: markdownToHTML(data.markdown)
						},
						markdown: {
							...markdown,
							content: data.markdown
						}
					},
					docType
				),
				...createTagsTransaction(t, tagsToCreate),
				seriesSlug &&
					shouldCreateNewSeries &&
					data.series &&
					typeof data.series !== 'string' &&
					t.set(doc(getSeriesCollectionReference(), seriesSlug), {
						...data.series,
						createdAt: new Date().getTime()
					})
			]).flat()
		);
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
		series: null | string | { slug: string; name: string; description: string };
		markdown: string;
	}
): Promise<void> => {
	const postSlug = slugifyURL(data.post.title);

	const [draftExists, tagsToCreate] = await Promise.all([
		(await getDoc(doc(getDraftCollectionRef(), postSlug))).exists(),
		compact(
			await Promise.all(data.tags.map(async (t) => ((await getTagBySlug(t.slug)) ? null : t)))
		)
	]);

	if (draftExists) {
		throw new AppError('draft_with_id_already_exists');
	}

	const newSeriesData =
		data.series && typeof data.series !== 'string'
			? {
					...data.series,
					createdAt: new Date().getTime()
			  }
			: null;

	let seriesSlug = null;
	if (data.series) {
		seriesSlug = slugifyURL(typeof data.series === 'string' ? data.series : data.series.name);
	}

	const postData: Post_FsDoc = {
		...data.post,
		slug: postSlug,
		seriesSlug,
		createdAt: new Date().getTime(),
		publishedAt: new Date().getTime(),
		tags: data.tags.map((t) => t.slug)
	};

	const htmlData: PostContent_FsDoc = {
		postId: postSlug,
		content: markdownToHTML(data.markdown)
	};

	const markdownData: PostContent_FsDoc = {
		postId: postSlug,
		content: data.markdown
	};

	await runTransaction(firestore, async (t) => {
		await Promise.all(
			compact([
				newSeriesData &&
					t.set(doc(getSeriesCollectionReference(), newSeriesData.slug), newSeriesData),
				postOrDraftAndContentCreateTransaction(
					t,
					{
						post: postData,
						html: htmlData,
						markdown: markdownData
					},
					DocType.draft
				),
				...createTagsTransaction(t, tagsToCreate)
			])
		);
	});
};

export const publishDraft = async (firestore: Firestore, draftSlug: string) => {
	const draftDocRef = doc(getDraftCollectionRef(), draftSlug);
	const draftHTMLContentDocRef = doc(getDraftContentCollectionRef(draftSlug), ContentType.html);
	const draftMDContentDocRef = doc(getDraftContentCollectionRef(draftSlug), ContentType.markdown);

	const [draft, html, markdown] = await Promise.all([
		(await getDoc(draftDocRef)).data(),
		(await getDoc(draftHTMLContentDocRef)).data(),
		(await getDoc(draftMDContentDocRef)).data()
	]);

	if (!draft || !html || !markdown) {
		throw new AppError('insufficient_data_to_create_post');
	}

	if (draft.seriesSlug) {
		const series = await getSeriesBySlug(draft.seriesSlug);
		if (!series) {
			throw new AppError('cant_assign_post_to_nonexisting_series');
		}
	}

	const postData = {
		...draft,
		publishedAt: new Date().getTime()
	};

	runTransaction(firestore, async (t) => {
		return await Promise.all([
			...postOrDraftAndContentCreateTransaction(
				t,
				{
					post: postData,
					html,
					markdown
				},
				DocType.post
			),
			...postOrDraftAndContentDeleteTransaction(t, draft, DocType.draft)
		]);
	});
};

export const convertToDraft = async (firestore: Firestore, postSlug: string) => {
	const post = await getPostBySlug(postSlug);

	if (!post) {
		throw new AppError('can_not_find_post_for_slug');
	}

	const postContentCollection = getPostContentCollectionRefForPost(post);
	const [html, markdown] = await Promise.all([
		(await getDoc(doc(postContentCollection, ContentType.html))).data(),
		(await getDoc(doc(postContentCollection, ContentType.markdown))).data()
	]);

	if (!html || !markdown) {
		throw new AppError('content_is_missing');
	}

	await runTransaction(firestore, async (t) => {
		return await Promise.all([
			...postOrDraftAndContentCreateTransaction(
				t,
				{
					post,
					html,
					markdown
				},
				DocType.draft
			),
			...postOrDraftAndContentDeleteTransaction(t, post, DocType.post)
		]);
	});
};

export const getPostOrDraftCollectionRef = (
	info: { seriesSlug: null | string },
	docType: DocType
) => {
	const postOrDraftCollectionRef =
		docType === DocType.draft ? getDraftCollectionRef() : getPostCollectionRefForPost(info);
	return postOrDraftCollectionRef;
};

export const getPostOrDraftContentCollectionRef = (
	info: { slug: string; seriesSlug: null | string },
	docType: DocType
) => {
	const postOrDraftContentCollectionRef =
		docType === DocType.draft
			? getDraftContentCollectionRef(info.slug)
			: getPostContentCollectionRefForPost(info);
	return postOrDraftContentCollectionRef;
};

const postOrDraftAndContentDeleteTransaction = (
	t: Transaction,
	post: { slug: string; seriesSlug: string | null },
	docType: DocType
) => {
	const postCollection = getPostOrDraftCollectionRef(post, docType);
	const postContentCollection = getPostOrDraftContentCollectionRef(post, docType);

	return [
		t.delete(doc(postCollection, post.slug)),
		t.delete(doc(postContentCollection, ContentType.html)),
		t.delete(doc(postContentCollection, ContentType.markdown))
	];
};

const postOrDraftAndContentCreateTransaction = (
	t: Transaction,
	data: {
		post: Post_FsDoc;
		html: PostContent_FsDoc;
		markdown: PostContent_FsDoc;
	},
	docType: DocType
) => {
	const postOrDraftCollectionRef = getPostOrDraftCollectionRef(data.post, docType);
	const postOrDraftContentCollectionRef = getPostOrDraftContentCollectionRef(data.post, docType);

	return [
		t.set(doc(postOrDraftCollectionRef, data.post.slug), data.post),
		t.set(doc(postOrDraftContentCollectionRef, ContentType.html), data.html),
		t.set(doc(postOrDraftContentCollectionRef, ContentType.markdown), data.markdown)
	];
};

const createTagsTransaction = (t: Transaction, tags: Tag_FsDoc[]) => {
	return tags.map(({ name, slug }) =>
		t.set(doc(getTagCollectionReference(), slug), {
			name,
			slug
		})
	);
};
