<script lang="ts">
	import "../app.css";
	import Footer from "$lib/components/Footer.svelte";
	import Navbar from "$lib/components/Navbar.svelte";
	import { theme, init as initTheme } from "$lib/store/theme";
	import { title } from "$lib/store/title";
	import { browser } from "$app/env";
	import { onMount } from "svelte";
	$: if (browser) {
		initTheme();
	}
	onMount(() => {
		if (window.location.hash !== "") {
			document.querySelector(window.location.hash)?.scrollIntoView();
		}
	});
</script>

<svelte:head>
	<title>{$title}</title>
</svelte:head>
<div class={$theme}>
	<div
		class="flex h-screen h-max min-h-screen flex-col bg-gray-100 text-black dark:bg-zinc-800 dark:text-gray-400 md:text-xl"
		class:hidden={!browser}
	>
		<Navbar />
		<div class="container mx-auto mb-auto px-4">
			<slot />
		</div>
		<Footer />
	</div>
</div>

<style lang="postcss" global>
</style>
