<script lang="ts">
	import CloseIcon from '$lib/components/icons/CloseIcon.svelte';

	export let onClick: () => void;
	export let isSelected: boolean;
	export let tag: {
		name: string;
		id: number;
	};
</script>

<button
	on:click={onClick}
	class:isSelected
	class="px-3 py-1 flex items-center gap-x-3"
>
	<span class="underline">{tag.name}</span>
	{#if isSelected}
		<CloseIcon color="white" strokeWidth={2} />
	{/if}
</button>

<style>
	.isSelected {
		@apply bg-black rounded-full text-white;
	}
</style>
