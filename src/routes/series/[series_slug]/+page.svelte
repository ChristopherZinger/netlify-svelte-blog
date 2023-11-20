<script lang="ts">
	import type { Post_FsDoc, Series_FsDoc } from '$lib/schemas';
	import PageTitle from '$lib/components/PageTitle.svelte';
	import TopLevelMarginContainer from '$lib/components/containers/TopLevelMarginContainer.svelte';
	import ExcerptContainer from '$lib/components/containers/ExcerptContainer.svelte';
	import { getPostUrl } from '$lib/utils/post-url-utils';
	import EntityList from '$lib/components/EntityList.svelte';
	import PageContentContainer from '$lib/components/containers/PageContentContainer.svelte';

	export let data: {
		posts: Post_FsDoc[];
		series: Series_FsDoc;
	};
</script>

<svelte:head>
	<title>{data.series.name}</title>
</svelte:head>

<PageTitle>{data.series.name}</PageTitle>

<ExcerptContainer>{data.series.description}</ExcerptContainer>

<TopLevelMarginContainer>
	{#if data.posts.length}
		<EntityList
			items={data.posts.map((p) => ({
				title: p.title,
				description: p.excerpt,
				href: getPostUrl(p),
				createdAt: p.createdAt
			}))}
		/>
	{:else}
		<PageContentContainer>No posts here yet.</PageContentContainer>
	{/if}
</TopLevelMarginContainer>
