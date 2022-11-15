<script lang="ts">
	import { browser } from '$app/environment';
	import { getTags } from '$lib/retrivers';
	import type { Tag_FsDoc } from '$lib/schemas';

	let tags: Tag_FsDoc[] = [];
	if (browser) {
		getTags().then((r) => {
			tags = r;
		});
	}
</script>

{#if tags.length}
	<section>
		<ul class="flex flex-wrap gap-x-10 my-10">
			{#each tags as tag}
				<li><a class="underline" href={`/posts?tag=${tag.slug}`}>#{tag.name}</a></li>
			{/each}
		</ul>
	</section>
{/if}
