<script lang="ts">
	import { createPostInput, createSeriesInput } from '$lib/stores/createPostInputStore';
	import EditPostForm from '$lib/components/forms/EditPostForm.svelte';
	import { createDraft } from '$lib/utils/create-post-utils';
	import { getFirestore } from 'firebase/firestore';
	import { goto } from '$app/navigation';
	import ConfirmPostOrDraftEditModal from '$lib/components/ ConfirmPostOrDraftEditModal.svelte';
	import TagInput from '$lib/components/forms/TagInput.svelte';
	import SeriesInput from '$lib/components/forms/SeriesInput.svelte';
	import NewTagsInput from '$lib/components/forms/NewTagsInput.svelte';

	let isLoading = false;

	let isModalOpen = false;
	const toggleModal = (v?: boolean) => {
		isModalOpen = typeof v === 'boolean' ? v : !isModalOpen;
	};
</script>

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

<div class="mt-10 flex flex-row-reverse">
	<button on:click={() => toggleModal(true)} class="p-5 font-bold border-2 border-black">
		Confirm
	</button>
</div>

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
			createSeriesInput.resetAll();
			createPostInput.resetAll();
		} catch (err) {
			console.log(err);
		}
		isLoading = false;
		goto('/admin/draft-list');
	}}
	{isLoading}
/>
