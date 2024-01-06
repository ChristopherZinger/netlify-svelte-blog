<script lang="ts">
	import TopLevelMarginContainer from '$lib/components/containers/TopLevelMarginContainer.svelte';
	import ExcerptContainer from '$lib/components/containers/ExcerptContainer.svelte';
	import PageTitle from '$lib/components/PageTitle.svelte';

	export let post: { title: string; excerptHtml: string };
</script>

<PageTitle>{@html post.title}</PageTitle>

<ExcerptContainer>{@html post.excerptHtml}</ExcerptContainer>

<TopLevelMarginContainer>
	<slot />
</TopLevelMarginContainer>
