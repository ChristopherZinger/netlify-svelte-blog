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
// /series/{series-slug}/drafts/{slug}
export type Post_FsDoc = {
	slug: string;
	title: string;
	excerpt: string;
	tags: string[];
	createdAt: number; // timestamp
	seriesSlug: string | null;
};

// /posts/{post-slug}/content/{ContentType}/
// /series/{series-slug}/posts/{post-slug}/content/{ContentType}/
export type PostContent_FsDoc = {
	postId: string;
	content: string;
};
