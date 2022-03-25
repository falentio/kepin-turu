<script context="module" lang="ts">
	export const prerender = true;
	export const hydrate = true;
</script>

<script lang="ts">
	import type { BlogData } from "./_types";
	import type { MetaTagsProps } from "svelte-meta-tags";
	import { goto, invalidate } from "$app/navigation"
	import { MetaTags } from "svelte-meta-tags";
	import NextPrevBtn from "$lib/components/NextPrevBtn.svelte"
	export let blogData: BlogData;
	const { metadata, content, next, prev } = blogData;
	const metatags: MetaTagsProps = {
		title: metadata.title,
		description: metadata.desc,
		openGraph: {
			title: metadata.title,
			description: metadata.desc,
			type: "websote",
			images: [{
				url: metadata.ogImage || metadata.image,
			}],
		}
	};
</script>

<MetaTags {...metatags} />

<h1 class="text-center text-3xl capitalize mb-4">
	{metadata.title.replace(/-/g, " ")}
</h1>
<div class="text-center mb-4">
	Posted on: {metadata.postDate} <br />
	{#if !metadata.editDate.startsWith("x") }
		Last edit: {metadata.editDate} <br />
	{/if}
</div>
<div class="mx-auto mb-4">
	<img src={metadata.image} alt="cover images" width="300" height="200" class="mx-auto" />
</div>
<div class="mb-4">{metadata.desc}</div>
<div class="c flex flex-col gap-2 mb-4">{@html content}</div>
<div class="flex flex-row">
	<NextPrevBtn target={prev} text="Prev:" class="bg-blue-700f border-solid border-2 border-zinc-700 w-36 py-1 px-3 font-serif shadow-md text-left"/>
	<div class="mx-auto"></div>
	<NextPrevBtn target={next} text="Next:" class="bg-blue-70f0 border-solid border-2 border-zinc-700 w-36 py-1 px-3 font-serif shadow-md text-right"/>
</div>

<style lang="postcss">
	div.c :global(h1) {
		@apply text-2xl md:text-4xl capitalize;
	}

	div.c :global(h2) {
		@apply text-xl md:text-3xl capitalize;
	}

	div.c :global(a[href^="http"]) {
		@apply text-blue-600;
	}
</style>
