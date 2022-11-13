<script lang="ts">
	import ContentContainer from '../components/ContentContainer.svelte';
	import { browser } from '$app/environment';
	import { getLatestPosts, getLatestSeries } from '$lib/retrivers';
	import type { Post_FsDoc, Series_FsDoc } from '$lib/schemas';
	import GridDisplay from '../components/GridDisplay.svelte';

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

<ContentContainer>
	<section class="my-20">
		<h1 class="text-3xl my-5 text-center bold">Hi, This will be a blog in the future.</h1>
		<p class="text-center">Now it's just a work in progress.</p>
	</section>
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
