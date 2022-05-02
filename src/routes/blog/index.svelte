<script lang="ts">
	import type { Metadata } from "$lib/blog";
	import type { MetaTagsProps } from "svelte-meta-tags";
	import { MetaTags } from "svelte-meta-tags";
	import Tags from "$lib/components/Tags.svelte";
	export let list: Metadata[] = [];
	// TODO: implement filter
	let displayed = list;
	const metatags: MetaTagsProps = {
		title: "my small website",
	};
</script>

<MetaTags {...metatags} />

<div class="flex flex-col justify-center divide-y-2 dark:divide-zinc-700">
	{#each displayed as metadata (metadata.title)}
		<div class="p-2">
			<div class="grid grid-cols-5 overflow-hidden pt-2">
				<a
					href="blog/{metadata.title}"
					class="col-span-2 h-auto object-cover md:m-2"
				>
					<img
						src={metadata.image}
						alt={metadata.title}
						class="rounded-md"
						width="1200"
						height="630"
						loading="lazy"
					/>
				</a>
				<div class="col-span-3 mx-2 flex flex-col">
					<a
						sveltekit:prefetch
						href="blog/{metadata.title}"
						class="text-xl font-bold capitalize"
					>
						{metadata.title.replace(/-/g, " ")}
					</a>
					<p class="truncate">{metadata.desc}</p>
					<p
						class="mb-auto overflow-hidden text-base leading-relaxed"
					>
						{metadata.postDate}
					</p>
					<div
						class="my-1 hidden flex-row flex-wrap gap-5 text-sm text-gray-500 md:flex"
					>
						<Tags
							tags={metadata.tags}
							class="rounded-md p-1 shadow-sm"
						/>
					</div>
				</div>
				<div
					class="col-span-5 my-1 flex flex-row flex-wrap gap-3 text-sm text-gray-500 md:hidden"
				>
					<Tags
						tags={metadata.tags}
						class="rounded-md p-1 shadow-sm"
					/>
				</div>
			</div>
		</div>
	{/each}
</div>
