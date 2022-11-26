<script lang="ts">
	import { createPostInput } from '$lib/stores/createPostInputStore';
</script>

{#if $createPostInput.tags.length}
	<div>
		<h2 class="h6 mb-5">All Tags:</h2>
		<div class="flex flex-wrap gap-x-5">
			{#each $createPostInput.tags as tag}
				<button class="underline" on:click={() => createPostInput.removeTagBySlug(tag.slug)}>
					#{tag.slug}
				</button>
			{/each}
		</div>
	</div>
{/if}
