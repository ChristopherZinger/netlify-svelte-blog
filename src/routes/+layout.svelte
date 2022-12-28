<script lang="ts">
	import 'highlight.js/styles/a11y-light.css';
	import '../app.css';
	import { getAuth, onAuthStateChanged } from 'firebase/auth';
	import { appUser } from '$lib/stores/appUser';
	import TopNav from '$lib/components/layout/TopNav.svelte';
	import MobileNav from '$lib/components/layout/MobileNav.svelte';
	import { browser } from '$app/environment';
	import Footer from '$lib/components/layout/Footer.svelte';
	import ScreenSizeHandler from '$lib/components/ScreenSizeHandler.svelte';
	import { getFirebaseConf, type TIER } from '$lib/firebase';
	import { initializeApp } from 'firebase/app';

	export let data: { tier: TIER };

	initializeApp(getFirebaseConf(data.tier));

	const auth = getAuth();

	if (browser) {
		onAuthStateChanged(auth, async (_user) => {
			appUser.set(_user);
		});
	}
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
