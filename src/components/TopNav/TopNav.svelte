<script>
	import ContentContainer from '../ContentContainer.svelte';
	import TopNavItem from './TopNavItem.svelte';
</script>

<ContentContainer>
	<nav class="grid grid-cols-12">
		<ul
			class={`
      flex col-span-12 lg:col-span-8 lg:col-start-2 
      border border-0 border-b-2 border-black 
    h-20 gap-x-7 
      `}
		>
			<TopNavItem href="/">Home</TopNavItem>
			<TopNavItem href="/posts">Posts</TopNavItem>
			<!-- <TopNavItem href="/series">Series</TopNavItem> -->
			<!-- <TopNavItem href="/tags">Tags</TopNavItem> -->
			<!-- <TopNavItem href="/search">Search</TopNavItem> -->
			<!-- <TopNavItem href="/about">About</TopNavItem> -->
		</ul>
	</nav>
</ContentContainer>
