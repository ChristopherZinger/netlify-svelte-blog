<script lang="ts">
	import ContentContainer from '../../components/ContentContainer.svelte';
	import { createPostInput, editModeStore } from '$lib/stores/createPostInputStore';
	import Nav from './Nav.svelte';
	import PagePreview from './PagePreview.svelte';
</script>

<Nav />

{#if $editModeStore === 'edit'}
	<ContentContainer>
		<div class="grid lg:grid-cols-12 ">
			<div class="flex flex-col gap-y-5 lg:col-start-2 lg:col-span-11">
				<div class="grid grid-cols-2 gap-x-5 items-start">
					<input
						type="text"
						placeholder="Post Title"
						class="border p-3 w-full rounded border-black"
						value={$createPostInput.post.title}
						on:input={({ currentTarget }) => {
							createPostInput.setTitle(currentTarget.value);
						}}
					/>
					<textarea
						class="excerpt w-full border border-black p-3 rounded gb-slate-100"
						placeholder="excerpt"
						value={$createPostInput.post.excerpt}
						on:input={({ currentTarget }) => {
							createPostInput.setExcerpt(currentTarget.value);
						}}
					/>
				</div>
				<textarea
					class="content w-full border border-black p-3 rounded gb-slate-100"
					placeholder="Content"
					value={$createPostInput.markdown}
					on:input={({ currentTarget }) => {
						createPostInput.setMarkdown(currentTarget.value);
					}}
				/>
			</div>
		</div>

		<div class="flex flex-row-reverse mt-10">
			<a href="/create-post/confirm" class="border border-black p-5">Next</a>
		</div>
	</ContentContainer>
{:else}
	<PagePreview text={$createPostInput.markdown} />
{/if}

<style>
	.content {
		height: 500px;
	}

	.excerpt {
		height: 120px;
	}
</style>
