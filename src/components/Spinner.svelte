<div>
	<div class="spinner" />
</div>

<style>
	.spinner {
		width: 15px;
		height: 15px;
		background-color: black;
		border-radius: 3px;
		animation: spin;
		animation-duration: 2s;
		animation-timing-function: ease-in-out;
		animation-iteration-count: infinite;
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
