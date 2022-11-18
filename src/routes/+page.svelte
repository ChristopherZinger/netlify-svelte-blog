<script lang="ts">
	import ContentContainer from '../components/ContentContainer.svelte';
	import { browser } from '$app/environment';
	import { getLatestPosts, getLatestSeries } from '$lib/retrivers';
	import type { Post_FsDoc, Series_FsDoc } from '$lib/schemas';
	import GridDisplay from '../components/GridDisplay.svelte';
	import TagList from '../components/TagList.svelte';
	import '@glidejs/glide/dist/css/glide.core.css';
	import Jumbotron from '../components/Jumbotron.svelte';

	let posts: undefined | Post_FsDoc[];
	let series: undefined | Series_FsDoc[];

	if (browser) {
		Promise.all([getLatestPosts(), getLatestSeries()]).then(([_posts, _series]) => {
			posts = _posts;
			series = _series;
		});
	}

	/* 
  TODO:
    this iteration below should distinguish 
    between independent and series-post and put
    correct id in href. Now it only works with 
    independent posts
  */
	$: items = posts?.map((p) => ({ title: p.title, excerpt: p.excerpt, href: `/posts/${p.id}` }));
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
		<!-- <GridDisplay
			items={series?.map((s) => ({ title: s.name, excerpt: s.description }))}
			title="Series"
			href="/series"
		/> -->
	{/if}
</ContentContainer>
