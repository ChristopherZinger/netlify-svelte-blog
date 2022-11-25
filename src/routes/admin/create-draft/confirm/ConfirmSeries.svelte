<script lang="ts">
	import { browser } from '$app/environment';
	import { getAllSeries } from '$lib/retrievers/series';
	import type { Series_FsDoc } from '$lib/schemas';
	import { createPostInput, createSeriesInput } from '$lib/stores/createPostInputStore';

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

<div class="flex flex-col gap-y-10 py-10">
	{#if $createPostInput.seriesSlug}
		<h6>
			SEREIS:
			<span class="font-bold">{$createPostInput.seriesSlug}</span>
		</h6>
	{/if}

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

			<div class="fong-italic text-sm text-red-600">
				** This is new series. You have to add title and description
			</div>
		</div>
	{/if}
</div>
