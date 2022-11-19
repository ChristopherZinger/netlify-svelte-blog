import { writable } from 'svelte/store';
import { slugifyTag } from '$lib/utils/slugify-utils';
import { uniq } from 'lodash';

export const editModeStore = writable<'edit' | 'preview'>('edit');

type PostInputData = {
	post: {
		title: string;
		excerpt: string;
	};
	markdown: string;
	seriesSlug: string | null;
	tags: string[];
};

const _createPostInputStore = writable<PostInputData>({
	post: {
		title: '',
		excerpt: ''
	},
	markdown: '',
	seriesSlug: null,
	tags: []
});

export const createPostInput = {
	setTitle: (title: string) => {
		_createPostInputStore.update((data) => ({
			...data,
			post: {
				...data.post,
				title
			}
		}));
	},
	setExcerpt: (excerpt: string) => {
		_createPostInputStore.update((data) => ({
			...data,
			post: {
				...data.post,
				excerpt
			}
		}));
	},
	setMarkdown: (markdown: string) => {
		_createPostInputStore.update((data) => ({
			...data,
			markdown
		}));
	},
	assignSeries: (seriesSlug: string | null) => {
		_createPostInputStore.update((data) => {
			return {
				...data,
				seriesSlug
			};
		});
	},
	removeTag: (tag: string) => {
		_createPostInputStore.update((data) => ({
			...data,
			tags: data.tags.filter((t) => t !== slugifyTag(tag))
		}));
	},
	addTag: (tag: string) => {
		_createPostInputStore.update((data) => ({
			...data,
			tags: uniq([...data.tags, slugifyTag(tag)])
		}));
	},
	subscribe: _createPostInputStore.subscribe
};
