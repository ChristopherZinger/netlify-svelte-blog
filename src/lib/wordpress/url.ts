export const wordpressApiUrl = new URL(
	'https://api.byte-increments.dev/wp-json/wp/v2/'
);

export function appendPathItemToUrl(url: URL, chunk: string) {
	url.pathname = url.pathname + chunk + '/';
}
