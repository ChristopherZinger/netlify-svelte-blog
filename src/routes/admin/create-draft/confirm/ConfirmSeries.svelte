<script lang="ts">
	import { createPostInput } from '$lib/stores/createPostInputStore';
</script>

<div class="flex flex-col gap-y-10 py-10">
	{#if $createPostInput.seriesSlug}
		<h6>
			SEREIS:
			<span class="font-bold">{$createPostInput.seriesSlug}</span>
		</h6>
	{/if}
</div>
