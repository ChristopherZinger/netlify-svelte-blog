<script lang="ts">
	import PageContentContainer from './containers/PageContentContainer.svelte';

	type ListItem = {
		title: string;
		description: string;
		href: string;
		createdAt: number;
	};

	export let items: ListItem[];
</script>

<PageContentContainer>
	<ul class="flex flex-col divide-y-2 divide-black">
		{#each items as item}
			<li class="py-10">
				<a href={item.href}>
					<h3 class="h5 pb-3">{item.title}</h3>
					<i class="post-date"
						>{new Date(item.createdAt).toLocaleDateString('en', {
							year: 'numeric',
							day: '2-digit',
							month: 'short'
						})}</i
					>
					<p>{item.description}</p>
				</a>
			</li>
		{/each}
	</ul>
</PageContentContainer>
