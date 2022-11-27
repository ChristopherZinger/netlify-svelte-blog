<script lang="ts">
	import { isMobileNavOpen } from '$lib/stores/mobileNav';
</script>

<button
	on:click={() => {
		isMobileNavOpen.set(!$isMobileNavOpen);
	}}
	class="flex flex-col w-8 h-6 justify-between"
>
	<div class="w-full border-t-2 border-t-black" />
	<div class="w-full border-t-2 border-t-black" />
	<div class="w-full border-t-2 border-t-black" />
</button>
