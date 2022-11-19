<script lang="ts">
	import { marked } from 'marked';
	import hljs from 'highlight.js';
	import PostPageHeader from '../../components/pages/PostPageHeader.svelte';
	import { createPostInput } from '$lib/stores/createPostInputStore';

	export let text: string;

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
	{@html marked.parse(text)}
</PostPageHeader>
