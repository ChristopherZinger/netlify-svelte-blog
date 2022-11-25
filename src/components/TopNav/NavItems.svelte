<script context="module" lang="ts">
	type NavItem = {
		label: string;
		href: string;
	};

	export const NAV_ITEMS: NavItem[] = [
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
		}
		// {
		// 	label: 'About',
		// 	href: '/about'
		// },
	];

	export const AUTH_NAV_ITEMS: NavItem[] = [
		{
			label: 'Admin',
			href: '/admin'
		},
		{
			label: 'Create',
			href: '/create-post'
		},
		{
			label: 'Auth',
			href: '/signup'
		}
	];
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import { appUser } from '$lib/stores/appUser';
	import TopNavItem from './TopNavItem.svelte';

	$: allowedNavItems = NAV_ITEMS.concat($appUser ? AUTH_NAV_ITEMS : []);

	$: location = $page.url.pathname.split('/')[1];
</script>

<ul class="flex h-20 gap-x-7">
	{#each allowedNavItems as { label, href }}
		<TopNavItem isSelected={href === '/' + location} {href}>{label}</TopNavItem>
	{/each}
</ul>
