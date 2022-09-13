<script lang="ts">
	import "../app.css";
	// sans-serif font
	import "@fontsource/abel/400.css";
	// monospace font
	import "@fontsource/ibm-plex-mono/400.css";
	import Footer from "$lib/components/Footer.svelte";
	import Navbar from "$lib/components/Navbar.svelte";
	import { settings, init, getFontClass } from "$lib/store/settings";
	import { browser } from "$app/env";
	import { onMount } from "svelte";
	$: if (browser) {
		init();
	}
	onMount(() => {
		if (window.location.hash !== "") {
			document.querySelector(window.location.hash)?.scrollIntoView();
		}
	});
</script>

< />
<div class={$settings.theme}>
	<div
		class="{getFontClass(
			$settings.font
		)} flex min-h-screen flex-col bg-white text-black dark:bg-zinc-900 dark:text-stone-200 md:text-xl"
		class:hidden={!browser}
	>
		<Navbar />
		<div class="container mx-auto flex flex-auto flex-col px-4 py-4">
			<slot />
		</div>
		<Footer />
	</div>
</div>
