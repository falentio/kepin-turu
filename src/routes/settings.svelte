<script lang="ts">
	import { settings, getFontClass, switchTheme } from "$lib/store/settings"
	let fonts = [
		"abel",
		"open sans",
		"roboto",
		"dm sans"
	]

	let font = fonts.find(i => i === $settings.font) || "abel"
	$: $settings.font = font
	$: theme = $settings.theme
</script>

<div class="font-bold text-2xl md:text-4xl"> Settings </div>
<form class="flex-auto gap-5 flex flex-col">
	<div class="flex flex-col">
		<div> Font: </div>
		<select class=" bg-inherit border border-zinc-700 rounded-md" bind:value={font}>
			{#each fonts as name (name)}
				<option value={name} class="">{name}</option>
			{/each}
		</select>
	</div>
	<div class="flex flex-col">
		<div> Theme: </div>
		<select class="bg-inherit border border-zinc-700 rounded-md" bind:value={theme} on:change={switchTheme}>
			{#each ["dark", "light"] as name (name)}
				<option value={name} class="">{name}</option>
			{/each}
		</select>
	</div>
</form>
