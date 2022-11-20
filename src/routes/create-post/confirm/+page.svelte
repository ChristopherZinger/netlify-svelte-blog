<script lang="ts">
	import ContentContainer from '../../../components/ContentContainer.svelte';
	import ConfirmSeries from './ConfirmSeries.svelte';
	import ConfirmTags from './ConfirmTags.svelte';
</script>

<ContentContainer>
	<div class="flex flex-col divide-y-2 gap-y-10">
		<ConfirmTags />
		<ConfirmSeries />

		<div class="flex flex-row-reverse my-10">
			<button class="p-3 border border-black">Save</button>
		</div>
	</div>
</ContentContainer>
