export const wordpressApiUrl = new URL(
	'https://api.exclusive-or.dev/wp-json/wp/v2/'
);

export function appendPathItemToUrl(url: URL, chunk: string) {
	url.pathname = url.pathname + chunk + '/';
}
