import hljs from 'highlight.js';

export const markedOptions = {
	langPrefix: 'hljs language-',
	highlight: function (code: string) {
		return hljs.highlightAuto(code, ['html', 'javascript']).value;
	}
};
