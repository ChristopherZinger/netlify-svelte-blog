export enum CollectionName {
	posts = 'posts',
	series = 'series',
	tags = 'tags',
	content = 'content'
}

export enum ContentType {
	html = 'html',
	markdown = 'markdown'
}

export type Tag_FsDoc = {
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
	postId: string;
	content: string;
};

export type Series_FsDoc = {
	id: string;
	name: string;
	createdAt: string;
	description: string;
};
