<script context="module" lang="ts">
	export const prerender = true;
	export const hydrate = true;
</script>

<script lang="ts">
	import type { BlogData } from "./_types";
	import { title } from "$lib/store/title";
	export let blogData: BlogData;
	title.set(blogData.metadata.title + "");
</script>

<div class="my-2 flex flex-col gap-4">
	<h1 class="text-center text-3xl capitalize">
		{blogData.metadata.title}
	</h1>
	<div class="text-center">
		Posted on: {blogData.metadata.postDate}
	</div>
	<div class="mx-auto">
		<img
			src={blogData.metadata.image}
			alt="cover images"
			width="300"
			height="200"
		/>
	</div>
	<div class="c">{@html blogData.content}</div>
</div>

<style lang="postcss">
	div.c :global(h1) {
		@apply pt-5 text-2xl md:text-4xl;
	}

	div.c :global(h2) {
		@apply py-2 text-xl md:text-3xl;
	}

	div.c :global(a[href^="http"]) {
		@apply text-blue-600;
	}
</style>
