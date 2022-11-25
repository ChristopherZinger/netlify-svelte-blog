<script lang="ts">
	import { browser } from '$app/environment';
	import { getDraftCollectionRef } from '$lib/collections';
	import type { Post_FsDoc } from '$lib/schemas';
	import { publishDraft } from '$lib/utils/create-post-utils';
	import { getFirestore, onSnapshot } from 'firebase/firestore';
	import Spinner from '../../../components/Spinner.svelte';

	let drafts: undefined | Post_FsDoc[] = undefined;
	if (browser) {
		onSnapshot(getDraftCollectionRef(), (s) => {
			drafts = s.docs.map((d) => d.data());
		});
	}
</script>

<h1>Drafts</h1>

{#if drafts}
	<ul class="my-10">
		{#each drafts as draft}
			<li class="flex justify-between gap-y-5">
				<p>{draft.title}</p>
				<button on:click={() => publishDraft(getFirestore(), draft.slug)}>publish</button>
			</li>
		{/each}
	</ul>
{:else}
	<Spinner />
{/if}
