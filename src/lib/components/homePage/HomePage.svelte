<script context="module" lang="ts">
	export type SeriesWithPosts = {
		series: Series_FsDoc;
		posts: Post_FsDoc[];
	};
</script>

<script lang="ts">
	import TopLevelMarginContainer from '$lib/components/containers/TopLevelMarginContainer.svelte';
	import TagList from '$lib/components/TagList.svelte';
	import GridDisplay from '$lib/components/homePage/GridDisplay.svelte';
	import Jumbotron from '$lib/components/homePage/Jumbotron.svelte';
	import LatestSeries from '$lib/components/homePage/LatestSeries.svelte';
	import type { Post_FsDoc, Series_FsDoc, Tag_FsDoc } from '$lib/schemas';
	import { getPostUrl } from '$lib/utils/post-url-utils';

	export let latestPosts: Post_FsDoc[];
	export let seriesWithPosts: SeriesWithPosts[];
	export let tags: Tag_FsDoc[];
</script>

<Jumbotron />
<TopLevelMarginContainer>
	<TagList {tags} />
</TopLevelMarginContainer>

<TopLevelMarginContainer>
	<div class="mt-14">
		<GridDisplay
			items={latestPosts.map((p) => ({ ...p, href: getPostUrl(p) }))}
			title="Latest Posts"
			href="/posts"
		/>
	</div>
</TopLevelMarginContainer>

<LatestSeries {seriesWithPosts} />
