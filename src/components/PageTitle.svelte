<script>
	import ContentContainer from './ContentContainer.svelte';
</script>

<ContentContainer>
	<div class="my-24">
		<div class="my-10">
			<h1 class="page-title"><slot /></h1>
		</div>
	</div>
</ContentContainer>
