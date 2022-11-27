<script lang="ts">
	import TopLevelMarginContainer from '$lib/components/containers/TopLevelMarginContainer.svelte';
	import type { Series_FsDoc } from '$lib/schemas';
	import LatestSeriesCarouse from './LatestSeriesCarouse.svelte';

	export let series: Series_FsDoc[];
</script>

<TopLevelMarginContainer>
	<div class="flex flex-col  gap-y-10">
		{#each series as _series}
			<div class="lg:grid lg:grid-cols-12 gap-x-5">
				<div class="lg:col-span-3 mb-5">
					<a href={'/series/' + _series.slug}>
						<h4 class="h6 uppercase">{_series.name}</h4>
					</a>
				</div>
				<div class="lg:col-span-9">
					<LatestSeriesCarouse seriesSlug={_series.slug} />
				</div>
			</div>
		{/each}
	</div>
</TopLevelMarginContainer>
