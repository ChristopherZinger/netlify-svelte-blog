<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Tag_FsDoc } from '$lib/schemas';
	import CloseIcon from '$lib/components/icons/CloseIcon.svelte';

	export let selectedTag: string | null = null;
	export let tags: Tag_FsDoc[];
</script>

{#if tags.length}
	<section>
		<ul class="flex flex-wrap gap-x-10">
			{#each tags as tag}
				<li class:isSelected={tag.slug === selectedTag} class="flex gap-x-3 items-center">
					<a class="underline" href={`/posts?tag=${tag.slug}`}>#{tag.name}</a>
					{#if selectedTag}
						<button
							on:click={() => {
								goto('/posts');
							}}
						>
							<CloseIcon color="white" strokeWidth={2} />
						</button>
					{/if}
				</li>
			{/each}
		</ul>
	</section>
{/if}

<style>
	.isSelected {
		@apply bg-black px-3 rounded-full text-white;
	}
</style>
