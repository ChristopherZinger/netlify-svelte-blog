<script lang="ts">
	import type { Tag_WP } from '$lib/schemas';
	import Tag from '$lib/components/Tag.svelte';

	export let selectedTagId: number | null; 
	export let onSelectTag: (tagId: number) => void;
	export let tags: Tag_WP[];
</script>

<div class="flex flex-wrap gap-x-10">
	{#each tags as tag}
		<Tag 
			isSelected={tag.id === selectedTagId} 
			tag="{{
				name: tag.name,
				id: tag.id,
			}}"
			onClick={() => onSelectTag(tag.id === selectedTagId
				? null
				: tag.id
			)}
		/>
	{/each}
</div>
