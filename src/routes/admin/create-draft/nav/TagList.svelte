<script lang="ts">
	import { createPostInput } from '$lib/stores/createPostInputStore';
</script>

{#if $createPostInput.tags.length}
	<div class="flex gap-x-3">
		<span>TAGS: </span>
		{#each $createPostInput.tags as tag}
			<button class="underline" on:click={() => createPostInput.removeTagBySlug(tag.slug)}>
				#{tag.slug}
			</button>
		{/each}
	</div>
{/if}
