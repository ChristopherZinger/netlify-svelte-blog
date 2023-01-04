<script lang="ts">
	import { createPostInput, createSeriesInput } from '$lib/stores/createPostInputStore';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { getTagBySlug } from '$lib/retrievers/tags';
	import { compact } from 'lodash';
	import EditPostForm from '$lib/components/forms/EditPostForm.svelte';
	import {
		editPostOrDraft,
		getPostOrDraftCollectionRef,
		getPostOrDraftContentCollectionRef
	} from '$lib/utils/create-post-utils';
	import { doc, getDoc, getFirestore } from 'firebase/firestore';
	import { goto } from '$app/navigation';
	import ConfirmPostOrDraftEditModal from '$lib/components/ ConfirmPostOrDraftEditModal.svelte';
	import TagInput from '$lib/components/forms/TagInput.svelte';
	import SeriesInput from '$lib/components/forms/SeriesInput.svelte';
	import NewTagsInput from '$lib/components/forms/NewTagsInput.svelte';
	import { ContentType, DocType, type Post_FsDoc } from '$lib/schemas';
	import z from 'zod';
	import Spinner from '$lib/components/Spinner.svelte';

	const _docSlug = $page.url.searchParams.get('doc_slug');
	const _seriesSlug = $page.url.searchParams.get('series_slug');
	const _docType = $page.url.searchParams.get('doc_type');

	let post: undefined | Post_FsDoc;

	if (browser) {
		const docType = z.nativeEnum(DocType).parse(_docType);
		const seriesSlug = z.string().nullable().parse(_seriesSlug);
		const docSlug = z.string().min(1).parse(_docSlug);

		const docDocRef = doc(getPostOrDraftCollectionRef({ seriesSlug }, docType), docSlug);
		const contentDocRef = doc(
			getPostOrDraftContentCollectionRef(
				{
					slug: docSlug,
					seriesSlug
				},
				docType
			),
			ContentType.markdown
		);

		Promise.all([getDoc(docDocRef), getDoc(contentDocRef)]).then(
			async ([postSnap, markdownSnap]) => {
				const _post = postSnap.data();
				const _markdown = markdownSnap.data();

				if (_post && _markdown) {
					post = _post;
					const tags = compact(
						await Promise.all(_post.tags.map(async (t) => await getTagBySlug(t)))
					);
					createPostInput.setTitle(_post.title);
					createPostInput.setExcerpt(_post.excerpt);
					createPostInput.assignSeries(_post.seriesSlug);
					createPostInput.removeAllTags();
					tags.forEach((t) => createPostInput.addTag({ ...t, isNew: false }));
					createPostInput.setMarkdown(_markdown.content);
				} else {
					console.error('could_not_find_items', _post, _markdown);
				}
			}
		);
	}

	let isLoading = false;
	let isModalOpen = false;
	const toggleModal = (v?: boolean) => {
		isModalOpen = typeof v === 'boolean' ? v : !isModalOpen;
	};

	const saveChanges = async () => {
		const docType = z.nativeEnum(DocType).parse(_docType);
		const docSlug = z.string().min(1).parse(_docSlug);
		const seriesSlug = z.string().nullable().parse(_seriesSlug);

		editPostOrDraft(getFirestore(), {
			data: {
				post: {
					slug: docSlug,
					seriesSlug
				},
				postNewData: {
					...$createPostInput.post
				},
				markdown: $createPostInput.markdown,
				series:
					($createSeriesInput.slug && $createSeriesInput) || $createPostInput.seriesSlug || null,
				tags: $createPostInput.tags
			},
			docType
		});

		createSeriesInput.resetAll();
		createPostInput.resetAll();
	};
</script>

{#if !post}
	<Spinner />
{:else}
	<div class="flex flex-col  divide-y">
		<div class="py-10">
			<h1 class="h6 mb-5">Tags</h1>
			<div class="flex gap-x-10 mb-5">
				<TagInput />
				{#if $createPostInput.tags.length}
					<div class="flex flex-wrap gap-x-5">
						{#each $createPostInput.tags as tag}
							<button class="underline" on:click={() => createPostInput.removeTagBySlug(tag.slug)}>
								#{tag.slug}
							</button>
						{/each}
					</div>
				{/if}
			</div>
			<NewTagsInput />
		</div>

		<div class="py-10">
			<h1 class="h6 mb-5">Series</h1>
			<div class="flex gap-x-10 mb-5">
				<SeriesInput />
				{#if $createPostInput.seriesSlug}
					<button
						on:click={() => {
							createPostInput.assignSeries(null);
						}}
						class="font-bold uppercase"
						>{$createPostInput.seriesSlug}
					</button>
				{:else}
					<span>Independent Post</span>
				{/if}
			</div>
		</div>

		<div class="py-10">
			<h1 class="h6 mb-5">Content</h1>
			<EditPostForm />
		</div>
	</div>

	<div class="mt-10 flex flex-row-reverse gap-x-10">
		<button on:click={() => toggleModal(true)} class="p-5 font-bold border-2 border-black">
			Confirm
		</button>
		<button on:click={saveChanges} class="p-5 font-bold border-2 border-black"> Save </button>
	</div>
{/if}

<ConfirmPostOrDraftEditModal
	onClose={() => {
		isModalOpen = false;
	}}
	isOpen={isModalOpen}
	onConfirm={async () => {
		isLoading = true;
		try {
			await saveChanges();
		} catch (err) {
			console.log(err);
		}
		isLoading = false;
		goto('/admin/draft-list');
	}}
	{isLoading}
>
	<div slot="info-top" class="py-10">
		<h3 class="h6">
			You are editing a "
			<span class="uppercase">{_docType} - </span>
			<span class="font-bold">
				{post?.title}
			</span>"
		</h3>
	</div>
</ConfirmPostOrDraftEditModal>
