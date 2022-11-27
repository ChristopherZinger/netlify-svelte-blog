<script lang ts>
	import TopLevelMarginContainer from '$lib/components/containers/TopLevelMarginContainer.svelte';
	import TagList from '$lib/components/TagList.svelte';
	import GridDisplay from '$lib/components/homePage/GridDisplay.svelte';
	import Jumbotron from '$lib/components/homePage/Jumbotron.svelte';
	import LatestSeries from '$lib/components/homePage/LatestSeries.svelte';
	import type { Post_FsDoc, Series_FsDoc } from '$lib/schemas';
	import { browser } from '$app/environment';
	import { getLatestPosts } from '$lib/retrievers/posts';
	import { getLatestSeries } from '$lib/retrievers/series';
	import { getPostUrl } from '$lib/utils/post-url-utils';

	let posts: undefined | Post_FsDoc[];
	let series: undefined | Series_FsDoc[];

	if (browser) {
		Promise.all([getLatestPosts(), getLatestSeries()]).then(([_posts, _series]) => {
			posts = _posts;
			series = _series;
		});
	}

	$: items = posts?.map((p) => ({ title: p.title, excerpt: p.excerpt, href: getPostUrl(p) }));
</script>

<Jumbotron />
<TopLevelMarginContainer>
	<TagList />
</TopLevelMarginContainer>

<TopLevelMarginContainer>
	{#if posts !== undefined && series !== undefined}
		<div class="mt-14">
			<GridDisplay {items} title="Latest Posts" href="/posts" />
		</div>
	{/if}
</TopLevelMarginContainer>

<LatestSeries series={series || []} />
