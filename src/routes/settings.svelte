<script lang="ts">
	import { settings, getFontClass, switchTheme } from "$lib/store/settings";
	let fonts = ["abel", "open sans", "roboto", "dm sans"];

	let font = fonts.find((i) => i === $settings.font) || "abel";
	$: $settings.font = font;
	$: theme = $settings.theme;
</script>

<div class="text-2xl font-bold md:text-4xl">Settings</div>
<form class="flex flex-auto flex-col gap-5">
	<div class="flex flex-col">
		<div>Font:</div>
		<select
			class=" rounded-md border border-zinc-700 bg-inherit"
			bind:value={font}
		>
			{#each fonts as name (name)}
				<option value={name} class="">{name}</option>
			{/each}
		</select>
	</div>
	<div class="flex flex-col">
		<div>Theme:</div>
		<select
			class="rounded-md border border-zinc-700 bg-inherit"
			bind:value={theme}
			on:change={switchTheme}
		>
			{#each ["dark", "light"] as name (name)}
				<option value={name} class="">{name}</option>
			{/each}
		</select>
	</div>
</form>
