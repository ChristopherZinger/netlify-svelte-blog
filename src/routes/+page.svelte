<script lang="ts">
	import HomePage, { type SeriesWithPosts } from '$lib/components/homePage/HomePage.svelte';
	import type { Post_WP, Tag_WP } from '$lib/schemas';

	export let data: {
		tags: Tag_WP[];
		posts: Post_WP[];
		logBooks: Post_WP[];
	};
</script>

<svelte:head>
	<title>Byte Increments</title>
</svelte:head>

<HomePage latestPosts={data.posts} tags={data.tags} logBooks={data.logBooks} />
