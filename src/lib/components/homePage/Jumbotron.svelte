<script lang="ts">
	import TopLevelMarginContainer from '$lib/components/containers/TopLevelMarginContainer.svelte';
	import Carousel from '../Carousel.svelte';

	const title = 'Byte Increments - Code Notes.';
</script>

<div class="hidden lg:block my-20">
	<Carousel text={title} />
</div>
<div class="lg:hidden my-20">
	<TopLevelMarginContainer>
		<h1>{title}</h1>
	</TopLevelMarginContainer>
</div>
