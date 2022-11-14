<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import {
		getIndependentPostDocForId,
		getIndependentPostHtmlContentDocForId
	} from '$lib/retrivers';
	import PageTitle from '../../../components/PageTitle.svelte';
	import type { Post_FsDoc, PostContent_FsDoc } from '$lib/schemas';
	import ContentContainer from '../../../components/ContentContainer.svelte';
	import 'highlight.js/styles/a11y-light.css';

	const { id } = $page.params;

	let post: undefined | null | Post_FsDoc = undefined;
	let content: undefined | null | PostContent_FsDoc = undefined;

	if (browser) {
		Promise.all([getIndependentPostDocForId(id), getIndependentPostHtmlContentDocForId(id)]).then(
			([_post, _content]) => {
				post = _post || null;
				content = _content || null;
			}
		);
	}
</script>

<svelte:head>
	<title>{post ? post.title : 'Post'}</title>
</svelte:head>

{#if post === undefined || content === undefined}
	...loading
{:else if !post || !content}
	404
{:else}
	<ContentContainer>
		<PageTitle>{post.title}</PageTitle>
		<div class="grid lg:grid-cols-12 my-20">
			<div class="lg:col-start-2 lg:col-span-5">
				<p class="font-semibold">{post.excerpt}</p>
			</div>
		</div>

		<div class="post-content grid lg:grid-cols-12">
			<div class="lg:col-start-3 lg:col-span-7">
				{@html content.content}
			</div>
		</div>
	</ContentContainer>
{/if}
