<script lang="ts">
	export let items: { title: string; excerptHtml: string; href: string; createdAt: string }[];
</script>

<div class="mb-12 pb-12 border-b-black">
	<div class="grid grid-cols-1 lg:grid-cols-4 gap-x-5 gap-y-8">
		{#each items as item, i}
			<div class="lg:col-span-2 lg:col-start-2">
				<a href={item.href}>
					<h2 class="h6 mb-2">
						{@html item.title}
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
</div>
