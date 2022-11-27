<script lang="ts">
	import { getSeriesBySlug } from '$lib/retrievers/series';
	import type { Post_FsDoc, Series_FsDoc } from '$lib/schemas';
	import { page } from '$app/stores';
	import PageTitle from '$lib/components/PageTitle.svelte';
	import TopLevelMarginContainer from '$lib/components/containers/TopLevelMarginContainer.svelte';
	import ExcerptContainer from '$lib/components/containers/ExcerptContainer.svelte';
	import { getPostUrl } from '$lib/utils/post-url-utils';
	import { getSeriesPosts } from '$lib/retrievers/posts';
	import { browser } from '$app/environment';
	import EntityList from '$lib/components/EntityList.svelte';
	import PageContentContainer from '$lib/components/containers/PageContentContainer.svelte';
	import Spinner from '$lib/components/Spinner.svelte';

	const { series_slug } = $page.params;

	let series: Series_FsDoc | undefined | null;
	let posts: Post_FsDoc[] | undefined = undefined;

	if (browser) {
		getSeriesBySlug(series_slug).then((_series) => {
			series = _series || null;
		});
		getSeriesPosts(series_slug).then((_posts) => {
			posts = _posts;
		});
	}
</script>

<svelte:head>
	<title>{series ? series.name : 'Series'}</title>
</svelte:head>

{#if series === undefined}
	<Spinner />
{:else if !series}
	404
{:else}
	<PageTitle>{series.name}</PageTitle>

	<ExcerptContainer>{series.description}</ExcerptContainer>

	<TopLevelMarginContainer>
		{#if posts}
			{#if posts.length}
				<EntityList
					items={posts.map((p) => ({
						title: p.title,
						description: p.excerpt,
						href: getPostUrl(p)
					}))}
				/>
			{:else}
				<PageContentContainer>No posts here yet.</PageContentContainer>
			{/if}
		{:else}
			<PageContentContainer>
				<Spinner />
			</PageContentContainer>
		{/if}
	</TopLevelMarginContainer>
{/if}
