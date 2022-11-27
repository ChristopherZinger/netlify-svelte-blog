<script lang="ts">
	import { browser } from '$app/environment';
	import { getAllSeries } from '$lib/retrievers/series';
	import type { Series_FsDoc } from '$lib/schemas';
	import TopLevelMarginContainer from '$lib/components/containers/TopLevelMarginContainer.svelte';
	import EntityList from '$lib/components/EntityList.svelte';
	import PageTitle from '$lib/components/PageTitle.svelte';
	import PageContentContainer from '$lib/components/containers/PageContentContainer.svelte';
	import Spinner from '$lib/components/Spinner.svelte';

	let series: Series_FsDoc[] | undefined;

	if (browser) {
		getAllSeries().then((_series) => {
			series = _series;
		});
	}
</script>

<svelte:head>
	<title>Series</title>
</svelte:head>

<PageTitle>Series</PageTitle>

<TopLevelMarginContainer>
	{#if series}
		{#if series.length}
			<EntityList
				items={series.map((i) => ({
					title: i.name,
					description: i.description,
					href: '/series/' + i.slug
				}))}
			/>
		{:else}
			<PageContentContainer>No series created yet.</PageContentContainer>
		{/if}
	{:else}
		<PageContentContainer>
			<Spinner />
		</PageContentContainer>
	{/if}
</TopLevelMarginContainer>
