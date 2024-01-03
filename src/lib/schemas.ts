export enum CollectionName {
	posts = 'posts',
	series = 'series',
	tags = 'tags',
	content = 'content',
	drafts = 'drafts',
	about = 'about'
}

export enum ContentType {
	html = 'html',
	markdown = 'markdown'
}

export enum DocType {
	post = 'post',
	draft = 'draft'
}

export type Tag_WP = {
	id: number;
	count: number;
	description: string;
	link: string;
	name: string;
	slug: string;
	taxonomy: string;
};

export type Category_WP = {
	id: number;
	count: number;
	description: string;
	link: string;
	name: string;
	slug: string;
	taxonomy: string;
};

export type Page_WP = {
	id: number;
	date: string;
	modified: string;
	slug: string;
	status: string;
	type: 'page';
	title: { rendered: string };
	content: {
		rendered: string;
		protected: boolean;
	};
	excerpt: {
		rendered: string;
		protected: boolean;
	};
};

export type Post_WP = {
	id: number;
	date: string;
	modified: string;
	slug: 'hello-world';
	status: string;
	type: 'post';
	link: string;
	title: { rendered: string };
	content: {
		protected: boolean;
		rendered: string;
	};
	excerpt: {
		protected: boolean;
		rendered: string;
	};
	categories: number[]; // array of ids
	tags: number[]; // array of ids
};

// /posts/{post-slug}/content/{ContentType}/
// /series/{series-slug}/posts/{post-slug}/content/{ContentType}/
export type PostContent_FsDoc = {
	postId: string;
	content: string;
};

// /about
export type About_FsDoc = {
	isPublished: boolean;
	html: string;
	markdown: string;
	createdAt: number;
};
