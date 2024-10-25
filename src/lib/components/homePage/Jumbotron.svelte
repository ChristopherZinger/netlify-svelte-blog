<script lang="ts">
	import TopLevelMarginContainer from '$lib/components/containers/TopLevelMarginContainer.svelte';

	const title = 'Byte Increments - Code Notes.';
</script>

<div class="my-20 lg:flex space-aroune hidden">
	<h1 class="carousel page-title">{title}</h1>
	<h1 class="carousel page-title">{title}</h1>
</div>
<div class="lg:hidden my-20">
	<TopLevelMarginContainer>
		<h1>{title}</h1>
	</TopLevelMarginContainer>
</div>

<style>
	.carousel {
		white-space: nowrap;
		animation: scroll_1 55s linear infinite;
		padding: 0 30px;
	}
	@keyframes scroll_1 {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-100%);
		}
	}
</style>
