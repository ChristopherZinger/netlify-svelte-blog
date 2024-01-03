<script lang="ts">
	import PageContentContainer from './containers/PageContentContainer.svelte';

	export let items: {
		titleHtml: string;
		descriptionHtml: string;
		href: string;
		createdAt?: string;
	}[];
</script>

<PageContentContainer>
	<ul class="flex flex-col divide-y-2 divide-black">
		{#each items as item}
			<li class="py-10">
				<a href={item.href}>
					<h3 class="h5 pb-3">{@html item.titleHtml}</h3>
					{#if item.createdAt}
						<i class="post-date"
							>{new Date(item.createdAt).toLocaleDateString('en', {
								year: 'numeric',
								day: '2-digit',
								month: 'short'
							})}
						</i>
					{/if}
					<p>{@html item.descriptionHtml}</p>
				</a>
			</li>
		{/each}
	</ul>
</PageContentContainer>
