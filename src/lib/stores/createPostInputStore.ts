import { writable } from 'svelte/store';
import { uniqBy } from 'lodash';

export type TagWithIsNew = {
	slug: string;
	name: string;
	isNew: boolean;
};

type PostInputData = {
	post: {
		title: string;
		excerpt: string;
	};
	markdown: string;
	seriesSlug: string | null;
	tags: TagWithIsNew[];
};

const emptyPostInput: PostInputData = {
	post: {
		title: '',
		excerpt: ''
	},
	markdown: '',
	seriesSlug: null,
	tags: []
};

const _createPostInputStore = writable<PostInputData>(emptyPostInput);

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
		if (!seriesSlug) {
			_createSeriesInput.update((d) => ({
				slug: '',
				description: '',
				name: ''
			}));
		}
		_createPostInputStore.update((data) => {
			return {
				...data,
				seriesSlug
			};
		});
	},
	removeTagBySlug: (slug: string) => {
		_createPostInputStore.update((data) => ({
			...data,
			tags: data.tags.filter((tag) => {
				return tag.slug !== slug;
			})
		}));
	},
	addTag: (tag: TagWithIsNew) => {
		_createPostInputStore.update((data) => ({
			...data,
			tags: uniqBy([...data.tags, tag], 'slug')
		}));
	},
	removeAllTags: () => {
		_createPostInputStore.update((d) => ({
			...d,
			tags: []
		}));
	},
	updateTagBySlug: (slug: string, data: Partial<{ name: string; slug: string }>) => {
		_createPostInputStore.update((oldData) => {
			return {
				...oldData,
				tags: oldData.tags.map((t) => (t.slug === slug ? { ...t, ...data } : t))
			};
		});
	},
	resetAll: () => {
		_createPostInputStore.set(emptyPostInput);
	},
	subscribe: _createPostInputStore.subscribe
};

type CreateSeriesInput = {
	slug: string;
	name: string;
	description: string;
};

const emptySeriesInput = {
	slug: '',
	name: '',
	description: ''
};

const _createSeriesInput = writable<CreateSeriesInput>(emptySeriesInput);

export const createSeriesInput = {
	setSlug: (slug: string) => _createSeriesInput.update((d) => ({ ...d, slug })),

	setDescription: (description: string) =>
		_createSeriesInput.update((d) => ({ ...d, description })),

	setName: (name: string) => _createSeriesInput.update((d) => ({ ...d, name })),

	resetAll: () => {
		_createSeriesInput.set(emptySeriesInput);
	},

	subscribe: _createSeriesInput.subscribe
};
