<script lang="ts">
	export let href: string;
	export let isSelected: boolean = false;
</script>

<li class:font-bold={isSelected} class="flex items-center"><a {href}><slot /></a></li>
