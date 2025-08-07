<script lang="ts">
	import type { Post_WP } from '$lib/schemas';
	import VisibilityLoader from '../VisibilityLoader.svelte';
	import PostListItem from './PostListItem.svelte';

	export let title: string;
	export let initialPosts: Post_WP[];
	export let onLoadNextPage: (page: number) => Promise<Post_WP[]>;

	let shownPosts = initialPosts;
	let page = 1;
	function onInitialPostChange(initialPosts: Post_WP[]) {
		hasLoadedAll = false;
		shownPosts = initialPosts;
		page = 1;
	}
	$: onInitialPostChange(initialPosts);

	let hasLoadedAll = false;
	async function _onLoadNextPage() {
		const newPage = await onLoadNextPage(++page);
		if (newPage.length > 0) {
			shownPosts = [...shownPosts, ...newPage];
		} else {
			hasLoadedAll = true;
		}
	}
</script>

<div class="pb-1 border-b border-black">
	<h2 class="text-2xl font-bold">{title}</h2>
</div>

<div
	class="flex flex-col gap-6 max-h-[600px]"
	class:overflow-y-auto={shownPosts.length > 0}
>
	{#if shownPosts.length > 0}
		{#each shownPosts as logBook}
			<PostListItem post={logBook} />
		{/each}
		<VisibilityLoader {hasLoadedAll} onLoadMore={_onLoadNextPage} />
	{:else}
		<p>No results found</p>
	{/if}
</div>
