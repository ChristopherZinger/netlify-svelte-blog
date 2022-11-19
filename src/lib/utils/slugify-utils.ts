import slugify from 'slugify';

export const slugifyTag = (tag: string) => slugify(tag, { lower: true, strict: true });

export const slugifySeries = (tag: string) => slugify(tag, { lower: true, strict: true });
