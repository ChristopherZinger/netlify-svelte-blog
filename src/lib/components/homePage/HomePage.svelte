<script lang="ts">
	import TopLevelMarginContainer from '$lib/components/containers/TopLevelMarginContainer.svelte';
	import TagList from '$lib/components/TagList.svelte';
	import GridDisplay from '$lib/components/homePage/GridDisplay.svelte';
	import Jumbotron from '$lib/components/homePage/Jumbotron.svelte';
	import type { Post_WP, Tag_WP } from '$lib/schemas';
	import PostListItem from './PostListItem.svelte';

	export let logBooks: Post_WP[];
	export let latestPosts: Post_WP[];
	export let tags: Tag_WP[];

	let selectedTagId: number | null = null;
	let shownPosts = latestPosts;
	function onSelectedTagIdChange (tagId: number | null) {
		shownPosts = tagId === null
		? latestPosts
		: latestPosts.filter(p => p.tags.includes(tagId));
	}
	$: onSelectedTagIdChange(selectedTagId)

	function onSelectTag (tagId: number | null) {
		selectedTagId = tagId;
	}
</script>

<Jumbotron />
<TopLevelMarginContainer>
	<TagList {tags} onSelectTag={onSelectTag} selectedTagId={selectedTagId} />
</TopLevelMarginContainer>

<TopLevelMarginContainer>
	<div class="mt-14">
		<GridDisplay>
			<div class="flex flex-col gap-6">
				<div class="pb-1 border-b border-black">
					<h2 class="text-2xl font-bold">Logbooks</h2>
				</div>

				<div
					class="flex flex-col gap-6 max-h-[600px] overflow-y-scroll"
				>
					{#each logBooks as logBook}
						<PostListItem post={logBook} />
					{/each}
				</div>

				<div class="pb-1 border-b border-black">
					<h2 class="text-2xl font-bold">Latest Posts</h2>
				</div>

				<div
					class="flex flex-col gap-6 max-h-[600px] overflow-y-auto"
				>
					{#each shownPosts as post}
						<PostListItem {post} />
					{/each}
				</div>
			</div></GridDisplay
		>
	</div>
</TopLevelMarginContainer>
