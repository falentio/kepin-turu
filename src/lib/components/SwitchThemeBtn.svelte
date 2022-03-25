<script lang="ts">
	import Icon from "@iconify/svelte";
	import { theme, switchTheme } from "$lib/store/theme";

	const iconSet = {
		dark: "carbon:moon",
		light: "carbon:sun",
	};
	$: icon = iconSet[$theme];
</script>

<button class={$$props.class} on:click={switchTheme}>
	<div class="h-full">
		<Icon {icon} class="h-full w-full dark:text-zinc-700" />
	</div>
</button>
