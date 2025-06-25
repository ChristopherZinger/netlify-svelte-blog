<script lang="ts">
	import TopLevelMarginContainer from '$lib/components/containers/TopLevelMarginContainer.svelte';
	import ExcerptContainer from '$lib/components/containers/ExcerptContainer.svelte';
	import PageTitle from '$lib/components/PageTitle.svelte';

	export let post: {
		title: string;
		excerptHtml: string;
		isLogBook: boolean;
		date: string;
	};
</script>

{#if post.isLogBook}
	<PageTitle>
		log: {new Date(post.date).toLocaleDateString('en', {
			year: 'numeric',
			month: 'numeric',
			day: '2-digit'
		})}
	</PageTitle>
{:else}
	<PageTitle>{@html post.title}</PageTitle>
	<ExcerptContainer>{@html post.excerptHtml}</ExcerptContainer>
{/if}

<TopLevelMarginContainer>
	<slot />
</TopLevelMarginContainer>
