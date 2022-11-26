<script lang="ts">
	import { goto } from '$app/navigation';
	import { getSeriesCollectionReference } from '$lib/collections';
	import { slugifyURL } from '$lib/utils/slugify-utils';
	import { doc, runTransaction, getFirestore } from 'firebase/firestore';
	import SeriesForm from '../../../../components/SeriesForm.svelte';
</script>

<div>
	<h1>Create Post</h1>
	<SeriesForm
		onSubmit={async ({ description, name }) => {
			const slug = slugifyURL(name);
			const seriesDocRef = doc(getSeriesCollectionReference(), slug);
			runTransaction(getFirestore(), async (t) => {
				if (!(await t.get(seriesDocRef)).exists()) {
					t.set(seriesDocRef, {
						name,
						description,
						slug,
						createdAt: new Date().getTime()
					});
				}
				goto('/admin/series');
			});
		}}
	/>
</div>
