<script lang="ts">
	import TopLevelMarginContainer from '$lib/components/containers/TopLevelMarginContainer.svelte';
	import TagList from '$lib/components/TagList.svelte';
	import GridDisplay from '$lib/components/homePage/GridDisplay.svelte';
	import Jumbotron from '$lib/components/homePage/Jumbotron.svelte';
	import type { Post_WP, Tag_WP } from '$lib/schemas';

	export let latestPosts: Post_WP[];
	export let tags: Tag_WP[];

	let selectedTagId: number | null = null;
	let shownPosts = latestPosts;
	function onSelectedTagIdChange (tagId: number | null) {
		shownPosts = tagId === null
		? latestPosts
		: latestPosts.filter(p => p.tags.includes(tagId));
	}
	$: onSelectedTagIdChange(selectedTagId)

	function onSelectTag (tagId: number | null) {
		selectedTagId = tagId;
	}
</script>

<Jumbotron />
<TopLevelMarginContainer>
	<TagList {tags} onSelectTag={onSelectTag} selectedTagId={selectedTagId} />
</TopLevelMarginContainer>

<TopLevelMarginContainer>
	<div class="mt-14">
		<GridDisplay
			items={shownPosts.map((p) => ({
				createdAt: p.date,
				excerptHtml: p.excerpt.rendered,
				href: `/posts/${p.slug}`,
				title: p.title.rendered
			}))}
		/>
	</div>
</TopLevelMarginContainer>
