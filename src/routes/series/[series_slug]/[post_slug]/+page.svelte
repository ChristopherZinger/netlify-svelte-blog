<script lang="ts">
	import type { Post_FsDoc, PostContent_FsDoc } from '$lib/schemas';
	import PostPage from '../../../../lib/components/postPage/PostPage.svelte';

	export let data: {
		post: Post_FsDoc;
		content: PostContent_FsDoc;
	};
</script>

<svelte:head>
	<title>{data.post.title}</title>
</svelte:head>

<PostPage content={data.content} post={data.post}>
	<div class="post-content lg:grid lg:grid-cols-12">
		<div class="lg:col-start-3 lg:col-span-7 2xl:col-start-4 2xl:col-span-5">
			{@html data.content.content}
		</div>
	</div>
</PostPage>
