import {
	getDraftCollectionRef,
	getDraftContentCollectionRef,
	getSeriesCollectionReference,
	getTagCollectionReference
} from '$lib/collections';
import { getPostBySlug } from '$lib/retrievers/posts';
import { getSeriesBySlug } from '$lib/retrievers/series';
import { getTagBySlug } from '$lib/retrievers/tags';
import { ContentType, DocType, type PostContent_FsDoc, type Post_FsDoc } from '$lib/schemas';
import {
	createPostInput,
	createSeriesInput,
	type TagWithIsNew
} from '$lib/stores/createPostInputStore';
import { doc, Firestore, getDoc, runTransaction, Transaction } from 'firebase/firestore';
import { compact } from 'lodash';
import { marked } from 'marked';
import { markedOptions } from './marked-utils';
import {
	getPostCollectionRefForPost,
	getPostContentCollectionRefForPost
} from './post-collection-utils';
import { slugifyURL } from './slugify-utils';

marked.setOptions(markedOptions);

// export const createPost = async (
// 	firestore: Firestore,
// 	data: {
// 		post: {
// 			title: string;
// 			excerpt: string;
// 		};
// 		tags: TagWithIsNew[];
// 		series: null | { slug: string; name: string; description: string };
// 		markdown: string;
// 	}
// ) => {
// 	const postId = slugifyURL(data.post.title);

// 	const [post, series, tagsToCreate] = await Promise.all([
// 		getPostBySlug(postId),
// 		data.series && getSeriesBySlug(data.series.slug),
// 		compact(
// 			await Promise.all(data.tags.map(async (t) => ((await getTagBySlug(t.slug)) ? null : t)))
// 		)
// 	]);

// 	if (post) {
// 		throw new Error('post_with_id_already_exists');
// 	}

// 	const newSeriesData = data.series && !series ? data.series : null;

// 	const postData = {
// 		title: data.post.title,
// 		excerpt: data.post.excerpt,
// 		slug: postId,
// 		seriesSlug: data.series?.slug || null,
// 		tags: data.tags.map((t) => t.slug),
// 		createdAt: new Date().getTime(), // todo: post was created when draf was created. this value should be passed should be passed. update indexes
// 		publishedAt: new Date().getTime() // todo: post is created from draft. set the publishing date
// 	};

// 	const htmlData: PostContent_FsDoc = {
// 		postId,
// 		content: marked.parse(data.markdown)
// 	};

// 	const markdownData: PostContent_FsDoc = {
// 		postId,
// 		content: data.markdown
// 	};

// 	await runTransaction(firestore, async (transaction) => {
// 		const allTransactions: Transaction[] = compact([
// 			...postOrDraftAndContentCreateTransaction(
// 				transaction,
// 				{
// 					post: postData,
// 					html: htmlData,
// 					markdown: markdownData
// 				},
// 				'post'
// 			),
// 			newSeriesData &&
// 				transaction.set(doc(getSeriesCollectionReference(), newSeriesData.slug), {
// 					createdAt: new Date().getTime(),
// 					...newSeriesData
// 				}),
// 			...tagsToCreate.map(({ name, slug }) =>
// 				transaction.set(doc(getTagCollectionReference(), slug), {
// 					name,
// 					slug
// 				})
// 			)
// 		]);

// 		await Promise.all(allTransactions);
// 	});
// };

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
		throw new Error('draft_with_id_already_exists');
	}

	const newSeriesData =
		data.series && typeof data.series !== 'string'
			? {
					...data.series,
					createdAt: new Date().getTime()
			  }
			: null;

	console.log(data.series, newSeriesData);

	const postData: Post_FsDoc = {
		...data.post,
		slug: postSlug,
		seriesSlug: newSeriesData?.slug || null,
		createdAt: new Date().getTime(),
		publishedAt: new Date().getTime(),
		tags: data.tags.map((t) => t.slug)
	};

	const htmlData: PostContent_FsDoc = {
		postId: postSlug,
		content: marked.parse(data.markdown)
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
				...tagsToCreate.map(({ name, slug }) =>
					t.set(doc(getTagCollectionReference(), slug), {
						name,
						slug
					})
				)
			])
		);
	});

	createSeriesInput.resetAll();
	createPostInput.resetAll();
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
		throw new Error('insufficient_data_to_create_post');
	}

	if (draft.seriesSlug) {
		const series = await getSeriesBySlug(draft.seriesSlug);
		if (!series) {
			throw new Error('cant_assign_post_to_nonexisting_series');
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
		throw new Error('can_not_find_post_for_slug');
	}

	const postContentCollection = getPostContentCollectionRefForPost(post);
	const [html, markdown] = await Promise.all([
		(await getDoc(doc(postContentCollection, ContentType.html))).data(),
		(await getDoc(doc(postContentCollection, ContentType.markdown))).data()
	]);

	if (!html || !markdown) {
		throw new Error('content_is_missing');
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
