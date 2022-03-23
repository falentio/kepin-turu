<script context="module" lang="ts">
	export const hidrate = true;
	export const prerender = true;
	const icons = [
		{ href: "https://github.com/falentio/kepin-turu", icon: "mdi:github" },
		{ href: "https://t.me/falentio", icon: "mdi:telegram" },
	];
</script>

<script lang="ts">
	import Icon from "@iconify/svelte";
</script>

<footer>
	<div
		class="flex flex-col justify-center bg-zinc-200 py-1 text-center dark:bg-zinc-900"
	>
		<div>My Small Website</div>
		<div class="flex flex-row justify-center">
			{#each icons as { icon, href } (href)}
				<a {href}><Icon {icon} /></a>
			{/each}
		</div>
		<div>&copy; 2022 Kepin</div>
	</div>
</footer>

<style lang="postcss">
	div :global(svg) {
		@apply m-0.5 text-2xl;
	}
</style>
