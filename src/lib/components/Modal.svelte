<script lang="ts">
	import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock';
	import { onMount } from 'svelte';

	export let isOpen: boolean;

	$: if (isOpen && body) {
		disableBodyScroll(body);
	} else {
		clearAllBodyScrollLocks();
	}

	let body: null | HTMLBodyElement = null;
	onMount(() => {
		body = document.querySelector('body');
	});
</script>

<div
	class="top-0 left-0 fixed h-full w-full p-20 bg-transparent backdrop-blur-sm"
	class:hidden={!isOpen}
>
	<div class="w-full h-full bg-white border-2 border-black drop-shadow-2xl">
		<slot />
	</div>
</div>
