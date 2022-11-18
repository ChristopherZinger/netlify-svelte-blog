<script lang="ts">
	export let color: string = 'black';
	export let height: number = 12;
	export let strokeWidth: number = 1;
</script>

<svg {height} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path d="M11 11L1 1" stroke={color} stroke-width={strokeWidth} />
	<path d="M1 11L11 1" stroke={color} stroke-width={strokeWidth} />
</svg>
