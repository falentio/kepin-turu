<script lang="ts">
	import Icon from "@iconify/svelte";
	import { theme, switchTheme } from "$lib/store/theme";

	const iconSet = {
		dark: "carbon:moon",
		light: "carbon:sun",
	};
	let icon: string;
	$: icon = iconSet[$theme];
</script>

<div class="flex flex-col bg-gray-100 py-1 shadow-sm dark:bg-zinc-800">
	<div
		class="container mx-auto flex h-14 gap-2 px-2 text-xl md:h-20 md:text-3xl"
	>
		<div class="my-auto">
			<a href="/"> Kepin </a>
			<div class="flex flex-row gap-3 text-sm">
				<a href="/">home</a>
				<a href="/blog">blog</a>
			</div>
		</div>
		<div class="mr-auto" />
		<button class="aspect-square p-2" on:click={switchTheme}>
			<div class="h-full">
				<Icon {icon} class="h-full w-full dark:text-zinc-700" />
			</div>
		</button>
	</div>
</div>

<style lang="postcss">
</style>
