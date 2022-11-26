<script>
	import ContentContainer from '../../components/ContentContainer.svelte';
</script>

<ContentContainer>
	<div class="lg:grid lg:grid-cols-12">
		<nav class=" lg:col-start-2 lg:col-span-11 my-10">
			<ul class="flex gap-x-8 underline">
				<li><a href="/admin/draft-list">drafts</a></li>
				<li><a href="/admin/posts">posts</a></li>
				<li><a href="/admin/series">series</a></li>
			</ul>
		</nav>

		<div class="lg:col-start-2 lg:col-span-11">
			<slot />
		</div>
	</div>
</ContentContainer>
