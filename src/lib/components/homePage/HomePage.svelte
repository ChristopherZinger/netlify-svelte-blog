<script lang="ts">
	import TopLevelMarginContainer from '$lib/components/containers/TopLevelMarginContainer.svelte';
	import TagList from '$lib/components/TagList.svelte';
	import Jumbotron from '$lib/components/homePage/Jumbotron.svelte';
	import type { Category_WP, Post_WP, Tag_WP } from '$lib/schemas';
	import PostListItem from './PostListItem.svelte';

	export let logBooks: Post_WP[];
	export let latestPosts: Post_WP[];
	export let tags: Tag_WP[];
	export let categories: Category_WP[];

	let selectedTagId: number | null = null;
	let shownPosts = latestPosts;
	let shownLogBooks = logBooks;
	function onSelectedTagIdChange(tagId: number | null) {
		if (tagId === null) {
			shownPosts = latestPosts;
			shownLogBooks = logBooks;
			return;
		}
		shownPosts = latestPosts.filter((p) => p.tags.includes(tagId));
		shownLogBooks = logBooks.filter((p) => p.tags.includes(tagId));
	}
	$: onSelectedTagIdChange(selectedTagId);
</script>

<Jumbotron />

<TopLevelMarginContainer>
	<div class="flex gap-4 items-baseline mb-8 lg:mb-0">
		<h5>Threads:</h5>
		{#each categories as category}
			<a href={`/threads/${category.slug}`} class="underline"
				>{category.name},</a
			>
		{/each}
	</div>
</TopLevelMarginContainer>

<div class="lg:hidden">
	<TopLevelMarginContainer>
		<div class="flex gap-4 items-baseline">
			<h5>Tags:</h5>
			<TagList
				{tags}
				{selectedTagId}
				onSelectTag={(newTag) => {
					selectedTagId = newTag;
				}}
			/>
		</div>
	</TopLevelMarginContainer>
</div>

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
							class="flex flex-col gap-6 max-h-[600px]"
							class:overflow-y-auto={shownLogBooks.length > 0}
						>
							{#if shownLogBooks.length > 0}
								{#each shownLogBooks as logBook}
									<PostListItem post={logBook} />
								{/each}
							{:else}
								<p>No logbooks found for selected tag</p>
							{/if}
						</div>
					</div>
				</div>
				<div
					class="lg:col-span-3 lg:col-start-8  lg:block hidden px-4 py-6"
				>
					<TagList
						{tags}
						{selectedTagId}
						onSelectTag={(newTag) => {
							selectedTagId = newTag;
						}}
					/>
				</div>

				<div class="lg:col-span-6 lg:col-start-4">
					<div class="pb-1 border-b border-black">
						<h2 class="text-2xl font-bold">Latest Posts</h2>
					</div>

					<div
						class="flex flex-col gap-6 max-h-[600px]"
						class:overflow-y-auto={shownPosts.length > 0}
					>
						{#if shownPosts.length > 0}
							{#each shownPosts as post}
								<PostListItem {post} />
							{/each}
						{:else}
							<p>No posts found for selected tag</p>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
</TopLevelMarginContainer>
