<script lang="ts">
	import { browser } from '$app/environment';
	import { getAboutCollectionRef } from '$lib/collections';
	import PageContentContainer from '$lib/components/containers/PageContentContainer.svelte';
	import TopLevelMarginContainer from '$lib/components/containers/TopLevelMarginContainer.svelte';
	import PageTitle from '$lib/components/PageTitle.svelte';
	import { getDocs, limit, query, orderBy } from 'firebase/firestore';

	let content: string | undefined;
	if (browser) {
		getDocs(query(getAboutCollectionRef(), orderBy('createdAt', 'desc'), limit(1))).then((r) => {
			content = r.docs[0].data().html;
		});
	}
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<PageTitle>About</PageTitle>

<TopLevelMarginContainer>
	{#if content}
		<PageContentContainer>
			<div class="post-content">
				<div>
					{@html content}
				</div>
			</div>
		</PageContentContainer>
	{/if}
</TopLevelMarginContainer>
