<script lang="ts">
	import TopLevelMarginContainer from '$lib/components/containers/TopLevelMarginContainer.svelte';
	import Glide from '@glidejs/glide';
	import { onMount } from 'svelte';

	onMount(() => {
		new Glide('.glide', {
			type: 'carousel',
			autoplay: 0.01,
			animationDuration: 50000,
			animationTimingFunc: 'linear'
		}).mount();
	});
</script>

<div class="hidden lg:block">
	<div class="glide my-20 hidden lg:block">
		<div class="glide__track" data-glide-el="track">
			<ul class="glide__slides">
				<li class="glide__slide">
					<h1 class="page-title whitespace-nowrap">Random Code Stuff Go!</h1>
				</li>
			</ul>
		</div>
	</div>
</div>

<div class="lg:hidden my-20">
	<TopLevelMarginContainer>
		<h1>Random Code Stuff Go!</h1>
	</TopLevelMarginContainer>
</div>
