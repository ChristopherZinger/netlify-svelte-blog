<script>
	import ContentContainer from './ContentContainer.svelte';
	import NavItems from './TopNav/NavItems.svelte';
</script>

<ContentContainer>
	<footer class="grid lg:grid-cols-4 h-20 gap-y-8 ">
		<div class="justify-between lg:col-start-2 lg:col-span-3 flex border-t-2 border-t-black">
			<div class="hidden lg:block">
				<NavItems />
			</div>
			<div>
				<!-- social media icons -->
			</div>
		</div>
	</footer>
</ContentContainer>
