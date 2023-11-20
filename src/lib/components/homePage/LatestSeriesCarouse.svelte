<script lang="ts">
	import { screenSize } from '$lib/stores/screenSizeStore';
	import { getPostUrl } from '$lib/utils/post-url-utils';
	import { BREAKPOINTS, SCREEN_SIZES } from '$lib/utils/screen-size-utils';
	import Glide from '@glidejs/glide';
	import type { SeriesWithPosts } from './HomePage.svelte';

	export let series: SeriesWithPosts;

	let glideEl: HTMLElement | undefined;

	let glide: undefined | Glide.Properties;
	$: if (glideEl && series.posts.length) {
		glide = new Glide('.glide-' + series.series.slug, {
			type: 'slider',
			autoplay: 8000,
			gap: 16,
			animationDuration: 2000,
			animationTimingFunc: 'ease',
			perView: 3,
			breakpoints: {
				[BREAKPOINTS[SCREEN_SIZES.lg]]: {
					perView: 2
				},
				[BREAKPOINTS[SCREEN_SIZES.md]]: {
					perView: 1
				}
			}
		}).mount();
	}

	const minNrOfPostPerScreenSizeForAnimation = {
		[SCREEN_SIZES.lg]: 3,
		[SCREEN_SIZES.md]: 2,
		[SCREEN_SIZES.sm]: 0
	};

	const hasEnoughPostsForAnimation = (nrOfPosts: number, screenSize: SCREEN_SIZES) => {
		return minNrOfPostPerScreenSizeForAnimation[screenSize] < nrOfPosts;
	};

	let previousScreenSize: undefined | SCREEN_SIZES;
	$: if (glide && series.posts && previousScreenSize !== $screenSize) {
		if ($screenSize !== previousScreenSize) {
			previousScreenSize = $screenSize;

			if (hasEnoughPostsForAnimation(series.posts.length, $screenSize)) {
				glide.play();
			} else {
				glide.pause();
				glide.go('<<');
			}
		}
	}
</script>

<div bind:this={glideEl} class={`glide-${series.series.slug}`}>
	<div class="glide__track" data-glide-el="track">
		<ul class="glide__slides">
			{#each series.posts as post}
				<li class="glide__slide">
					<a href={getPostUrl(post)}>
						<h4 class="h6">{post.title}</h4>
						<i class="post-date"
							>{new Date(post.createdAt).toLocaleDateString('en', {
								year: 'numeric',
								day: '2-digit',
								month: 'short'
							})}</i
						>
						<p class="">{post.excerpt}</p>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</div>
