<script lang="ts">
	import type { Metadata } from "$lib/blog";
	import Tags from "$lib/components/Tags.svelte";
	export let list: Metadata[] = [];
	let displayed = list;
</script>

<div class="flex flex-col justify-center gap-5 py-5">
	{#each displayed as metadata (metadata.name)}
		<div class="p-2 shadow-lg">
			<div class="grid grid-cols-3 overflow-hidden">
				<a
					href="blog/{metadata.name}"
					class="h-auto rounded-xl object-cover md:m-2"
				>
					<img
						src={metadata.image}
						alt={metadata.name}
						width="300"
						height="200"
					/>
				</a>
				<div class="col-span-2 mx-2 flex flex-col">
					<a
						sveltekit:prefetch
						href="blog/{metadata.name}"
						class="text-xl font-bold capitalize"
					>
						{metadata.name.replace(/-/g, " ")}
					</a>
					<p
						class="mb-auto overflow-hidden text-base leading-relaxed"
					>
						{metadata.postDate}
					</p>
					<div class="my-1 hidden flex-row flex-wrap gap-5 md:flex">
						<Tags
							tags={metadata.tags}
							class="p-1 text-gray-500 shadow-md"
						/>
					</div>
				</div>
				<div
					class="col-span-3 my-1 flex flex-row flex-wrap gap-3 md:hidden"
				>
					<Tags
						tags={metadata.tags}
						class="p-1 text-gray-500 shadow-md"
					/>
				</div>
			</div>
		</div>
	{/each}
</div>
