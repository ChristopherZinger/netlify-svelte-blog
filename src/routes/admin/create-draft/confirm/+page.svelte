<script lang="ts">
	import { goto } from '$app/navigation';
	import { createPostInput, createSeriesInput } from '$lib/stores/createPostInputStore';
	import ContentContainer from '../../../../components/ContentContainer.svelte';
	import ConfirmSeries from './ConfirmSeries.svelte';
	import ConfirmTags from './ConfirmTags.svelte';
	import Spinner from '../../../../components/Spinner.svelte';
	import { createDraft } from '$lib/utils/create-post-utils';
	import { getFirestore } from 'firebase/firestore';

	let isLoading = false;
</script>

<div class="gird grid-cols-1 divide-y-2 gap-y-20">
	<ContentContainer>
		<div class="my-10">
			<div class="flex justify-between">
				<h1 class="h4">Post Info</h1>
				<div>
					<a
						href="/admin/create-draft"
						class="p-3 text-green-500 font-bold border-2 border-green-500"
					>
						Edit
					</a>
				</div>
			</div>
			<h2 class="h5 my-6">{$createPostInput.post.title}</h2>
			<p>{$createPostInput.post.excerpt}</p>
		</div>
	</ContentContainer>

	<ConfirmTags />

	<ConfirmSeries />

	<ContentContainer>
		{#if !isLoading}
			<div class="flex flex-row-reverse my-10">
				<button
					on:click={() => {
						isLoading = true;
						try {
							createDraft(getFirestore(), {
								post: $createPostInput.post,
								tags: $createPostInput.tags,
								markdown: $createPostInput.markdown,
								series: $createPostInput.seriesSlug ? $createSeriesInput : null
							});
						} catch (err) {
							console.log(err);
						}
						isLoading = false;
						goto('/');
					}}
					class="p-3 border border-black">Save</button
				>
			</div>
		{:else}
			<Spinner />
		{/if}
	</ContentContainer>
</div>
