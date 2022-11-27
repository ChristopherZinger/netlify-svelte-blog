<script lang="ts">
	import Spinner from '$lib/components/Spinner.svelte';
	import type { PostContent_FsDoc } from '$lib/schemas';
	import TopLevelMarginContainer from '$lib/components/containers/TopLevelMarginContainer.svelte';
	import ExcerptContainer from '$lib/components/containers/ExcerptContainer.svelte';
	import PageTitle from '$lib/components/PageTitle.svelte';

	export let post: { title: string; excerpt: string } | undefined | null;
	export let content: PostContent_FsDoc | undefined | null;
</script>

{#if post === undefined || content === undefined}
	<Spinner />
{:else if !post || !content}
	<h2>404 Not Found</h2>
{:else}
	<PageTitle>{post.title}</PageTitle>

	<ExcerptContainer>{post.excerpt}</ExcerptContainer>

	<TopLevelMarginContainer>
		<slot />
	</TopLevelMarginContainer>
{/if}
