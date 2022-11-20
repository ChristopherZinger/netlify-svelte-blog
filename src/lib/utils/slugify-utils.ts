import slugify from 'slugify';

const slugifyOptions = {
	lower: true,
	strict: true
};

export const slugifyURL = (tag: string) => slugify(tag, slugifyOptions);
