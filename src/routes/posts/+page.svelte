<script lang="ts">
	import { browser } from '$app/environment';
	import type { Post_FsDoc } from '$lib/schemas';
	import PageTitle from '../../components/PageTitle.svelte';
	import ContentContainer from '../../components/ContentContainer.svelte';
	import TagList from '../../components/TagList.svelte';
	import { page } from '$app/stores';
	import { getAllPosts, getPostsForTag } from '$lib/retrievers/posts';
	import { getPostUrl } from '$lib/utils/post-url-utils';
	import Spinner from '../../components/Spinner.svelte';

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

<PageTitle>Posts</PageTitle>

<ContentContainer>
	<div class="grid grid-cols-12">
		<div class="lg:col-start-2 lg:col-span-8">
			<TagList selectedTag={tag || null} />
		</div>
	</div>
</ContentContainer>

<ContentContainer>
	{#if posts}
		<div class="grid grid-cols-1 lg:grid-cols-12 gap-y-10">
			<div class="lg:col-span-12 lg:col-start-2">
				{#if posts.length}
					{#each posts as post}
						<a href={getPostUrl(post)}>
							<h2 class="h4 mb-5">{post.title}</h2>
							<p>{post.excerpt}</p>
						</a>
					{/each}
				{:else}
					No posts found here ;(
				{/if}
			</div>
		</div>
	{:else}
		<div class="lg:col-span-12 lg:col-start-2"><Spinner /></div>
	{/if}
</ContentContainer>
