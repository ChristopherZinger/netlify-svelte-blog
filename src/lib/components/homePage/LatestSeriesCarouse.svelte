<script lang="ts">
	import { browser } from '$app/environment';
	import Spinner from '$lib/components/Spinner.svelte';
	import { getSeriesPosts } from '$lib/retrievers/posts';
	import type { Post_FsDoc } from '$lib/schemas';
	import { screenSize } from '$lib/stores/screenSizeStore';
	import { getPostUrl } from '$lib/utils/post-url-utils';
	import { BREAKPOINTS, SCREEN_SIZES } from '$lib/utils/screen-size-utils';
	import Glide from '@glidejs/glide';

	export let seriesSlug: string;

	let posts: Post_FsDoc[] | undefined;
	let glideEl: HTMLElement | undefined;

	if (browser) {
		getSeriesPosts(seriesSlug).then((_p) => {
			posts = _p;
		});
	}

	let glide: undefined | Glide.Properties;
	$: if (browser && glideEl && posts?.length) {
		glide = new Glide('.glide-' + seriesSlug, {
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
	$: if (glide && posts && previousScreenSize !== $screenSize) {
		if ($screenSize !== previousScreenSize) {
			previousScreenSize = $screenSize;

			if (hasEnoughPostsForAnimation(posts.length, $screenSize)) {
				glide.play();
			} else {
				glide.pause();
				glide.go('<<');
			}
		}
	}
</script>

{#if posts}
	<div bind:this={glideEl} class={`glide-${seriesSlug}`}>
		<div class="glide__track" data-glide-el="track">
			<ul class="glide__slides">
				{#each posts as post}
					<li class="glide__slide">
						<a href={getPostUrl(post)}>
							<h4 class="h6">{post.title}</h4>
							<p class="">{post.excerpt}</p>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>
{:else}
	<li class="glide__slide">
		<Spinner />
	</li>
{/if}
