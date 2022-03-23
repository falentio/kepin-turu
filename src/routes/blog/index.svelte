<script lang="ts">
	import type { BlogList } from "$lib/blog";
	import Tags from "$lib/components/Tags.svelte";
	export let list: BlogList = [];
	let displayed: BlogList = [];
	$: displayed = list;
</script>

<div class="flex flex-col justify-center gap-5 py-5">
	{#each displayed as { text, name, metadata } (name)}
		<div class="p-2 shadow-lg">
			<div class="grid grid-cols-3 overflow-hidden">
				<a
					href="blog/{name}"
					class="h-auto rounded-xl object-cover md:m-2"
				>
					<img src={metadata.image} alt={name} />
				</a>
				<div class="col-span-2 mx-2 flex flex-col">
					<a
						sveltekit:prefetch
						href="blog/{name}"
						class="text-xl font-bold capitalize"
						>{name.replace(/-/g, " ")}</a
					>
					<p
						class="mb-auto overflow-hidden text-base leading-relaxed line-clamp-2"
					>
						{text}
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
