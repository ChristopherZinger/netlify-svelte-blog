import { collection, getFirestore, collectionGroup } from 'firebase/firestore';

export enum CollectionName {
	posts = 'posts',
	series = 'series',
	tags = 'tags'
}

export type Tag_FsDoc = {
	id: string;
	name: string;
};

export type Post_FsDoc = {
	id: string;
	title: string;
	excerpt: string;
	tags: string[];
	createdAt: String;
};

export type PostContent_FsDoc = {
	id: string;
	content: string;
};

export type PostContentMarkdown_FsDoc = {
	id: string;
	content: string;
};

export type Series_FsDoc = {
	id: string;
	name: string;
	createdAt: string;
	description: string;
};
