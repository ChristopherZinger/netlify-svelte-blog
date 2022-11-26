<script lang="ts">
	import { browser } from '$app/environment';
	import { getPostCollectionGroupRef } from '$lib/collections';
	import type { Post_FsDoc } from '$lib/schemas';
	import { convertToDraft } from '$lib/utils/create-post-utils';
	import { getFirestore, onSnapshot } from 'firebase/firestore';

	let posts: Post_FsDoc[] | undefined;

	if (browser) {
		onSnapshot(getPostCollectionGroupRef(), (s) => {
			posts = s.docs.map((d) => d.data());
		});
	}
</script>

<h1>Posts</h1>

{#if posts}
	{#if posts.length}
		<ul class="my-10">
			{#each posts as post}
				<li class="flex justify-between my-5">
					<div>{post.title}</div>
					<button on:click={() => convertToDraft(getFirestore(), post.slug)}
						>convert to draft</button
					>
				</li>
			{/each}
		</ul>
	{:else}
		No posts here
	{/if}
{:else}
	<spinner />
{/if}
