<script context="module" lang="ts">
	export const hidrate = true;
	export const prerender = true;
	const icons = [
		{ href: "https://github.com/falentio/kepin-turu", icon: "mdi:github" },
	];
</script>

<script lang="ts">
	import Icon from "@iconify/svelte";
</script>

<footer>
	<div
		class="flex flex-col justify-center text-white dark:border-t-2 border-solid border-zinc-700 py-2 text-center bg-zinc-900"
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
