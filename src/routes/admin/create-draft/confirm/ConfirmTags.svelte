<script lang="ts">
	import { browser } from '$app/environment';
	import { getAllTags } from '$lib/retrievers/tags';
	import type { Tag_FsDoc } from '$lib/schemas';
	import { createPostInput } from '$lib/stores/createPostInputStore';
	import ContentContainer from '../../../../components/ContentContainer.svelte';
	import TagInput from '../nav/TagInput.svelte';

	let existingTags: Tag_FsDoc[] = [];

	$: newTags = $createPostInput.tags.filter((t) => t.isNew);
	$: selectedExistingTags = $createPostInput.tags.filter((t) => !t.isNew);

	if (browser) {
		getAllTags().then((t) => {
			existingTags = t;
		});
	}
</script>

<ContentContainer>
	<div class="my-10">
		<h1 class="h4">Tags</h1>

		<div class="my-10">
			<h3 class="h6">Add Tag:</h3>
			<div class="border p-2 mt-5">
				<TagInput />
			</div>
		</div>
		{#if selectedExistingTags.length}
			<h3 class="h6">Existing Tags:</h3>
			<ul class="flex gap-x-5 my-5">
				{#each selectedExistingTags as { slug, name }}
					<li>
						<button
							on:click={() => createPostInput.removeTagBySlug(slug)}
							title={'remove ' + name + 'tag'}
						>
							#{name}</button
						>
					</li>
				{/each}
			</ul>
		{/if}
		<br />

		{#if newTags.length}
			<h3 class="h6">New tags</h3>
			<ul class="flex flex-col gap-y-5">
				<li class="grid grid-cols-2">
					<div class="font-bold">Slug:</div>
					<div class="font-bold">Name:</div>
				</li>
				{#each newTags as { name, slug }}
					<li class="grid grid-cols-2">
						<div>
							<button
								on:click={() => createPostInput.removeTagBySlug(slug)}
								title={'remove ' + name + ' tag'}
							>
								{slug}</button
							>
						</div>
						<div>
							<input
								type="text"
								id={'tag-' + slug}
								value={name}
								on:input={(e) => {
									createPostInput.updateTagBySlug(slug, { name: e.currentTarget.value });
								}}
								class="p-1 border rounded"
							/>
						</div>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</ContentContainer>
