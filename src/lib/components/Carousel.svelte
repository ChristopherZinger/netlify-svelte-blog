<script lang="ts">
	export let text: string;
</script>

<div class="flex ">
	<h1 class="carousel page-title">{text}</h1>
	<h1 class="carousel page-title">{text}</h1>
</div>

<style>
	.carousel {
		white-space: nowrap;
		animation: scroll_1 55s linear infinite;
		padding: 0 30px;
	}
	@keyframes scroll_1 {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-100%);
		}
	}
</style>
