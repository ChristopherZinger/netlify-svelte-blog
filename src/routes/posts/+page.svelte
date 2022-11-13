<script lang="ts">
	import { browser } from '$app/environment';
	import { getAllPosts } from '$lib/retrivers';
	import type { Post_FsDoc } from '$lib/schemas';
	import PageTitle from '../../components/PageTitle.svelte';
	import ContentContainer from '../../components/ContentContainer.svelte';

	let posts: undefined | Post_FsDoc[] = undefined;

	if (browser) {
		getAllPosts()
			.then((_posts) => {
				posts = _posts;
			})
			.catch((err) => {
				console.log(err);
			});
	}
</script>

<svelte:head>
	<title>Posts</title>
</svelte:head>

<ContentContainer>
	<PageTitle>Posts</PageTitle>

	<div class="grid grid-cols-1 lg:grid-cols-12 gap-y-10">
		{#if posts}
			{#each posts as post}
				<div class="lg:col-span-12 lg:col-start-2">
					<h2 class="h4 mb-5">{post.title}</h2>
					<p>{post.excerpt}</p>
				</div>
			{/each}
		{:else}
			<div class="lg:col-span-12 lg:col-start-2">...loading</div>
		{/if}
	</div>
</ContentContainer>
