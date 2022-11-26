<script lang="ts">
	import { goto } from '$app/navigation';
	import { createPostInput, createSeriesInput } from '$lib/stores/createPostInputStore';
	import ConfirmSeries from './ConfirmSeries.svelte';
	import ConfirmTags from './ConfirmTags.svelte';
	import Spinner from '../../../../components/Spinner.svelte';
	import { createDraft } from '$lib/utils/create-post-utils';
	import { getFirestore } from 'firebase/firestore';

	let isLoading = false;
</script>

<div class="divide-y-2">
	<div class="my-10">
		<div class="flex justify-between">
			<div>
				<h1 class="h4"><span>Title: </span>{$createPostInput.post.title}</h1>
				<p>{$createPostInput.post.excerpt}</p>
			</div>

			<div>
				<a
					href="/admin/create-draft"
					class="p-3 text-green-500 font-bold border-2 border-green-500"
				>
					Edit
				</a>
			</div>
		</div>
	</div>

	<ConfirmTags />

	<ConfirmSeries />

	{#if !isLoading}
		<div class="flex flex-row-reverse py-10">
			<button
				on:click={() => {
					isLoading = true;
					try {
						createDraft(getFirestore(), {
							post: $createPostInput.post,
							tags: $createPostInput.tags,
							markdown: $createPostInput.markdown,
							series:
								($createSeriesInput.slug && $createSeriesInput) ||
								$createPostInput.seriesSlug ||
								null
						});
					} catch (err) {
						console.log(err);
					}
					isLoading = false;
					goto('/');
				}}
				class="p-3 border border-black">Create Draft</button
			>
		</div>
	{:else}
		<Spinner />
	{/if}
</div>
