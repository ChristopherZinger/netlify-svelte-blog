<script lang="ts">
	import { browser } from '$app/environment';
	import { getAboutCollectionRef } from '$lib/collections';
	import Spinner from '$lib/components/Spinner.svelte';
	import { markdownToHTML } from '$lib/utils/marked-utils';
	import { addDoc, getDocs, limit, query, orderBy } from 'firebase/firestore';

	let markdown = '';
	let loading = false;

	const save = async (publish: boolean = false) => {
		loading = true;
		try {
			await addDoc(getAboutCollectionRef(), {
				createdAt: new Date().getTime(),
				isPublished: publish,
				markdown,
				html: markdownToHTML(markdown)
			});
		} catch (error) {
			console.error(error);
		}
		loading = false;
	};

	if (browser) {
		getDocs(query(getAboutCollectionRef(), orderBy('createdAt', 'desc'), limit(1))).then((r) => {
			markdown = r.docs[0]?.data()?.markdown || '';
		});
	}
</script>

<form>
	<div class="mt-10 flex flex-row-reverse gap-x-10">
		<button
			on:click|preventDefault={() => save()}
			type="submit"
			class="p-5 font-bold border-2 border-black"
			disabled={loading}
		>
			{#if loading}
				<Spinner />
			{:else}
				Publish
			{/if}
		</button>
		<button
			on:click|preventDefault={() => {
				console.log(markdown);
			}}
			type="submit"
			class="p-5 font-bold border-2 border-black"
			disabled={loading}
		>
			{#if loading}
				<Spinner />
			{:else}
				Save
			{/if}
		</button>
	</div>

	<div>
		<label for="excerpt">About:</label>
		<div class="flex gap-10">
			<textarea
				class="excerpt mt-2 w-full h-96 border border-black p-3 rounded gb-slate-100"
				placeholder="excerpt"
				bind:value={markdown}
			/>
			<div class="post-content">
				<div>
					{@html markdownToHTML(markdown)}
				</div>
			</div>
		</div>
	</div>
</form>

<style>
	textarea {
		height: 1000px;
	}
</style>
