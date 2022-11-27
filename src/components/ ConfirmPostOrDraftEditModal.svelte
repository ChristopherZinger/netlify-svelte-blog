<script lang="ts">
	import { createPostInput } from '$lib/stores/createPostInputStore';
	import Modal from '$lib/components/Modal.svelte';

	export let onClose: () => void;
	export let onConfirm: () => Promise<void>;
	export let isOpen: boolean;
	export let isLoading: boolean;
</script>

<Modal {isOpen}>
	<div class="h-full flex flex-col justify-between p-10">
		<div class="divide-y-2 overflow-auto">
			<h2 class="pb-10">Confirm</h2>

			<slot name="info-top" />

			<div class="py-10">
				<div class="flex justify-between">
					<div>
						<h1 class="h4 mb-5"><span>Title: </span>{$createPostInput.post.title}</h1>
						<p>{$createPostInput.post.excerpt}</p>
					</div>
					<div />
				</div>
			</div>

			{#if $createPostInput.tags.length}
				<div class="py-10 flex gap-x-10">
					<h3 class="h6">Tags:</h3>
					<ul class="flex gap-x-5 flex-wrap">
						{#each $createPostInput.tags as { slug }}
							<li>
								#{slug}
							</li>
						{/each}
					</ul>
				</div>
			{/if}

			{#if $createPostInput.seriesSlug}
				<div class="flex flex-col gap-y-10 py-10">
					<h6>
						SEREIS:
						<span class="font-bold">{$createPostInput.seriesSlug}</span>
					</h6>
				</div>
			{/if}
		</div>

		<div class="flex justify-between py-10">
			<button class="p-5 font-bold border-2 border-black" on:click={onClose}>Exit</button>

			<button disabled={isLoading} on:click={onConfirm} class="p-5 font-bold border-2 border-black">
				Confirm
			</button>
		</div>
	</div>
</Modal>
