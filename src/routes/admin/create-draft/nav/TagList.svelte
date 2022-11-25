<script lang="ts">
	import ContentContainer from '../../../../components/ContentContainer.svelte';
	import { createPostInput } from '$lib/stores/createPostInputStore';
</script>

{#if $createPostInput.tags.length}
	<ContentContainer>
		<div class="grid lg:grid-cols-12">
			<div class="flex gap-x-3 lg:col-start-2 lg:col-span-11">
				<span>TAGS: </span>
				{#each $createPostInput.tags as tag}
					<button class="underline" on:click={() => createPostInput.removeTagBySlug(tag.slug)}>
						#{tag.slug}
					</button>
				{/each}
			</div>
		</div>
	</ContentContainer>
{/if}
