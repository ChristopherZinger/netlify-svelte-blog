<script context="module" lang="ts">
</script>

<script lang="ts">
	import { marked } from 'marked';
	import { writable } from 'svelte/store';
	import ContentContainer from '../../components/ContentContainer.svelte';

	const text = writable('');

	let showPreview = false;
</script>

<div>
	<ContentContainer>
		<div>
			<div class="mb-10">
				<button
					class="border border-black rounded p-5"
					on:click={() => {
						showPreview = !showPreview;
					}}>{showPreview ? 'edit' : 'preview'}</button
				>
			</div>
			{#if !showPreview}
				<div>
					<textarea
						class="border border-black p-10 rounded"
						on:input={({ currentTarget: { value } }) => text.set(value)}
						value={$text}
					/>
				</div>
			{:else}
				<div>{@html marked.parse($text)}</div>
			{/if}
		</div>
	</ContentContainer>
</div>

<style>
	textarea {
		width: 100%;
		background-color: rgb(220, 220, 220);
		height: 800px;
		padding: 10px;
	}
</style>
