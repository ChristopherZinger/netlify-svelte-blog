<script lang="ts">
	import { marked } from 'marked';
	import ContentContainer from '../../components/ContentContainer.svelte';
	import hljs from 'highlight.js';

	export let text: string;

	marked.setOptions({
		langPrefix: 'hljs language-',
		highlight: function (code) {
			return hljs.highlightAuto(code, ['html', 'javascript']).value;
		}
	});
</script>

<ContentContainer>
	<div>{@html marked.parse(text)}</div>
</ContentContainer>
