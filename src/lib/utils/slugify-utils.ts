import slugify from 'slugify';

export const slugifyTag = (tag: string) => slugify(tag, { lower: true, strict: true });
