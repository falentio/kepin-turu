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
	let metatags: MetaTagsProps;
	$: metatags = {
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
<div class="flex flex-auto flex-col gap-4">
	<h1 class="text-center text-3xl font-bold capitalize">
		{metadata.title.replace(/-/g, " ")}
	</h1>
	<div class="text-center">
		Posted on: {metadata.postDate} <br />
		{#if !metadata.editDate.startsWith("x")}
			Last edit: {metadata.editDate} <br />
		{/if}
	</div>
	<div class="mx-auto">
		<img
			src={metadata.image}
			alt="cover images"
			width="300"
			height="200"
			class="mx-auto rounded-2xl"
		/>
	</div>
	<div class="text-center">{metadata.desc}</div>
	<div class="c mb-auto flex flex-col gap-2">{@html content}</div>
	<div class="flex-auto" />
	<div class="flex flex-row">
		<NextPrevBtn target={prev} text="Prev:" class="text-left" />
		<div class="mx-auto" />
		<NextPrevBtn target={next} text="Next:" class="text-right" />
	</div>
</div>

<style lang="postcss">
	div.c :global(h1) {
		@apply text-2xl font-bold capitalize md:text-4xl;
	}

	div.c :global(h2) {
		@apply text-xl font-bold capitalize md:text-3xl;
	}

	div.c :global(h3) {
		@apply font-bold;
	}

	div.c :global(a[href^="http"]) {
		@apply text-blue-600;
	}

	div.c :global(ol) {
		counter-reset: c;
		/* counter-increment: c 0; */
	}

	div.c :global(li::before) {
		content: counter(c);
		counter-increment: c;
		@apply mr-2;
	}

	div.c :global(ol ol li::before) {
		content: counters(c, ".") " ";
		counter-increment: c;
		@apply mr-2 pl-4;
	}
</style>
