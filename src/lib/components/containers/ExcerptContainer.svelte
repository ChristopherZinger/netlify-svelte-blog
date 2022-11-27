<script lang="ts">
	import TopLevelMarginContainer from '$lib/components/containers/TopLevelMarginContainer.svelte';
</script>

<TopLevelMarginContainer>
	<div class="lg:grid lg:grid-cols-12 my-8">
		<div class="lg:col-start-2 lg:col-span-5">
			<p class="font-semibold"><slot /></p>
		</div>
	</div>
</TopLevelMarginContainer>
