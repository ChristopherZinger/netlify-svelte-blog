<script lang="ts">
	import { isMobileNavOpen } from '$lib/stores/mobileNav';
	import { NAV_ITEMS } from '$lib/components/layout/NavItems.svelte';
	import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	$: $isMobileNavOpen && body && disableBodyScroll(body);
	$: !$isMobileNavOpen && clearAllBodyScrollLocks();

	let body: null | HTMLBodyElement = null;
	onMount(() => {
		body = document.querySelector('body');
	});
</script>

<nav
	class="absolute w-full  bg-white flex items-center justify-center lg:hidden"
	class:hidden={!$isMobileNavOpen}
>
	<ul class="flex flex-col gap-y-7">
		{#each NAV_ITEMS as { label, href }}
			<button
				on:click={() => {
					goto(href);
					isMobileNavOpen.set(false);
				}}><span class="text-3xl font-medium">{label}</span></button
			>
		{/each}
	</ul>
</nav>

<style>
	nav {
		height: calc(100% - 80px);
		top: 80px;
	}
</style>
