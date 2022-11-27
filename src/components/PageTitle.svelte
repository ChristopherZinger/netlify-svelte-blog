<script>
	import TopLevelMarginContainer from '$lib/components/containers/TopLevelMarginContainer.svelte';
</script>

<TopLevelMarginContainer>
	<div class="my-24">
		<div class="my-10">
			<h1 class="page-title"><slot /></h1>
		</div>
	</div>
</TopLevelMarginContainer>
