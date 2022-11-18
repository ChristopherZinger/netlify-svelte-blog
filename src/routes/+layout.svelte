<script lang="ts">
	import '$lib/firebase';
	import 'highlight.js/styles/a11y-light.css';
	import '../app.css';
	import { getAuth, onAuthStateChanged } from 'firebase/auth';
	import { appUser } from '$lib/stores/appUser';
	import TopNav from '../components/TopNav/TopNav.svelte';
	import Footer from '../components/Footer.svelte';
	import MobileNav from '../components/TopNav/MobileNav.svelte';
	import { browser } from '$app/environment';

	const auth = getAuth();

	if (browser) {
		onAuthStateChanged(auth, async (_user) => {
			appUser.set(_user);
		});
	}
</script>

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
