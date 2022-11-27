<script lang="ts">
	import TopLevelMarginContainer from '$lib/components/containers/TopLevelMarginContainer.svelte';
	import { browser } from '$app/environment';
	import { getLatestPosts } from '$lib/retrievers/posts';
	import type { Post_FsDoc, Series_FsDoc } from '$lib/schemas';
	import GridDisplay from '$lib/components/homePage/GridDisplay.svelte';
	import TagList from '$lib/components/TagList.svelte';
	import '@glidejs/glide/dist/css/glide.core.css';
	import Jumbotron from '$lib/components/homePage/Jumbotron.svelte';
	import { getPostUrl } from '$lib/utils/post-url-utils';
	import { getLatestSeries } from '$lib/retrievers/series';
	import LatestSeries from '$lib/components/homePage/LatestSeries.svelte';

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

<svelte:head>
	<title>Random Code Stuff Go!</title>
</svelte:head>

<Jumbotron />
<TopLevelMarginContainer>
	<TagList />
</TopLevelMarginContainer>

<TopLevelMarginContainer>
	{#if posts !== undefined && series !== undefined}
		<GridDisplay {items} title="Latest Posts" href="/posts" />
	{/if}
</TopLevelMarginContainer>

<LatestSeries series={series || []} />
