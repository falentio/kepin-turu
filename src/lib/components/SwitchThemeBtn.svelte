<script lang="ts">
	import Icon from "@iconify/svelte";
	import { settings, switchTheme } from "$lib/store/settings";

	const iconSet = {
		dark: "carbon:moon",
		light: "carbon:sun",
	};
	$: icon = iconSet[$settings.theme];
</script>

<button class={$$props.class} on:click={switchTheme}>
	<div class="h-full">
		<Icon {icon} class="h-full w-full dark:text-zinc-700" />
	</div>
</button>
