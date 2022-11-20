<script lang="ts">
	import { browser } from '$app/environment';
	import { getAllSeries } from '$lib/retrievers/series';
	import type { Series_FsDoc } from '$lib/schemas';
	import { createPostInput } from '$lib/stores/createPostInputStore';
	import { slugifySeries } from '$lib/utils/slugify-utils';

	let seriesToSelect: Series_FsDoc[] = [];
	if (browser) {
		getAllSeries().then((_s) => {
			seriesToSelect = _s;
		});
	}
</script>

<div>
	<input
		type="text"
		name="series"
		list="series"
		placeholder="assign to series"
		on:keydown={(e) => {
			if (e.code === 'Enter') {
				createPostInput.assignSeries(slugifySeries(e.currentTarget.value));
				e.currentTarget.value = '';
			}
		}}
	/>
	<datalist id="series">
		{#each seriesToSelect as { slug }}
			<option value={slug} />
		{/each}
	</datalist>
</div>
