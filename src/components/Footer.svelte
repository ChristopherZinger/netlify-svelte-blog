<script>
	import ContentContainer from './ContentContainer.svelte';
	import TopNavItem from './TopNav/TopNavItem.svelte';
</script>

<ContentContainer>
	<footer class="grid lg:grid-cols-4 h-20 gap-y-8">
		<div class="flex justify-between lg:col-start-2 lg:col-span-3 border-t border-t-2 border-black">
			<ul class="flex">
				<TopNavItem href="/">Home</TopNavItem>
			</ul>
			<div>
				<!-- social media icons -->
			</div>
		</div>
	</footer>
</ContentContainer>
