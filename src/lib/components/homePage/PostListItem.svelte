<script lang="ts">
	import { LOGBOOK_CATEGORY_ID, type Post_WP } from '$lib/schemas';

	export let post: Post_WP;

	const isLogBook = post.categories.includes(LOGBOOK_CATEGORY_ID);
</script>

<div>
	<a href={`/posts/${post.slug}`}>
		{#if !isLogBook}
			<h2 class="h6 mb-2">
				{@html post.title.rendered}
			</h2>
		{/if}
		<i class="post-date" class:font-bold={isLogBook}>
			{new Date(post.date).toLocaleDateString(undefined, {
				year: 'numeric',
				month: 'short',
				day: '2-digit'
			})}
		</i>
		<p>
			{@html post.excerpt.rendered}
		</p>
	</a>
</div>
