<script lang="ts">
	import ExcerptContainer from '$lib/components/containers/ExcerptContainer.svelte';
	import PageContentContainer from '$lib/components/containers/PageContentContainer.svelte';
	import TopLevelMarginContainer from '$lib/components/containers/TopLevelMarginContainer.svelte';
	import PageTitle from '$lib/components/PageTitle.svelte';
	import { type Category_WP, type Post_WP } from '$lib/schemas';

	export let data: {
		posts: Post_WP[];
		category: Category_WP;
	};
</script>

<PageTitle>Thread: {data.category.name}</PageTitle>

<ExcerptContainer>{@html data.category.description}</ExcerptContainer>

<TopLevelMarginContainer>
	<div class="post-content lg:grid lg:grid-cols-12">
		<div
			class="lg:col-start-3 lg:col-span-7 2xl:col-start-4 2xl:col-span-5"
		>
			{#each data.posts as post}
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
		</div>
	</div>
</TopLevelMarginContainer>
