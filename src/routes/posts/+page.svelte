<script lang="ts">
	import { browser } from '$app/environment';
	import type { Post_FsDoc } from '$lib/schemas';
	import PageTitle from '$lib/components/PageTitle.svelte';
	import TopLevelMarginContainer from '$lib/components/containers/TopLevelMarginContainer.svelte';
	import TagList from '../../components/TagList.svelte';
	import { page } from '$app/stores';
	import { getAllPosts, getPostsForTag } from '$lib/retrievers/posts';
	import { getPostUrl } from '$lib/utils/post-url-utils';
	import InnerContent from '../../components/InnerContent.svelte';
	import Spinner from '$lib/components/Spinner.svelte';

	$: tag = $page.url.searchParams.get('tag');

	let posts: undefined | Post_FsDoc[] = undefined;

	$: if (browser) {
		tag
			? getPostsForTag(tag).then((r) => {
					posts = r;
			  })
			: getAllPosts()
					.then((_posts) => {
						posts = _posts;
					})
					.catch((err) => {
						console.log(err);
					});
	}
</script>

<svelte:head>
	<title>Posts</title>
</svelte:head>

<PageTitle>Posts</PageTitle>

<TopLevelMarginContainer>
	<div class="grid grid-cols-12">
		<div class="lg:col-start-2 lg:col-span-8">
			<TagList selectedTag={tag || null} />
		</div>
	</div>
</TopLevelMarginContainer>

{#if posts}
	<TopLevelMarginContainer>
		{#if posts.length}
			<div class="grid grid-cols-1 lg:grid-cols-12 gap-y-10">
				<div class="lg:col-span-12 lg:col-start-2">
					{#each posts as post}
						<a href={getPostUrl(post)}>
							<h2 class="h4 mb-5">{post.title}</h2>
							<p>{post.excerpt}</p>
						</a>
					{/each}
				</div>
			</div>
		{:else}
			<InnerContent>No posts found here ;</InnerContent>
		{/if}
	</TopLevelMarginContainer>
{:else}
	<InnerContent><Spinner /></InnerContent>
{/if}
