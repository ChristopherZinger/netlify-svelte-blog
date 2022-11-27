<script>
	import ContentContainer from '../../../components/ContentContainer.svelte';
	import NavItems from '$lib/components/layout/NavItems.svelte';
</script>

<ContentContainer>
	<footer class="lg:grid lg:grid-cols-4 h-20 gap-y-8 mt-20">
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
