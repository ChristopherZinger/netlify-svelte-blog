<script lang="ts">
	import type { Post_WP, Tag_WP } from '$lib/schemas';
	import PageTitle from '$lib/components/PageTitle.svelte';
	import TopLevelMarginContainer from '$lib/components/containers/TopLevelMarginContainer.svelte';
	import TagList from '$lib/components/TagList.svelte';
	import { page } from '$app/stores';
	import PageContentContainer from '$lib/components/containers/PageContentContainer.svelte';
	import EntityList from '$lib/components/EntityList.svelte';

	export let data: { posts: Post_WP[]; tags: Tag_WP[] };

	$: posts = data.posts;
	$: selectedTagSlug = $page.url.searchParams.get('tag');
	$: selectedTagId = data.tags.find((t) => t.slug === selectedTagSlug)?.id || null;

	$: if (selectedTagId) {
		posts = data.posts.filter((p) => p.tags.includes(selectedTagId!));
	} else {
		posts = data.posts;
	}
</script>

<svelte:head>
	<title>Posts</title>
</svelte:head>

<PageTitle>Posts</PageTitle>

<TopLevelMarginContainer>
	<div class="lg:grid lg:grid-cols-12">
		<div class="lg:col-start-2 lg:col-span-8">
			<TagList selectedTagSlug={selectedTagSlug || null} tags={data.tags} />
		</div>
	</div>
</TopLevelMarginContainer>

<TopLevelMarginContainer>
	{#if posts.length}
		<EntityList
			items={posts.map((p) => ({
				descriptionHtml: p.excerpt.rendered,
				titleHtml: p.title.rendered,
				href: `/posts/${p.slug}`,
				createdAt: p.date
			}))}
		/>
	{:else}
		<PageContentContainer>No posts found here ;</PageContentContainer>
	{/if}
</TopLevelMarginContainer>
