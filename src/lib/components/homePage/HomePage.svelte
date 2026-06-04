<script lang="ts">
	import TopLevelMarginContainer from '$lib/components/containers/TopLevelMarginContainer.svelte';
	import TagList from '$lib/components/TagList.svelte';
	import Jumbotron from '$lib/components/homePage/Jumbotron.svelte';
	import type { Category_WP, Post_WP, Tag_WP } from '$lib/schemas';
	import {
		getLogBooks,
		getPosts
	} from '$lib/wordpress/posts-retrieval-utils';
	import HomePagePostList from './HomePagePostList.svelte';
	import Dough from './Dough.svelte';

	export let logBooks: Post_WP[];
	export let latestPosts: Post_WP[];
	export let tags: Tag_WP[];
	export let categories: Category_WP[];

	let selectedTagId: number | null = null;
	let shownPosts = latestPosts;
	let shownLogBooks = logBooks;
	async function onSelectedTagIdChange(tagId: number | null) {
		if (tagId === null) {
			shownPosts = latestPosts;
			shownLogBooks = logBooks;
			return;
		}

		const [_shownLogBooks, _shownPosts] = await Promise.all([
			getLogBooks({ limit: 15, tags: [tagId] }),
			getPosts({ limit: 15, tags: [tagId] })
		]);

		shownLogBooks = _shownLogBooks;
		shownPosts = _shownPosts;
	}
	$: onSelectedTagIdChange(selectedTagId);
</script>

<Dough />

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
						<HomePagePostList
							title="Logbook"
							initialPosts={shownLogBooks}
							onLoadNextPage={(page) =>
								getLogBooks({ limit: 15, page })}
						/>
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
					<HomePagePostList
						title="Latest Posts"
						initialPosts={shownPosts}
						onLoadNextPage={(page) => getPosts({ limit: 15, page })}
					/>
				</div>
			</div>
		</div>
	</div>
</TopLevelMarginContainer>
