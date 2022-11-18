<script lang="ts">
	import ContentContainer from '../components/ContentContainer.svelte';
	import { browser } from '$app/environment';
	import { getLatestPosts } from '$lib/retrievers/posts';
	import type { Post_FsDoc, Series_FsDoc } from '$lib/schemas';
	import GridDisplay from '../components/GridDisplay.svelte';
	import TagList from '../components/TagList.svelte';
	import '@glidejs/glide/dist/css/glide.core.css';
	import Jumbotron from '../components/Jumbotron.svelte';
	import { getPostUrl } from '$lib/utils/post-url-utils';
	import { getLatestSeries } from '$lib/retrievers/series';
	import LatestSeries from '../components/LatestSeries.svelte';

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
<ContentContainer>
	<TagList />
</ContentContainer>

<ContentContainer>
	{#if posts !== undefined && series !== undefined}
		<GridDisplay {items} title="Latest Posts" href="/posts" />
	{/if}
</ContentContainer>

<LatestSeries series={series || []} />
