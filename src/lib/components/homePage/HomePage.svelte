<script lang="ts">
	import TopLevelMarginContainer from '$lib/components/containers/TopLevelMarginContainer.svelte';
	import TagList from '$lib/components/TagList.svelte';
	import Jumbotron from '$lib/components/homePage/Jumbotron.svelte';
	import type { Post_WP, Tag_WP } from '$lib/schemas';
	import PostListItem from './PostListItem.svelte';

	export let logBooks: Post_WP[];
	export let latestPosts: Post_WP[];
	export let tags: Tag_WP[];

	let selectedTagId: number | null = null;
	let shownPosts = latestPosts;
	function onSelectedTagIdChange(tagId: number | null) {
		shownPosts =
			tagId === null
				? latestPosts
				: latestPosts.filter((p) => p.tags.includes(tagId));
	}
	$: onSelectedTagIdChange(selectedTagId);
</script>

<Jumbotron />
<TopLevelMarginContainer>
	<TagList
		{tags}
		{selectedTagId}
		onSelectTag={(newTag) => {
			selectedTagId = newTag;
		}}
	/>
</TopLevelMarginContainer>

<TopLevelMarginContainer>
	<div class="mt-14">
		<div class="mb-12 pb-12 border-b-black">
			<div class="grid grid-cols-1 lg:grid-cols-12 gap-y-8">
				<div class="lg:col-span-6 lg:col-start-2 mb-12">
					<div class="flex flex-col gap-6">
						<div class="pb-1 border-b border-black">
							<h2 class="text-2xl font-bold">Logbook</h2>
						</div>

						<div
							class="flex flex-col gap-6 max-h-[600px] overflow-y-scroll"
						>
							{#each logBooks as logBook}
								<PostListItem post={logBook} />
							{/each}
						</div>
					</div>
				</div>

				<div class="lg:col-span-6 lg:col-start-4">
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
				</div>
			</div>
		</div>
	</div>
</TopLevelMarginContainer>
