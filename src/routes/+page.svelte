<script lang="ts">
	import HomePage, { type SeriesWithPosts } from '$lib/components/homePage/HomePage.svelte';
	import type { Post_WP, Tag_WP } from '$lib/schemas';

	export let data: {
		tags: Tag_WP[];
		posts: Post_WP[];
	};
</script>

<svelte:head>
	<title>Random Code Stuff Go!</title>
</svelte:head>

<HomePage latestPosts={data.posts} tags={data.tags} />
