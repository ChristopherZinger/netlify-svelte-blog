<script lang="ts">
	import Spinner from '$lib/components/Spinner.svelte';
	import type { PostContent_FsDoc } from '$lib/schemas';
	import ContentContainer from '../ContentContainer.svelte';
	import Excerpt from '../Excerpt.svelte';
	import PageTitle from '../PageTitle.svelte';

	export let post: { title: string; excerpt: string } | undefined | null;
	export let content: PostContent_FsDoc | undefined | null;
</script>

{#if post === undefined || content === undefined}
	<Spinner />
{:else if !post || !content}
	<h2>404 Not Found</h2>
{:else}
	<PageTitle>{post.title}</PageTitle>

	<Excerpt>{post.excerpt}</Excerpt>

	<ContentContainer>
		<slot />
	</ContentContainer>
{/if}
