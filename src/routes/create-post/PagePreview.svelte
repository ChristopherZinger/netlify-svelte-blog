<script lang="ts">
	import { marked } from 'marked';
	import hljs from 'highlight.js';
	import PostPageHeader from '../../components/pages/PostPageHeader.svelte';
	import { createPostInput } from '$lib/stores/createPostInputStore';

	marked.setOptions({
		langPrefix: 'hljs language-',
		highlight: function (code) {
			return hljs.highlightAuto(code, ['html', 'javascript']).value;
		}
	});
</script>

<PostPageHeader
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
</PostPageHeader>
