<script lang="ts">
	import { browser } from '$app/environment';
	import { getAllSeries } from '$lib/retrievers/series';
	import type { Series_FsDoc } from '$lib/schemas';
	import ContentContainer from '../../components/ContentContainer.svelte';
	import EntityList from '../../components/EntityList.svelte';
	import PageTitle from '../../components/PageTitle.svelte';

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

{#if series}
	<ContentContainer>
		<EntityList
			items={series.map((i) => ({
				title: i.name,
				description: i.description,
				href: '/series/' + i.slug
			}))}
		/>
	</ContentContainer>
{/if}
