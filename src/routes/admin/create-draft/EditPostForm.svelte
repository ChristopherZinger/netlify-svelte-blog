<script lang="ts">
	import { createPostInput } from '$lib/stores/createPostInputStore';
</script>

<div class="flex flex-col gap-y-5">
	<div>
		<label for="title">title</label>
		<input
			type="text"
			placeholder="Post Title"
			class="border p-3 w-full rounded border-black"
			value={$createPostInput.post.title}
			on:input={({ currentTarget }) => {
				createPostInput.setTitle(currentTarget.value);
			}}
		/>
	</div>

	<div>
		<label for="excerpt">excerpt</label>
		<textarea
			class="excerpt w-full border border-black p-3 rounded gb-slate-100"
			placeholder="excerpt"
			value={$createPostInput.post.excerpt}
			on:input={({ currentTarget }) => {
				createPostInput.setExcerpt(currentTarget.value);
			}}
		/>
	</div>

	<div>
		<label for="markdown-content">Markdown Content</label>
		<textarea
			class="content w-full border border-black p-3 rounded gb-slate-100"
			placeholder="Content"
			value={$createPostInput.markdown}
			on:input={({ currentTarget }) => {
				createPostInput.setMarkdown(currentTarget.value);
			}}
		/>
	</div>

	<div class="flex flex-row-reverse mt-10">
		<a href="/admin/create-draft/confirm" class="border border-black p-5">Next</a>
	</div>
</div>
