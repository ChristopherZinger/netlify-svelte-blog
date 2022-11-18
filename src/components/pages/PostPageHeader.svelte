<script lang="ts">
	import type { PostContent_FsDoc, Post_FsDoc } from '$lib/schemas';
	import ContentContainer from '../ContentContainer.svelte';
	import PageTitle from '../PageTitle.svelte';
	import Spinner from '../Spinner.svelte';

	export let post: Post_FsDoc | undefined | null;
	export let content: PostContent_FsDoc | undefined | null;
</script>

{#if post === undefined || content === undefined}
	<Spinner />
{:else if !post || !content}
	<h2>404 Not Found</h2>
{:else}
	<PageTitle>{post.title}</PageTitle>

	<ContentContainer>
		<div class="grid lg:grid-cols-12 my-8">
			<div class="lg:col-start-2 lg:col-span-5">
				<p class="font-semibold">{post.excerpt}</p>
			</div>
		</div>
	</ContentContainer>
	<ContentContainer>
		<slot />
	</ContentContainer>
{/if}
