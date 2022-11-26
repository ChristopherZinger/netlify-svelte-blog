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

			<div />
		</div>
	</div>

	<ConfirmTags />

	<ConfirmSeries />

	{#if !isLoading}
		<div class="flex justify-between py-10">
			<a href="/admin/create-draft" class="p-5 font-bold border-2 border-black"> Back </a>
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
				class="p-5 font-bold border-2 border-black">Create Draft</button
			>
		</div>
	{:else}
		<Spinner />
	{/if}
</div>
