<script lang="ts">
	import TopLevelMarginContainer from '$lib/components/containers/TopLevelMarginContainer.svelte';
	import PageTitle from '$lib/components/PageTitle.svelte';
	import type { Page_WP } from '$lib/schemas';

	export let data: {
		about: Page_WP;
	};
</script>

<svelte:head>
	<title>{data.about.title.rendered}</title>
</svelte:head>

<PageTitle>{@html data.about.title.rendered}</PageTitle>

<TopLevelMarginContainer>
	<div class="post-content lg:grid lg:grid-cols-12">
		<div class="lg:col-start-3 lg:col-span-7 2xl:col-start-4 2xl:col-span-5">
			{@html data.about.content.rendered}
		</div>
	</div>
</TopLevelMarginContainer>
