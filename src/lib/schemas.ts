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
