<script lang="ts">
	import { browser } from '$app/environment';
	import { getAllTags } from '$lib/retrievers/tags';
	import type { Tag_FsDoc } from '$lib/schemas';
	import { createPostInput } from '$lib/stores/createPostInputStore';

	let existingTags: Tag_FsDoc[] = [];

	$: newTags = $createPostInput.tags.filter((t) => t.isNew);
	$: selectedExistingTags = $createPostInput.tags.filter((t) => !t.isNew);

	if (browser) {
		getAllTags().then((t) => {
			existingTags = t;
		});
	}
</script>

<div class="py-10">
	{#if selectedExistingTags.length}
		<h3 class="h6">Existing Tags:</h3>
		<ul class="flex gap-x-5 my-5">
			{#each selectedExistingTags as { slug, name }}
				<li>
					#{name}
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
						{slug}
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
