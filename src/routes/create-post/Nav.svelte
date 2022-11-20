<script lang="ts">
	import TagList from './nav/TagList.svelte';
	import ContentContainer from '../../components/ContentContainer.svelte';
	import { editModeStore, createPostInput } from '$lib/stores/createPostInputStore';
	import TagInput from './nav/TagInput.svelte';
	import SeriesInput from './nav/SeriesInput.svelte';
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
				<SeriesInput />
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
