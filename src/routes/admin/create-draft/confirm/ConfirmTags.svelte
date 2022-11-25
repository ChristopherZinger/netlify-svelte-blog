<script lang="ts">
	import { createPostInput } from '$lib/stores/createPostInputStore';

	$: selectedExistingTags = $createPostInput.tags;
</script>

<div class="py-10">
	{#if selectedExistingTags.length}
		<h3 class="h6">Existing Tags:</h3>
		<ul class="flex gap-x-5 my-5">
			{#each selectedExistingTags as { name }}
				<li>
					#{name}
				</li>
			{/each}
		</ul>
	{/if}
	<br />
</div>
