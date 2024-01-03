<script lang="ts">
	import type { Post_WP, Category_WP } from '$lib/schemas';
	import PageTitle from '$lib/components/PageTitle.svelte';
	import TopLevelMarginContainer from '$lib/components/containers/TopLevelMarginContainer.svelte';
	import ExcerptContainer from '$lib/components/containers/ExcerptContainer.svelte';
	import EntityList from '$lib/components/EntityList.svelte';
	import PageContentContainer from '$lib/components/containers/PageContentContainer.svelte';

	export let data: {
		posts: Post_WP[];
		series: Category_WP;
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
				titleHtml: p.title.rendered,
				descriptionHtml: p.excerpt.rendered,
				href: '/posts/' + p.slug
			}))}
		/>
	{:else}
		<PageContentContainer>No posts here yet.</PageContentContainer>
	{/if}
</TopLevelMarginContainer>
