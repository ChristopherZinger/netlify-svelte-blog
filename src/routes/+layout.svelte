<script lang="ts">
	import '$lib/firebase';
	import { getAuth, onAuthStateChanged } from 'firebase/auth';
	import { appUser } from '$lib/stores/appUser';
	import '../app.css';
	import TopNav from '../components/TopNav/TopNav.svelte';
	import Footer from '../components/Footer.svelte';
	import MobileNav from '../components/TopNav/MobileNav.svelte';

	const auth = getAuth();

	onAuthStateChanged(auth, async (_user) => {
		appUser.set(_user);
	});
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
