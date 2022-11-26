<script lang="ts">
	import TagList from './nav/TagList.svelte';
	import { createPostInput } from '$lib/stores/createPostInputStore';
	import TagInput from './nav/TagInput.svelte';
	import SeriesInput from './nav/SeriesInput.svelte';
	import NewSeriesInput from './confirm/NewSeriesInput.svelte';
	import NewTagsInput from './confirm/NewTagsInput.svelte';
</script>

<nav class="flex flex-row-reverse my-10 gap-x-10">
	<TagInput />
	<SeriesInput />
</nav>

<div class="flex flex-col gap-y-10 my-10">
	<TagList />
	<NewTagsInput />

	{#if $createPostInput.seriesSlug}
		<div>
			<span>ASSIGNED SERIES:</span>
			<button
				on:click={() => {
					createPostInput.assignSeries(null);
				}}
				class="font-bold uppercase"
				>{$createPostInput.seriesSlug}
			</button>
		</div>
	{/if}
	<NewSeriesInput />
</div>
