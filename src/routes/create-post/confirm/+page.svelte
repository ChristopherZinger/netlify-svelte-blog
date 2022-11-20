<script lang="ts">
	import { goto } from '$app/navigation';
	import { ContentType, type Tag_FsDoc } from '$lib/schemas';
	import { createPostInput, createSeriesInput } from '$lib/stores/createPostInputStore';
	import ContentContainer from '../../../components/ContentContainer.svelte';
	import ConfirmSeries from './ConfirmSeries.svelte';
	import ConfirmTags from './ConfirmTags.svelte';
	import { getAllSeries } from '$lib/retrievers/series';
	import { slugifyURL } from '$lib/utils/slugify-utils';
	import { doc, getFirestore, runTransaction } from 'firebase/firestore';
	import {
		getIndependentPostCollectionRef,
		getIndependentPostContentCollectionRef,
		getSeriesCollectionReference,
		getSeriesPostCollectionRef,
		getSeriesPostContentCollectionRef,
		getTagCollectionReference
	} from '$lib/collections';
	import { marked } from 'marked';
	import { markedOptions } from '$lib/utils/marked-utils';
	import Spinner from '../../../components/Spinner.svelte';

	marked.setOptions(markedOptions);

	let isLoading = false;

	const createPost = async (data: {
		post: {
			title: string;
			excerpt: string;
		};
		tags: Tag_FsDoc[];
		series: null | { slug: string; name: string; description: string };
		markdown: string;
	}) => {
		const postId = slugifyURL(data.post.title);
		const postCollection = !!data.series
			? getSeriesPostCollectionRef(data.series.slug)
			: getIndependentPostCollectionRef();
		const postContentCollection = !!data.series
			? getSeriesPostContentCollectionRef(data.series.slug, postId)
			: getIndependentPostContentCollectionRef(postId);
		const existingSeries = await getAllSeries();
		const shouldCreateNewSeires =
			$createPostInput.seriesSlug && existingSeries.every((s) => s.slug !== data.series?.slug);
		const tagsToCreate = $createPostInput.tags.filter((t) => t.isNew);

		runTransaction(getFirestore(), async (transaction) => {
			transaction.set(doc(postCollection, postId), {
				title: data.post.title,
				excerpt: data.post.excerpt,
				slug: postId,
				seriesSlug: data.series?.slug || null,
				tags: data.tags.map((t) => t.slug),
				createdAt: new Date().getTime()
			});

			transaction.set(doc(postContentCollection, ContentType.html), {
				content: marked.parse(data.markdown),
				postId
			});

			transaction.set(doc(postContentCollection, ContentType.markdown), {
				content: data.markdown,
				postId
			});

			if (shouldCreateNewSeires) {
				if (!data.series) {
					throw new Error('new_series_required_but_data_not_provided');
				}
				transaction.set(doc(getSeriesCollectionReference(), data.series.slug), {
					createdAt: new Date().getTime(),
					...data.series
				});
			}

			for (const { name, slug } of tagsToCreate) {
				transaction.set(doc(getTagCollectionReference(), slug), {
					name,
					slug
				});
			}
		});
	};
</script>

<div class="gird grid-cols-1 divide-y-2 gap-y-20">
	<ContentContainer>
		<div class="my-10">
			<div class="flex justify-between">
				<h1 class="h4">Post Info</h1>
				<div>
					<button
						on:click={() => goto('/create-post')}
						class="p-3 text-green-500 font-bold border-2 border-green-500">Edit</button
					>
				</div>
			</div>
			<h2 class="h5 my-6">{$createPostInput.post.title}</h2>
			<p>{$createPostInput.post.excerpt}</p>
		</div>
	</ContentContainer>

	<ConfirmTags />

	<ConfirmSeries />

	<ContentContainer>
		{#if !isLoading}
			<div class="flex flex-row-reverse my-10">
				<button
					on:click={() => {
						isLoading = true;
						try {
							createPost({
								post: $createPostInput.post,
								tags: $createPostInput.tags,
								markdown: $createPostInput.markdown,
								series: $createPostInput.seriesSlug ? $createSeriesInput : null
							});
						} catch (err) {
							console.log(err);
						}
						isLoading = false;
						goto('/');
					}}
					class="p-3 border border-black">Save</button
				>
			</div>
		{:else}
			<Spinner />
		{/if}
	</ContentContainer>
</div>
