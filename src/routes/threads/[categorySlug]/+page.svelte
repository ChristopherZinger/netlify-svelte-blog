<script lang="ts">
	import ExcerptContainer from '$lib/components/containers/ExcerptContainer.svelte';
	import TopLevelMarginContainer from '$lib/components/containers/TopLevelMarginContainer.svelte';
	import PageTitle from '$lib/components/PageTitle.svelte';
	import VisibilityLoader from '$lib/components/VisibilityLoader.svelte';
	import { type Category_WP, type Post_WP } from '$lib/schemas';
	import { getWordpressPosts } from '$lib/wordpress/wordpressApiUtils';

	export let data: {
		posts: Post_WP[];
		category: Category_WP;
	};

	let shownPosts = data.posts;
	let page = 1;
	let hasLoadedAll = false;
	async function onLoadMore() {
		const newPosts = await getWordpressPosts({
			limit: 15,
			page: ++page,
			category: data.category.id
		});
		shownPosts = [...shownPosts, ...newPosts];
		if (newPosts.length === 0) {
			hasLoadedAll = true;
		}
	}
</script>

<PageTitle>Thread: {data.category.name}</PageTitle>

<ExcerptContainer>{@html data.category.description}</ExcerptContainer>

<TopLevelMarginContainer>
	<div class="post-content lg:grid lg:grid-cols-12">
		<div
			class="lg:col-start-3 lg:col-span-7 2xl:col-start-4 2xl:col-span-5"
		>
			{#each shownPosts as post}
				<div style="width: 30px" class="border border-black" />
				<div class="italic">
					Updated on {new Date(post.date).toLocaleDateString('en', {
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					})}
				</div>
				{@html post.content.rendered}
			{/each}
			<VisibilityLoader {hasLoadedAll} {onLoadMore} />
		</div>
	</div>
</TopLevelMarginContainer>
