<script lang="ts">
	import { createPostInput, createSeriesInput } from '$lib/stores/createPostInputStore';
	import Nav from './Nav.svelte';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { getPostBySlug, getPostContentBySlug } from '$lib/retrievers/posts';
	import { getTagBySlug } from '$lib/retrievers/tags';
	import { compact } from 'lodash';
	import Spinner from '../../../components/Spinner.svelte';
	import EditPostForm from './EditPostForm.svelte';
	import { createDraft } from '$lib/utils/create-post-utils';
	import { getFirestore } from 'firebase/firestore';
	import { goto } from '$app/navigation';
	import ConfirmPostOrDraftEditModal from '../../../components/ ConfirmPostOrDraftEditModal.svelte';

	let postSlug = $page.url.searchParams.get('post-slug');
	let isLoadingPostData = !!postSlug;

	if (browser && postSlug) {
		Promise.all([getPostBySlug(postSlug), getPostContentBySlug(postSlug)]).then(
			async ([post, markdown]) => {
				if (post && markdown) {
					const tags = compact(
						await Promise.all(post.tags.map(async (t) => await getTagBySlug(t)))
					);
					createPostInput.setTitle(post.title);
					createPostInput.setExcerpt(post.excerpt);
					createPostInput.assignSeries(post.seriesSlug);
					createPostInput.removeAllTags();
					tags.forEach((t) => createPostInput.addTag({ ...t, isNew: false }));

					createPostInput.setMarkdown(markdown.content);
				}
				isLoadingPostData = false;
			}
		);
	}

	let isLoading = false;

	let isModalOpen = false;
	const toggleModal = (v?: boolean) => {
		isModalOpen = typeof v === 'boolean' ? v : !isModalOpen;
	};
</script>

{#if isLoadingPostData}
	<Spinner />
{:else}
	<Nav />
	<EditPostForm />

	<div class="mt-10 flex flex-row-reverse">
		<button on:click={() => toggleModal(true)} class="p-5 font-bold border-2 border-black">
			Confirm
		</button>
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
			createDraft(getFirestore(), {
				post: $createPostInput.post,
				tags: $createPostInput.tags,
				markdown: $createPostInput.markdown,
				series:
					($createSeriesInput.slug && $createSeriesInput) || $createPostInput.seriesSlug || null
			});
		} catch (err) {
			console.log(err);
		}
		isLoading = false;
		goto('/admin/draft-list');
	}}
	{isLoading}
/>
