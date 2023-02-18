<script lang="ts">
	import TopLevelMarginContainer from '$lib/components/containers/TopLevelMarginContainer.svelte';
	import PageTitle from '$lib/components/PageTitle.svelte';
	import type { About_FsDoc } from '$lib/schemas';

	export let data: {
		about: About_FsDoc;
	};
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<PageTitle>About</PageTitle>

<TopLevelMarginContainer>
	<div class="post-content lg:grid lg:grid-cols-12">
		<div class="lg:col-start-3 lg:col-span-7 2xl:col-start-4 2xl:col-span-5">
			{@html data.about.html}
		</div>
	</div>
</TopLevelMarginContainer>
