<script lang="ts">
	import { browser } from '$app/environment';
	import TagList from './nav/TagList.svelte';
	import ContentContainer from '../../components/ContentContainer.svelte';
	import { editModeStore, createPostInput } from '$lib/stores/createPostInputStore';
	import type { Series_FsDoc } from '$lib/schemas';
	import { getAllSeries } from '$lib/retrievers/series';
	import { slugifySeries } from '$lib/utils/slugify-utils';
	import TagInput from './nav/TagInput.svelte';

	let seriesToSelect: Series_FsDoc[] = [];

	if (browser) {
		getAllSeries().then((_s) => {
			seriesToSelect = _s;
		});
	}
</script>

<ContentContainer>
	<div class="grid lg:grid-cols-12">
		<nav class="flex justify-between my-10 border col-start-2 col-span-11">
			<div>
				<button
					on:click={() => {
						editModeStore.set($editModeStore === 'edit' ? 'preview' : 'edit');
					}}>{$editModeStore === 'edit' ? 'Preview' : 'Edit'}</button
				>
			</div>

			<div class="flex divide-x-2">
				<TagInput />
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
			</div>
		</nav>
	</div>
</ContentContainer>

<div class="flex flex-col gap-y-10 my-10">
	<TagList />

	{#if $createPostInput.seriesSlug}
		<ContentContainer>
			<div class="lg:grid lg:grid-cols-12">
				<div class="lg:col-start-2 lg:col-span-11">
					<span>ASSIGNED SERIES:</span>
					<button
						on:click={() => {
							createPostInput.assignSeries(null);
						}}
						class="font-bold uppercase"
						>{$createPostInput.seriesSlug}
					</button>
				</div>
			</div>
		</ContentContainer>
	{/if}
</div>
