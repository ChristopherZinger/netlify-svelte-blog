<script lang="ts">
	import type { Post_WP, PostContent_FsDoc } from '$lib/schemas';
	import PostPage from '../../../lib/components/postPage/PostPage.svelte';

	export let data: {
		post: Post_WP;
	};
</script>

<svelte:head>
	<title>{data.post.title}</title>
</svelte:head>

<PostPage
	post={{
		title: data.post.title.rendered,
		excerptHtml: data.post.excerpt.rendered
	}}
>
	<div class="post-content lg:grid lg:grid-cols-12">
		<div class="lg:col-start-3 lg:col-span-7 2xl:col-start-4 2xl:col-span-5">
			{@html data.post.content.rendered}
		</div>
	</div>
</PostPage>
