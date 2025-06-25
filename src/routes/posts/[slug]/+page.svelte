<script lang="ts">
	import { LOGBOOK_CATEGORY_ID, type Post_WP } from '$lib/schemas';
	import PostPage from '../../../lib/components/postPage/PostPage.svelte';

	export let data: {
		post: Post_WP;
	};
</script>

<svelte:head>
	<title>{data.post.title.rendered}</title>
</svelte:head>

<PostPage
	post={{
		title: data.post.title.rendered,
		excerptHtml: data.post.excerpt.rendered,
		isLogBook: data.post.categories.includes(LOGBOOK_CATEGORY_ID),
		date: data.post.date
	}}
>
	<div class="post-content lg:grid lg:grid-cols-12">
		<div
			class="lg:col-start-3 lg:col-span-7 2xl:col-start-4 2xl:col-span-5"
		>
			{@html data.post.content.rendered}
		</div>
	</div>
</PostPage>
