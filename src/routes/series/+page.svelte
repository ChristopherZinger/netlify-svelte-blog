<script lang="ts">
	import type { Series_FsDoc } from '$lib/schemas';
	import TopLevelMarginContainer from '$lib/components/containers/TopLevelMarginContainer.svelte';
	import EntityList from '$lib/components/EntityList.svelte';
	import PageTitle from '$lib/components/PageTitle.svelte';
	import PageContentContainer from '$lib/components/containers/PageContentContainer.svelte';

	export let data: {
		series: Series_FsDoc[];
	};
</script>

<svelte:head>
	<title>Series</title>
</svelte:head>

<PageTitle>Series</PageTitle>

<TopLevelMarginContainer>
	{#if data.series.length}
		<EntityList
			items={data.series.map((i) => ({
				title: i.name,
				description: i.description,
				href: '/series/' + i.slug
			}))}
		/>
	{:else}
		<PageContentContainer>No series created yet.</PageContentContainer>
	{/if}
</TopLevelMarginContainer>
