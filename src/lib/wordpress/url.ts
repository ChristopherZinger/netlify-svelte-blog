export const wordpressApiUrl = new URL('https://staging.ciezar-architektury.pl/wp-json/wp/v2/');

export function appendPathItemToUrl(url: URL, chunk: string) {
	url.pathname = url.pathname + chunk + '/';
}
