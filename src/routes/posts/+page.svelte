<script lang="ts">
	import { browser } from '$app/environment';
	import type { Post_FsDoc } from '$lib/schemas';
	import PageTitle from '../../components/PageTitle.svelte';
	import ContentContainer from '../../components/ContentContainer.svelte';
	import TagList from '../../components/TagList.svelte';
	import { page } from '$app/stores';
	import { getAllPosts, getPostsForTag } from '$lib/retrievers/posts';
	import { getPostUrl } from '$lib/utils/post-url-utils';

	$: tag = $page.url.searchParams.get('tag');

	let posts: undefined | Post_FsDoc[] = undefined;

	$: if (browser) {
		tag
			? getPostsForTag(tag).then((r) => {
					posts = r;
			  })
			: getAllPosts()
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
</ContentContainer>

<ContentContainer>
	<div class="grid grid-cols-12">
		<div class="lg:col-start-2 lg:col-span-8">
			<TagList selectedTag={tag || null} />
		</div>
	</div>
</ContentContainer>

<ContentContainer>
	<div class="grid grid-cols-1 lg:grid-cols-12 gap-y-10">
		{#if posts}
			{#each posts as post}
				<div class="lg:col-span-12 lg:col-start-2">
					<a href={getPostUrl(post)}>
						<h2 class="h4 mb-5">{post.title}</h2>
						<p>{post.excerpt}</p>
					</a>
				</div>
			{/each}
		{:else}
			<div class="lg:col-span-12 lg:col-start-2">...loading</div>
		{/if}
	</div>
</ContentContainer>
