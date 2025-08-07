<script lang="ts">
	import TopLevelMarginContainer from '$lib/components/containers/TopLevelMarginContainer.svelte';
	import ExcerptContainer from '$lib/components/containers/ExcerptContainer.svelte';
	import PageTitle from '$lib/components/PageTitle.svelte';
	import type { Category_WP } from '$lib/schemas';

	export let threads: Category_WP[];
	export let post: {
		title: string;
		excerptHtml: string;
		isLogBook: boolean;
		date: string;
	};
</script>

{#if post.isLogBook}
	<PageTitle>
		log: {new Date(post.date).toLocaleDateString('en', {
			year: 'numeric',
			month: 'numeric',
			day: '2-digit'
		})}
	</PageTitle>

	{#if threads.length > 0}
		<TopLevelMarginContainer>
			<div class="post-content lg:grid lg:grid-cols-12">
				<div
					class="lg:col-start-3 lg:col-span-7 2xl:col-start-4 2xl:col-span-5"
				>
					<div class="flex gap-2">
						<div class="font-semibold">Explore this thread:</div>
						{#each threads as thread}
							<a href={`/threads/${thread.slug}`} class="underline"
								>{thread.name},</a
							>
						{/each}
					</div>
				</div>
			</div>
		</TopLevelMarginContainer>
	{/if}
{:else}
	<PageTitle>{@html post.title}</PageTitle>
	<ExcerptContainer>{@html post.excerptHtml}</ExcerptContainer>
{/if}

<TopLevelMarginContainer>
	<slot />
</TopLevelMarginContainer>
