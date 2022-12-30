<script lang="ts">
	import TopLevelMarginContainer from '$lib/components/containers/TopLevelMarginContainer.svelte';
	import LatestSeriesCarouse from '$lib/components/homePage/LatestSeriesCarouse.svelte';
	import type { SeriesWithPosts } from './HomePage.svelte';

	export let seriesWithPosts: SeriesWithPosts[];
</script>

<TopLevelMarginContainer>
	<div class="flex flex-col  gap-y-10">
		{#each seriesWithPosts as _series}
			<div class="lg:grid lg:grid-cols-12 gap-x-5">
				<div class="lg:col-span-3 mb-5">
					<a href={'/series/' + _series.series.slug}>
						<h4 class="h6 uppercase">{_series.series.name}</h4>
					</a>
				</div>
				<div class="lg:col-span-9">
					<LatestSeriesCarouse series={_series} />
				</div>
			</div>
		{/each}
	</div>
</TopLevelMarginContainer>
