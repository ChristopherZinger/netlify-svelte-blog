<script lang="ts">
	import { browser } from '$app/environment';
	import { getAllTags } from '$lib/retrievers/tags';
	import { createPostInput } from '$lib/stores/createPostInputStore';

	let existingTags: string[] = [];

	if (browser) {
		getAllTags().then((_tags) => {
			existingTags = _tags.map((t) => t.slug);
		});
	}

	$: tagsToSelect = existingTags.filter((t) => !$createPostInput.tagSlugs.includes(t));
</script>

<div>
	<input
		type="text"
		name="tag"
		list="tags"
		placeholder="add tag"
		on:keydown={(e) => {
			if (e.code === 'Enter') {
				createPostInput.addTag(e.currentTarget.value);
				e.currentTarget.value = '';
			}
		}}
	/>
	<datalist id="tags">
		{#each tagsToSelect as value}
			<option {value} />
		{/each}
	</datalist>
</div>
