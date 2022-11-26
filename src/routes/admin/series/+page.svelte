<script lang="ts">
	import { browser } from '$app/environment';
	import { getSeriesCollectionReference } from '$lib/collections';
	import type { Series_FsDoc } from '$lib/schemas';
	import { onSnapshot } from 'firebase/firestore';
	import Spinner from '../../../components/Spinner.svelte';

	let series: undefined | Series_FsDoc[];

	if (browser) {
		onSnapshot(getSeriesCollectionReference(), (r) => {
			series = r.docs.map((s) => s.data());
		});
	}
</script>

<div class="flex justify-between">
	<h1>Series</h1>
	<a href="/admin/series/create" class="font-bold p-5 border-2 border-black">+ create</a>
</div>
{#if series}
	{#if series.length}
		<ol class="my-10">
			{#each series as s}
				<li class="flex justify-between my-5">
					<diV>
						{s.name}
					</diV>
					<div>
						<a href={`/admin/series/${s.slug}`}>edit</a>
					</div>
				</li>
			{/each}
		</ol>
	{:else}
		not series created yet
	{/if}
{:else}
	<Spinner />
{/if}
