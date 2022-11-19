<script lang="ts">
	import { browser } from '$app/environment';
	import { getAllTags } from '$lib/retrievers/tags';
	import TagList from './nav/TagList.svelte';
	import ContentContainer from '../../components/ContentContainer.svelte';
	import { editModeStore, createPostInput } from './context';
	import type { Series_FsDoc } from '$lib/schemas';
	import { getAllSeries } from '$lib/retrievers/series';

	let existingTags: string[] = [];
	let seriesToSelect: Series_FsDoc[] = [];
	let assignedSeries: Series_FsDoc | undefined;

	if (browser) {
		getAllTags().then((_tags) => {
			existingTags = _tags.map((t) => t.slug);
		});
		getAllSeries().then((_s) => {
			seriesToSelect = _s;
		});
	}

	$: tagsToSelect = existingTags.filter((t) => !$createPostInput.tags.includes(t));
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
				<div>
					<input
						type="text"
						name="tag"
						list="tags"
						placeholder="add tag"
						on:keydown={(e) => {
							if (e.code === 'Enter') {
								createPostInput.addTag(e.currentTarget.value);
								e.currentTarget.value = '';
							}
						}}
					/>
					<datalist id="tags">
						{#each tagsToSelect as value}
							<option {value} />
						{/each}
					</datalist>
				</div>
				<div>
					<input
						type="text"
						name="series"
						list="series"
						placeholder="assign to series"
						on:keydown={(e) => {
							if (e.code === 'Enter') {
								assignedSeries = seriesToSelect.find((s) => {
									return s.slug === e.currentTarget.value;
								});
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

	{#if assignedSeries}
		<ContentContainer>
			ASSIGNED SERIES: <span class="font-bold uppercase">{assignedSeries.name}</span>
		</ContentContainer>
	{/if}
</div>
