<script lang="ts">
	import '../app.scss';
	import '@glidejs/glide/dist/css/glide.core.css';
	import TopNav from '$lib/components/layout/TopNav.svelte';
	import MobileNav from '$lib/components/layout/MobileNav.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import ScreenSizeHandler from '$lib/components/ScreenSizeHandler.svelte';
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
