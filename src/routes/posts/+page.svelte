<script lang="ts">
	import { browser } from '$app/environment';
	import type { Post_FsDoc } from '$lib/schemas';
	import PageTitle from '$lib/components/PageTitle.svelte';
	import TopLevelMarginContainer from '$lib/components/containers/TopLevelMarginContainer.svelte';
	import TagList from '$lib/components/TagList.svelte';
	import { page } from '$app/stores';
	import { getAllPosts, getPostsForTag } from '$lib/retrievers/posts';
	import { getPostUrl } from '$lib/utils/post-url-utils';
	import PageContentContainer from '$lib/components/containers/PageContentContainer.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import EntityList from '$lib/components/EntityList.svelte';

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

<TopLevelMarginContainer>
	<div class="lg:grid lg:grid-cols-12">
		<div class="lg:col-start-2 lg:col-span-8">
			<TagList selectedTag={tag || null} />
		</div>
	</div>
</TopLevelMarginContainer>

<TopLevelMarginContainer>
	{#if posts}
		{#if posts.length}
			<EntityList
				items={posts.map((p) => ({
					description: p.excerpt,
					title: p.title,
					href: getPostUrl(p)
				}))}
			/>
		{:else}
			<PageContentContainer>No posts found here ;</PageContentContainer>
		{/if}
	{:else}
		<PageContentContainer><Spinner /></PageContentContainer>
	{/if}
</TopLevelMarginContainer>
