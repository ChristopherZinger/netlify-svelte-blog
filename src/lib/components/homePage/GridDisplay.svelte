<script lang="ts">
	import Spinner from '$lib/components/Spinner.svelte';

	export let items:
		| undefined
		| { title: string; excerptHtml: string; href: string; createdAt: string }[] = undefined;
	export let title: string;
	export let href: string;
</script>

<div class="mb-12 pb-12 border-b-2 border-b-black">
	<div class="flex justify-between mb-5">
		<p class="uppercase">{title}:</p>
		<p class="uppercase font-bold"><a {href}>View All</a></p>
	</div>
	<p>
		{#if items}
			{#if items.length}
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-8">
					{#each items as item}
						<div>
							<a href={item.href}>
								<h2 class="h6 mb-2">
									{item.title}
								</h2>
								<i class="post-date">
									{new Date(item.createdAt).toLocaleDateString(undefined, {
										year: 'numeric',
										month: 'short',
										day: '2-digit'
									})}
								</i>
								<p>
									{@html item.excerptHtml}
								</p>
							</a>
						</div>
					{/each}
				</div>
			{:else}
				No posts here yet.
			{/if}
		{:else}
			<Spinner />
		{/if}
	</p>
</div>
