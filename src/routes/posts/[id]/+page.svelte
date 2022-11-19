<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import {
		getIndependentPostDocForId,
		getIndependentPostHtmlContentDocForId
	} from '$lib/retrievers/posts';
	import type { Post_FsDoc, PostContent_FsDoc } from '$lib/schemas';
	import PostPageContent from '../../../components/pages/PostPageContent.svelte';

	const { id } = $page.params;

	let post: undefined | null | Post_FsDoc = undefined;
	let content: undefined | null | PostContent_FsDoc = undefined;

	if (browser) {
		Promise.all([getIndependentPostDocForId(id), getIndependentPostHtmlContentDocForId(id)]).then(
			([_post, _content]) => {
				post = _post || null;
				content = _content || null;
			}
		);
	}
</script>

<svelte:head>
	<title>{post ? post.title : 'Post'}</title>
</svelte:head>

<PostPageContent {content} {post}>
	<div class="post-content grid lg:grid-cols-12">
		<div class="lg:col-start-3 lg:col-span-7">
			{@html content?.content}
		</div>
	</div>
</PostPageContent>
