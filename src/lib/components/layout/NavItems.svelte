<script context="module" lang="ts">
	type NavItem = {
		label: string;
		href: string;
	};

	export const NAV_ITEMS: NavItem[] = [
		{
			label: 'Blog',
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
			label: 'About',
			href: '/about'
		}
	];
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import TopNavItem from './TopNavItem.svelte';

	$: location = $page.url.pathname.split('/')[1];
</script>

<ul class="flex h-20 gap-x-7">
	{#each NAV_ITEMS as { label, href }}
		<TopNavItem isSelected={href === '/' + location} {href}>{label}</TopNavItem>
	{/each}
</ul>
