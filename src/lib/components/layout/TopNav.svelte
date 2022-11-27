<script lang="ts">
	import TopLevelMarginContainer from '$lib/components/containers/TopLevelMarginContainer.svelte';
	import MobileNavToggleBtn from './MobileNavToggleBtn.svelte';
	import NavItems from './NavItems.svelte';
</script>

<TopLevelMarginContainer>
	<nav class="grid grid-cols-12">
		<ul
			class="col-span-12 lg:col-span-8 lg:col-start-2 border-b-2 border-b-black h-20 flex flex-row-reverse lg:flex-row"
		>
			<li class="hidden lg:block">
				<NavItems />
			</li>
			<li class="h-full flex items-center lg:hidden">
				<MobileNavToggleBtn />
			</li>
		</ul>
	</nav>
</TopLevelMarginContainer>
