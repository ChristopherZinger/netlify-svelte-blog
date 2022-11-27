<script lang="ts">
	import Spinner from '$lib/components/Spinner.svelte';

	export let onSubmit: (data: { name: string; description: string }) => Promise<void>;
	export let initialValues: {
		name: string;
		description: string;
	} = { name: '', description: '' };

	let name = initialValues.name;
	let description = initialValues.description;

	let isLoading = false;
</script>

<form
	class="flex flex-col gap-y-5 my-10"
	on:submit|preventDefault={async () => {
		isLoading = true;
		await onSubmit({
			name,
			description
		});
		isLoading = false;
	}}
>
	<div>
		<label for="title" class="block">Title:</label>
		<input
			type="text"
			id="title"
			name="title"
			bind:value={name}
			placeholder="title"
			class="p-4 mt-2 border round w-full"
		/>
	</div>

	<div>
		<label for="description" class="block">Description:</label>
		<textarea
			type="description"
			id="description"
			name="description"
			bind:value={description}
			placeholder="description"
			class="p-4 mt-2 border rounded w-full h-40"
		/>
	</div>

	<div>
		<button type="submit" class="p-5 border border-black" disabled={isLoading}
			>{#if isLoading}<Spinner />{:else}save{/if}</button
		>
	</div>
</form>
