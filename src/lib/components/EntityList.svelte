<script lang="ts">
	import PageContentContainer from './containers/PageContentContainer.svelte';

	type ListItem = {
		title: string;
		description: string;
		href: string;
	};

	export let items: ListItem[];
</script>

<PageContentContainer>
	<ul class="flex flex-col divide-y-2 divide-black">
		{#each items as item}
			<li class="py-10">
				<a href={item.href}>
					<h3 class="h5 pb-3">{item.title}</h3>
					<p>{item.description}</p>
				</a>
			</li>
		{/each}
	</ul>
</PageContentContainer>
