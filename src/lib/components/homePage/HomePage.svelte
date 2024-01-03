<script context="module" lang="ts">
	export type SeriesWithPosts = {
		category: Category_WP;
		posts: Post_WP[];
	};
</script>

<script lang="ts">
	import TopLevelMarginContainer from '$lib/components/containers/TopLevelMarginContainer.svelte';
	import TagList from '$lib/components/TagList.svelte';
	import GridDisplay from '$lib/components/homePage/GridDisplay.svelte';
	import Jumbotron from '$lib/components/homePage/Jumbotron.svelte';
	import LatestSeries from '$lib/components/homePage/LatestSeries.svelte';
	import type { Post_WP, Category_WP, Tag_WP } from '$lib/schemas';

	export let latestPosts: Post_WP[];
	export let seriesWithPosts: SeriesWithPosts[];
	export let tags: Tag_WP[];
</script>

<Jumbotron />
<TopLevelMarginContainer>
	<TagList {tags} />
</TopLevelMarginContainer>

<TopLevelMarginContainer>
	<div class="mt-14">
		<GridDisplay
			items={latestPosts.map((p) => ({
				createdAt: p.date,
				excerptHtml: p.excerpt.rendered,
				href: `/posts/${p.slug}`,
				title: p.title.rendered
			}))}
			title="Latest Posts"
			href="/posts"
		/>
	</div>
</TopLevelMarginContainer>

<LatestSeries {seriesWithPosts} />
