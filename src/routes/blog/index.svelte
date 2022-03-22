<script lang="ts">
	import type { BlogList } from "$lib/blog"
	import { prefetchRoutes } from "$app/navigation"
	import { onMount } from "svelte"
	export let list: BlogList;
	onMount(() => {
		prefetchRoutes(list.map(i => i.name))
	})
</script>

<div>
	{#each list as blog (blog.name)}
		<a href="./blog/{blog.name}">{blog.name}</a><br />
	{/each}
</div>
