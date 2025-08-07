<script lang="ts">
	import { onMount } from 'svelte';

	export let hasLoadedAll: boolean;
	export let onLoadMore: () => void;

	let node: HTMLDivElement;
	let observer: IntersectionObserver | undefined;

	onMount(() => {
		observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting && !hasLoadedAll) {
					onLoadMore();
				}
			});
		});
	});

	$: node && observer?.observe(node);
</script>

<div bind:this={node} />
