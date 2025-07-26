<script lang="ts">
	export let text: string;
</script>

<div class="flex w-full" style="position: relative; height: 100px">
	<div class="flex" style="width: 200%; position: absolute;">
		{#each Array(10).fill(text) as _text}
			<h1 class="carousel page-title w-full">{_text}</h1>
		{/each}
	</div>
</div>

<style>
	.carousel {
		white-space: nowrap;
		animation: scroll_1 30s linear infinite;
		padding: 0 30px;
	}
	@keyframes scroll_1 {
		0% {
			transform: translateX(100);
		}
		100% {
			transform: translateX(-100%);
		}
	}
</style>
