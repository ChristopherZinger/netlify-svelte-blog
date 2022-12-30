<script lang="ts">
	import HomePage, { type SeriesWithPosts } from '$lib/components/homePage/HomePage.svelte';
	import type { Post_FsDoc, Tag_FsDoc } from '$lib/schemas';

	export let data: {
		latestPosts: Post_FsDoc[];
		seriesWithPosts: SeriesWithPosts[];
		tags: Tag_FsDoc[];
	};
</script>

<svelte:head>
	<title>Random Code Stuff Go!</title>
</svelte:head>

<HomePage latestPosts={data.latestPosts} seriesWithPosts={data.seriesWithPosts} tags={data.tags} />
