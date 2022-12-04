<script lang="ts">
	import { screenWidth } from '$lib/stores/screenSizeStore';

	let windowInnerWidth: undefined | number;
	$: windowInnerWidth && screenWidth.set(windowInnerWidth);
</script>

<svelte:window bind:innerWidth={windowInnerWidth} />
