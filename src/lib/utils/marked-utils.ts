import hljs from 'highlight.js';
import { marked } from 'marked';

marked.setOptions({
	breaks: true,
	langPrefix: 'hljs language-',
	highlight: function (code: string) {
		return hljs.highlightAuto(code, ['html', 'javascript']).value;
	}
});

export const markdownToHTML = (md: string): string => marked.parse(md);
