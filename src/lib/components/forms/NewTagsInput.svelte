<script lang="ts">
	import { browser } from '$app/environment';
	import { getAllTags } from '$lib/retrievers/tags';
	import type { Tag_FsDoc } from '$lib/schemas';
	import { createPostInput } from '$lib/stores/createPostInputStore';

	let existingTags: Tag_FsDoc[] = [];

	$: newTags = $createPostInput.tags.filter((t) => t.isNew);

	if (browser) {
		getAllTags().then((t) => {
			existingTags = t;
		});
	}
</script>

{#if newTags.length}
	<ul class="flex flex-col gap-y-5">
		<li class="grid grid-cols-2">
			<div class="font-bold">Slug:</div>
			<div class="font-bold">Name:</div>
		</li>
		{#each newTags as { name, slug }}
			<li class="grid grid-cols-2">
				<div>
					<button
						on:click={() => {
							createPostInput.removeTagBySlug(slug);
						}}
					>
						{slug}
					</button>
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
