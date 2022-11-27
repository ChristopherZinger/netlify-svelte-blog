<script lang="ts">
	import { browser } from '$app/environment';
	import Spinner from '$lib/components/Spinner.svelte';
	import { getSeriesPosts } from '$lib/retrievers/posts';
	import type { Post_FsDoc } from '$lib/schemas';
	import { getRandNrInRange } from '$lib/utils/math-utils';
	import { getPostUrl } from '$lib/utils/post-url-utils';
	import Glide from '@glidejs/glide';

	export let seriesSlug: string;

	let posts: Post_FsDoc[] | undefined;
	let glideEl: HTMLElement | undefined;

	if (browser) {
		getSeriesPosts(seriesSlug).then((_p) => {
			posts = _p;
		});
	}

	$: if (browser && glideEl && posts?.length) {
		const glide = new Glide('.glide-' + seriesSlug, {
			type: 'slider',
			autoplay: getRandNrInRange(6, 9) * 1000,
			gap: 16,
			animationDuration: getRandNrInRange(2, 4) * 1000,
			animationTimingFunc: 'ease',
			perView: 3,
			breakpoints: {
				1024: {
					perView: 2
				},
				700: {
					perView: 1
				}
			}
		}).mount();

		setTimeout(() => {
			glide.pause();
			setTimeout(() => {
				glide.play();
			}, getRandNrInRange(1, 7) + 1000);
		}, getRandNrInRange(1, 7) + 1000);
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
