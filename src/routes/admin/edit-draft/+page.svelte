<script lang="ts">
	import { createPostInput } from '$lib/stores/createPostInputStore';
	import EditPostForm from '$lib/components/forms/EditPostForm.svelte';
	import { editDraft } from '$lib/utils/create-post-utils';
	import TagInput from '$lib/components/forms/TagInput.svelte';
	import SeriesInput from '$lib/components/forms/SeriesInput.svelte';
	import NewTagsInput from '$lib/components/forms/NewTagsInput.svelte';
	import type { PostContent_FsDoc, Post_FsDoc, Tag_FsDoc } from '$lib/schemas';

	export let data: { content: PostContent_FsDoc; draft: Post_FsDoc; tags: Tag_FsDoc[] };

	createPostInput.setTitle(data.draft.title);
	createPostInput.setExcerpt(data.draft.excerpt);
	createPostInput.assignSeries(data.draft.seriesSlug);
	createPostInput.removeAllTags();
	data.tags.forEach((t) => createPostInput.addTag({ ...t, isNew: false }));
	createPostInput.setMarkdown(data.content.content);

	let isLoading = false;

	const saveChanges = async () => {
		isLoading = true;
		try {
			await editDraft(data.draft.slug, {
				post: { ...$createPostInput.post, seriesSlug: $createPostInput.seriesSlug },
				markdown: $createPostInput.markdown,
				tags: $createPostInput.tags
			});

			isLoading = false;
			location.reload();
		} catch (error) {
			console.log(error);
		}
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

<div class="mt-10 flex flex-row-reverse gap-x-10">
	<button on:click={saveChanges} class="p-5 font-bold border-2 border-black"> Save </button>
</div>
