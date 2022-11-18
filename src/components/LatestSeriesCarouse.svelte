<script lang="ts">
	import { browser } from '$app/environment';
	import { getSeriesPosts } from '$lib/retrievers/posts';
	import type { Post_FsDoc } from '$lib/schemas';
	import { getPostUrl } from '$lib/utils/post-url-utils';
	import Glide from '@glidejs/glide';
	import Spinner from './Spinner.svelte';

	export let seriesSlug: string;

	let posts: Post_FsDoc[] | undefined;
	let glideEl: HTMLElement | undefined;

	if (browser) {
		getSeriesPosts(seriesSlug).then((_p) => {
			posts = _p;
		});
	}

	$: if (browser && glideEl && posts) {
		new Glide('.glide-' + seriesSlug, {
			type: 'slider',
			autoplay: 2 * 1000,
			gap: 16,
			animationDuration: 1 * 1000,
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
