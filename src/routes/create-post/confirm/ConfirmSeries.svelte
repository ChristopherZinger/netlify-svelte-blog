<script lang="ts">
	import { browser } from '$app/environment';
	import { getAllSeries } from '$lib/retrievers/series';
	import type { Series_FsDoc } from '$lib/schemas';
	import { createPostInput, createSeriesInput } from '$lib/stores/createPostInputStore';
	import ContentContainer from '../../../components/ContentContainer.svelte';
	import SeriesInput from '../nav/SeriesInput.svelte';

	let existingSeries: Series_FsDoc[] = [];

	if (browser) {
		getAllSeries().then((d) => {
			existingSeries = d;
		});
	}

	$: isSeriesNew = !existingSeries.map((s) => s.slug).includes($createPostInput.seriesSlug || '');

	$: isSeriesNew &&
		((s: string) => {
			s.length && createSeriesInput.setSlug(s);
		})($createPostInput.seriesSlug || '');
</script>

<ContentContainer>
	<div class="flex flex-col gap-y-10 my-10">
		<h1 class="h4">Assign Series</h1>

		<div class="flex gap-x-5">
			<span class="font-bold">Assign Series:</span>
			<SeriesInput />
		</div>

		{#if $createPostInput.seriesSlug && isSeriesNew}
			<div class="grid grid-cols-2 gap-x-10">
				<div class="flex flex-col gap-y-2">
					<label for="new-series-title">Series Name</label>
					<input
						on:input={({ currentTarget }) => {
							createSeriesInput.setName(currentTarget.value);
						}}
						value={$createSeriesInput.name}
						class="p-2 border"
						type="text"
						id="new-series-title"
						name="new-series-title"
					/>

					<div>slug: {$createSeriesInput.slug}</div>
				</div>

				<div class="flex flex-col gap-y-2">
					<label for="new-series-description">Description</label>
					<textarea
						id="new-series-description"
						class="p-2 border"
						on:input={({ currentTarget: { value } }) => {
							createSeriesInput.setDescription(value);
						}}
						value={$createSeriesInput.description}
					/>
				</div>
			</div>
		{/if}

		{#if $createPostInput.seriesSlug}
			<div>
				ASSIGNED SEREIS SLUG:
				<span class="font-bold">{$createPostInput.seriesSlug}</span>
			</div>

			<div>
				<button
					on:click={() => createPostInput.assignSeries(null)}
					class="font-bold text-red-600 p-2 border-red-600 border-2"
				>
					remove series assignment
				</button>
			</div>
		{/if}
	</div>
</ContentContainer>
