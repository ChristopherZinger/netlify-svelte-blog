<script lang="ts">
	import { browser } from '$app/environment';
	import type { Post_FsDoc, Tag_FsDoc } from '$lib/schemas';
	import PageTitle from '$lib/components/PageTitle.svelte';
	import TopLevelMarginContainer from '$lib/components/containers/TopLevelMarginContainer.svelte';
	import TagList from '$lib/components/TagList.svelte';
	import { page } from '$app/stores';
	import { getPostsForTag } from '$lib/retrievers/posts';
	import { getPostUrl } from '$lib/utils/post-url-utils';
	import PageContentContainer from '$lib/components/containers/PageContentContainer.svelte';
	import EntityList from '$lib/components/EntityList.svelte';

	export let data: { posts: Post_FsDoc[]; tags: Tag_FsDoc[] };

	$: posts = data.posts;
	$: tag = $page.url.searchParams.get('tag');

	$: if (browser) {
		if (tag) {
			getPostsForTag(tag).then((r) => {
				posts = r;
			});
		} else {
			posts = data.posts;
		}
	}
</script>

<svelte:head>
	<title>Posts</title>
</svelte:head>

<PageTitle>Posts</PageTitle>

<TopLevelMarginContainer>
	<div class="lg:grid lg:grid-cols-12">
		<div class="lg:col-start-2 lg:col-span-8">
			<TagList selectedTag={tag || null} tags={data.tags} />
		</div>
	</div>
</TopLevelMarginContainer>

<TopLevelMarginContainer>
	{#if posts.length}
		<EntityList
			items={posts.map((p) => ({
				description: p.excerpt,
				title: p.title,
				href: getPostUrl(p),
				createdAt: p.createdAt
			}))}
		/>
	{:else}
		<PageContentContainer>No posts found here ;</PageContentContainer>
	{/if}
</TopLevelMarginContainer>
