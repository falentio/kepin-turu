<script lang="ts">
	import "../app.css";
	import Footer from "$lib/components/Footer.svelte";
	import Navbar from "$lib/components/Navbar.svelte";
	import { theme, init as initTheme } from "$lib/store/theme";
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

<div class={$theme}>
	<div
		class="flex h-max min-h-screen flex-col bg-gray-100 text-black dark:bg-zinc-800 dark:text-gray-100 md:text-xl"
		class:hidden={!browser}
	>
		<Navbar />
		<div class="container mx-auto flex flex-auto flex-col px-4 py-4">
			<slot />
		</div>
		<Footer />
	</div>
</div>
