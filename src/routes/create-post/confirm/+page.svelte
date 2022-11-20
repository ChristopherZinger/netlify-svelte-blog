<script lang="ts">
	import { goto } from '$app/navigation';
	import { createPostInput } from '$lib/stores/createPostInputStore';
	import ContentContainer from '../../../components/ContentContainer.svelte';
	import ConfirmSeries from './ConfirmSeries.svelte';
	import ConfirmTags from './ConfirmTags.svelte';
</script>

<div class="gird grid-cols-1 divide-y-2 gap-y-20">
	<ContentContainer>
		<div class="my-10">
			<div class="flex justify-between">
				<h1 class="h4">Post Info</h1>
				<div>
					<button
						on:click={() => goto('/create-post')}
						class="p-3 text-green-500 font-bold border-2 border-green-500">Edit</button
					>
				</div>
			</div>
			<h2 class="h5 my-6">{$createPostInput.post.title}</h2>
			<p>{$createPostInput.post.excerpt}</p>
		</div>
	</ContentContainer>

	<ConfirmTags />

	<ConfirmSeries />

	<ContentContainer>
		<div class="flex flex-row-reverse my-10">
			<button class="p-3 border border-black">Save</button>
		</div>
	</ContentContainer>
</div>
