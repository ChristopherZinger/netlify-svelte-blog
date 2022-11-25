<script lang="ts">
	import { createPostInput, editModeStore } from '$lib/stores/createPostInputStore';
	import Nav from './Nav.svelte';
	import PagePreview from './PagePreview.svelte';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { getPostBySlug, getPostContentBySlug } from '$lib/retrievers/posts';
	import { getTagBySlug } from '$lib/retrievers/tags';
	import { compact } from 'lodash';
	import Spinner from '../../../components/Spinner.svelte';
	import EditPostForm from './EditPostForm.svelte';

	let postSlug = $page.url.searchParams.get('post-slug');
	let isLoadingPostData = !!postSlug;

	if (browser && postSlug) {
		Promise.all([getPostBySlug(postSlug), getPostContentBySlug(postSlug)]).then(
			async ([post, markdown]) => {
				if (post && markdown) {
					const tags = compact(
						await Promise.all(post.tags.map(async (t) => await getTagBySlug(t)))
					);
					createPostInput.setTitle(post.title);
					createPostInput.setExcerpt(post.excerpt);
					createPostInput.assignSeries(post.seriesSlug);
					createPostInput.removeAllTags();
					tags.forEach((t) => createPostInput.addTag({ ...t, isNew: false }));

					createPostInput.setMarkdown(markdown.content);
				}
				isLoadingPostData = false;
			}
		);
	}
</script>

{#if isLoadingPostData}
	<Spinner />
{:else}
	<Nav />
	{#if $editModeStore === 'edit'}
		<EditPostForm />
	{:else}
		<PagePreview text={$createPostInput.markdown} />
	{/if}
{/if}

<style>
	.content {
		height: 500px;
	}

	.excerpt {
		height: 120px;
	}
</style>
