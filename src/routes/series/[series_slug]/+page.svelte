<script lang="ts">
	import { getSeriesBySlug } from '$lib/retrievers/series';
	import type { Post_FsDoc, Series_FsDoc } from '$lib/schemas';
	import { page } from '$app/stores';
	import PageTitle from '../../../components/PageTitle.svelte';
	import Spinner from '../../../components/Spinner.svelte';
	import ContentContainer from '../../../components/ContentContainer.svelte';
	import Excerpt from '../../../components/Excerpt.svelte';
	import { getPostUrl } from '$lib/utils/post-url-utils';
	import { getSeriesPosts } from '$lib/retrievers/posts';
	import { browser } from '$app/environment';

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
	<title>{series ? series.name : 'Post'}</title>
</svelte:head>

{#if series === undefined}
	<Spinner />
{:else if !series}
	404
{:else}
	<PageTitle>{series.name}</PageTitle>

	<Excerpt>{series.description}</Excerpt>

	<ContentContainer>
		{#if posts}
			<div class="grid grid-cols-12 mt-20">
				<ul class="flex flex-col lg:col-start-4 lg:col-span-9 col-span-12 divide-y-2 divide-black">
					{#each posts as post}
						<li class="py-10">
							<a href={getPostUrl(post)}>
								<h3 class="h5 pb-3">{post.title}</h3>
								<p>{post.excerpt}</p>
							</a>
						</li>
					{/each}
				</ul>
			</div>
		{:else}
			<Spinner />
		{/if}
	</ContentContainer>
{/if}
