<script lang="ts">
	import { browser } from '$app/environment';
	import { getDraftCollectionRef } from '$lib/collections';
	import Spinner from '$lib/components/Spinner.svelte';
	import { DocType, type Post_FsDoc } from '$lib/schemas';
	import { publishDraft } from '$lib/utils/create-post-utils';
	import { getFirestore, onSnapshot } from 'firebase/firestore';

	let drafts: undefined | Post_FsDoc[] = undefined;
	if (browser) {
		onSnapshot(getDraftCollectionRef(), (s) => {
			drafts = s.docs.map((d) => d.data());
		});
	}
</script>

<div class="flex justify-between">
	<h1>Drafts</h1>
	<a href="/admin/create-draft" class="p-5 border-2 border-black font-bold">+ create</a>
</div>

{#if drafts}
	<ul class="my-10">
		{#each drafts as draft}
			<li class="flex justify-between gap-y-5">
				<a
					href={`/admin/edit-post?doc_type=${DocType.draft}&doc_slug=${draft.slug}&series_slug=${
						draft.seriesSlug || ''
					}`}
				>
					{draft.title}
				</a>

				<button on:click={() => publishDraft(getFirestore(), draft.slug)}>publish</button>
			</li>
		{/each}
	</ul>
{:else}
	<Spinner />
{/if}
