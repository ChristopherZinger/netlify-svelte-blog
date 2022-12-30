<script lang="ts">
	import PageContentContainer from '$lib/components/containers/PageContentContainer.svelte';
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
	<PageContentContainer>
		<div class="post-content">
			<div>
				{@html data.about.html}
			</div>
		</div>
	</PageContentContainer>
</TopLevelMarginContainer>
