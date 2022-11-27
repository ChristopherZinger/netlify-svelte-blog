<script lang="ts">
	type ListItem = {
		title: string;
		description: string;
		href: string;
	};

	export let items: ListItem[];
</script>

<div class="grid grid-cols-12 mt-20">
	<ul class="flex flex-col lg:col-start-4 lg:col-span-9 col-span-12 divide-y-2 divide-black">
		{#each items as item}
			<li class="py-10">
				<a href={item.href}>
					<h3 class="h5 pb-3">{item.title}</h3>
					<p>{item.description}</p>
				</a>
			</li>
		{/each}
	</ul>
</div>
