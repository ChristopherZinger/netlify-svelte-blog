<script lang="ts">
	import { browser } from '$app/environment';
	import { getAllSeries } from '$lib/retrievers/series';
	import type { Series_FsDoc } from '$lib/schemas';
	import { createPostInput } from '$lib/stores/createPostInputStore';
	import { slugifyURL } from '$lib/utils/slugify-utils';

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
		class="p-3 border border-black rounded"
		on:keydown={(e) => {
			if (e.code === 'Enter') {
				createPostInput.assignSeries(slugifyURL(e.currentTarget.value));
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
