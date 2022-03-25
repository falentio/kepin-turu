<script lang="ts">
	import Icon from "@iconify/svelte";
	import type { MetaTagsProps } from "svelte-meta-tags";
	import { MetaTags } from "svelte-meta-tags";

	const metatags: MetaTagsProps = {
		title: "my small",
	};
</script>

<MetaTags {...metatags} />

<div class="flex flex-col justify-center gap-5 py-5">
	<div class="mx-auto">
		<a href="https://github.com/falentio" class="shadow-xl" target="blank">
			<img
				src="https://github.com/falentio.png?size=200"
				alt="profile"
				class="rounded-full"
				width="200"
				height="200"
			/>
		</a>
	</div>
	<div class="mx-auto flex w-60 flex-wrap text-xl font-bold md:w-80">
		<span class="mx-auto">halo saya kevin falentio.</span>
		<span class="mx-auto">ini web kecil saya.</span>
	</div>
	<div>
		<div class="">saya mebuat web ini menggunakan</div>
		<ul class="capitalize">
			<li>
				<a
					class="flex w-max gap-1"
					href="https://svelte.dev"
					target="blank"
				>
					<Icon icon="cib:svelte" class="my-auto h-full" />
					svelte
				</a>
			</li>
			<li>
				<a
					class="flex w-max gap-1"
					href="https://tailwindcss.com"
					target="blank"
				>
					<Icon icon="mdi:tailwind" class="my-auto h-full" />
					tailwind
				</a>
			</li>
			<li>
				<a
					class="flex w-max gap-1"
					href="https://wikipedia.org/wiki/Markdown"
					target="blank"
				>
					<Icon icon="cib:markdown" class="my-auto h-full" />
					markdown
				</a>
			</li>
		</ul>
	</div>
</div>
