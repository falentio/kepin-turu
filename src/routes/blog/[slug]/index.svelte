<script context="module" lang="ts">
	export const prerender = true;
	export const hydrate = true;
</script>

<script lang="ts">
	import type { MetaTagsProps } from "svelte-meta-tags";
	import type { Metadata } from "$lib/blog";
	import { MetaTags } from "svelte-meta-tags";
	import NextPrevBtn from "$lib/components/NextPrevBtn.svelte";
	export let metadata: Metadata;
	export let content: string;
	export let prev: string | null;
	export let next: string | null;
	const metatags: MetaTagsProps = {
		title: metadata.title.replace(/-/g, " "),
		description: metadata.desc,
		openGraph: {
			title: metadata.title.replace(/-/g, " "),
			description: metadata.desc,
			type: "website",
			images: [
				{
					url: metadata.ogImage || metadata.image,
				},
			],
		},
	};
</script>

<MetaTags {...metatags} />
<h1 class="mb-4 text-center text-3xl capitalize">
	{metadata.title.replace(/-/g, " ")}
</h1>
<div class="mb-4 text-center">
	Posted on: {metadata.postDate} <br />
	{#if !metadata.editDate.startsWith("x")}
		Last edit: {metadata.editDate} <br />
	{/if}
</div>
<div class="mx-auto mb-4">
	<img
		src={metadata.image}
		alt="cover images"
		width="300"
		height="200"
		class="mx-auto"
	/>
</div>
<div class="mb-4 text-center">{metadata.desc}</div>
<div class="c mb-auto flex flex-col gap-2">{@html content}</div>
<div class="m-2"></div>
<div class="flex flex-row">
	<NextPrevBtn target={prev} text="Prev:" class="text-left" />
	<div class="mx-auto" />
	<NextPrevBtn target={next} text="Next:" class="text-right" />
</div>

<style lang="postcss">
	div.c :global(h1) {
		@apply text-2xl capitalize md:text-4xl;
	}

	div.c :global(h2) {
		@apply text-xl capitalize md:text-3xl;
	}

	div.c :global(a[href^="http"]) {
		@apply text-blue-600;
	}
</style>
