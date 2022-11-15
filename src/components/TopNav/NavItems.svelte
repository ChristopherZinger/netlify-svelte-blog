<script context="module" lang="ts">
	export const NAV_ITEMS = [
		{
			label: 'Home',
			href: '/'
		},
		{
			label: 'Posts',
			href: '/posts'
		},
		{
			label: 'Series',
			href: '/series'
		},
		{
			label: 'Tags',
			href: '/tags'
		},
		{
			label: 'About',
			href: '/about'
		},
		{
			label: 'Create',
			href: '/create-post'
		}
	];
</script>

<script lang="ts">
	import TopNavItem from './TopNavItem.svelte';
</script>

<ul class="flex h-20 gap-x-7">
	{#each NAV_ITEMS as { label, href }}
		<TopNavItem {href}>{label}</TopNavItem>
	{/each}
</ul>
