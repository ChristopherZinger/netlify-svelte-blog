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

// /tags/{slug}
export type Tag_FsDoc = {
	name: string;
	slug: string;
};

// /series/{slug}/
export type Series_FsDoc = {
	slug: string;
	name: string;
	createdAt: number; // timestamp
	description: string;
};

// /posts/{slug}
// /drafts/{slug}
// /series/{series-slug}/posts/{slug}
export type Post_FsDoc = {
	slug: string;
	title: string;
	excerpt: string;
	tags: string[];
	createdAt: number; // timestamp
	seriesSlug: string | null;
	publishedAt: number;
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
