<script>
	import ContentContainer from '../../components/ContentContainer.svelte';
</script>

<ContentContainer>
	<nav class="lg:grid lg:grid-cols-12 my-10">
		<ul class="flex gap-x-8 lg:col-start-2 lg:col-span-8 underline">
			<li><a href="/admin">admin</a></li>
			<!-- <li><a href="/admin/create-draft">create new draft</a></li> -->
			<!-- <li><a href="/admin/draft-list">drats list</a></li> -->
			<!-- <li><a href="/admin/posts">posts</a></li> -->
			<!-- <li><a href="/admin/draft">series</a></li>  -->
		</ul>
	</nav>
</ContentContainer>

<slot />
