<script lang="ts">
	import { marked } from 'marked';
	import PostPage from '../../../lib/components/postPage/PostPage.svelte';
	import { createPostInput } from '$lib/stores/createPostInputStore';
	import { markedOptions } from '$lib/utils/marked-utils';

	marked.setOptions(markedOptions);
</script>

<PostPage
	post={{
		title: $createPostInput.post.title,
		excerpt: $createPostInput.post.excerpt
	}}
	content={{ postId: 'todo', content: 'todo' }}
>
	<div class="post-content grid lg:grid-cols-12">
		<div class="lg:col-start-3 lg:col-span-7">
			{@html marked.parse($createPostInput.markdown)}
		</div>
	</div>
</PostPage>
