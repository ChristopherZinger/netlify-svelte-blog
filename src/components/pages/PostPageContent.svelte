<script lang="ts">
	import type { PostContent_FsDoc, Post_FsDoc } from '$lib/schemas';
	import ContentContainer from '../ContentContainer.svelte';
	import Excerpt from '../Excerpt.svelte';
	import PageTitle from '../PageTitle.svelte';
	import Spinner from '../Spinner.svelte';

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
