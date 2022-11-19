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
	createdAt: string;
	description: string;
};

// /posts/{slug}
// /series/{series-slug}/posts/{slug}
export type Post_FsDoc = {
	slug: string;
	title: string;
	excerpt: string;
	tags: string[];
	createdAt: string;
	seriesSlug: string | null; // only for posts in series
};

// /posts/{post-slug}/content/{ContentType}/
// /series/{series-slug}/posts/{post-slug}/content/{ContentType}/
export type PostContent_FsDoc = {
	postId: string;
	content: string;
};
