<script lang="ts">
	import 'highlight.js/styles/a11y-light.css';
	import '../app.scss';
	import '@glidejs/glide/dist/css/glide.core.css';
	import TopNav from '$lib/components/layout/TopNav.svelte';
	import MobileNav from '$lib/components/layout/MobileNav.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import ScreenSizeHandler from '$lib/components/ScreenSizeHandler.svelte';
	import { getFirebaseConf, type TIER } from '$lib/firebase';
	import { initializeApp } from 'firebase/app';

	export let data: { tier: TIER };

	initializeApp(getFirebaseConf(data.tier));
</script>

<ScreenSizeHandler />

<MobileNav />

<div class="app flex flex-col justify-between">
	<div>
		<TopNav />
		<slot />
	</div>

	<Footer />
</div>

<style>
	.app {
		min-height: 100vh;
	}
</style>
