<script lang="ts">
	import { browser } from '$app/environment';
	import { getAllTags } from '$lib/retrievers/tags';
	import type { Tag_FsDoc } from '$lib/schemas';
	import { createPostInput } from '$lib/stores/createPostInputStore';
	import { slugifyURL } from '$lib/utils/slugify-utils';
	import { differenceBy } from 'lodash';

	let existingTags: Tag_FsDoc[] | undefined;

	if (browser) {
		getAllTags().then((_tags) => {
			existingTags = _tags;
		});
	}

	$: tagsToSelect = differenceBy(existingTags || [], $createPostInput.tags, 'slug');
</script>

<div>
	<input
		type="text"
		name="tag"
		list="tags"
		placeholder="add tag"
		class="p-3 border border-black rounded"
		on:keydown={(e) => {
			if (e.code === 'Enter' && e.currentTarget.value) {
				const inputAsSlug = slugifyURL(e.currentTarget.value);
				if (!existingTags) {
					console.warn('wait_until_tags_are_fetches');
					return;
				}
				const isNew = !existingTags.find((_tag) => _tag.slug === inputAsSlug);
				createPostInput.addTag({
					slug: inputAsSlug,
					name: e.currentTarget.value,
					isNew
				});
				e.currentTarget.value = '';
			}
		}}
	/>
	<datalist id="tags">
		{#each tagsToSelect as tag}
			<option value={tag.slug} />
		{/each}
	</datalist>
</div>
