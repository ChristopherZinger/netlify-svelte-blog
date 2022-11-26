<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { getSeriesCollectionReference } from '$lib/collections';
	import type { Series_FsDoc } from '$lib/schemas';
	import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
	import SeriesForm from '../../../../components/SeriesForm.svelte';
	import Spinner from '../../../../components/Spinner.svelte';

	const { slug } = $page.params;

	let series: Series_FsDoc | undefined;

	if (browser && slug) {
		onSnapshot(doc(getSeriesCollectionReference(), slug), (r) => {
			series = r.data();
		});
	}
</script>

{#if series}
	<div>
		<h1>{series.name}</h1>
		<SeriesForm
			onSubmit={async ({ description, name }) => {
				await updateDoc(doc(getSeriesCollectionReference(), slug), {
					name,
					description
				});
				goto('/admin/series');
			}}
			initialValues={series}
		/>
	</div>
{:else}
	<Spinner />
{/if}
