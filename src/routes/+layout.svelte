<script lang="ts">
	import '$lib/firebase';
	import { getAuth, onAuthStateChanged } from 'firebase/auth';
	import { appUser } from '$lib/stores/appUser';
	import '../app.css';
	import TopNav from '../components/TopNav/TopNav.svelte';

	const auth = getAuth();

	onAuthStateChanged(auth, async (_user) => {
		appUser.set(_user);
	});
</script>

<TopNav />
<slot />
