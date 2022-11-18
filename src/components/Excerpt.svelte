<script lang="ts">
	import ContentContainer from './ContentContainer.svelte';
</script>

<ContentContainer>
	<div class="grid lg:grid-cols-12 my-8">
		<div class="lg:col-start-2 lg:col-span-5">
			<p class="font-semibold"><slot /></p>
		</div>
	</div>
</ContentContainer>
