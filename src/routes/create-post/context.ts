import { get, writable } from 'svelte/store';
import { slugifyTag } from '$lib/utils/slugify-utils';
import { uniq } from 'lodash';

export const editModeStore = writable<'edit' | 'preview'>('edit');

type PostInputData = {
	post: {
		title: string;
		excerpt: string;
	};
	postContent: {
		html: string;
		md: string;
	};
	series?: {
		slug: string;
		name: string;
		description: string;
	};
	tags: string[];
};

const _createPostInputStore = writable<PostInputData>({
	post: {
		title: '',
		excerpt: ''
	},
	postContent: {
		html: '',
		md: ''
	},
	series: {
		slug: '',
		name: '',
		description: ''
	},
	tags: []
});

export const createPostInput = {
	removeTag: (tag: string) => {
		const data = get(_createPostInputStore);
		_createPostInputStore.set({
			...data,
			tags: data.tags.filter((t) => t !== slugifyTag(tag))
		});
	},
	addTag: (tag: string) => {
		const data = get(_createPostInputStore);
		_createPostInputStore.set({
			...data,
			tags: uniq([...data.tags, slugifyTag(tag)])
		});
	},
	subscribe: _createPostInputStore.subscribe
};
