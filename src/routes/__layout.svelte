<script>
	import Footer from "$lib/components/Footer.svelte";
	import { theme, switchTheme, init as initTheme } from "$lib/store/theme"
	import { browser } from "$app/env"
	let mounted = false
	$: if (browser) {
		initTheme()
		mounted = true
	}
</script>

<div class="flex flex-col h-screen theme-{$theme} min-h-screen h-max" data-theme={$theme} class:n={!mounted}>
	<button class="m-10 bg-blue-500" on:click={switchTheme}>{$theme}</button>
	<div class="mb-auto px-5">
		<slot />
	</div>
	<Footer />
</div>

<style lang="postcss" global>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;

	.n {
		display: none;
	}

	.theme-dark {
		@apply text-white bg-zinc-800
	}

	.theme-light {
		@apply text-black bg-zinc-100
	}

	/** shiki configuration */
	.theme-dark .rehype-shiki > .shiki-light {
		display: none;
	}

	.theme-light .rehype-shiki > .shiki-dark {
		display: none;
	}

	pre.shiki {
		overflow-x: auto;
		overflow-y: hidden;
	}

	pre.shiki > code {
		counter-reset: step;
		counter-increment: step 0;
	}

	pre.shiki > code > .line::before {
		content: counter(step);
		counter-increment: step;
		width: 2rem;
		margin-right: 0.5rem;
		display: inline-block;
		text-align: right;
		border-right: inset;
		padding-right: 0.5rem;
	}
</style>
