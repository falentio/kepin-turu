<script context="module" lang="ts">
	export const prerender = true;
	export const hydrate = true;
</script>

<script lang="ts">
	import type { BlogData } from "./_types";
	import { title } from "$lib/store/title";
	export let blogData: BlogData;
	$: if (blogData) {
		title.set(blogData.metadata.title + "");
	}
</script>

<div class="my-2 flex flex-col">
	<div class="my-2 text-center text-3xl capitalize">
		{blogData.metadata.title}
	</div>
	<div class="mx-auto my-2">
		<img src={blogData.metadata.image} alt="cover images" />
	</div>
	<div class="my-2">{@html blogData.content}</div>
</div>

<style lang="postcss">
	div :global(h1) {
		@apply pt-5 text-2xl md:text-4xl;
	}

	div :global(h2) {
		@apply py-2 text-xl md:text-3xl;
	}

	div :global(a[href^="http"]) {
		@apply text-blue-600;
	}
</style>
