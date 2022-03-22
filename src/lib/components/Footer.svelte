<script>
	import { theme } from "$lib/store/theme"
</script>

<footer>
	<div class="flex justify-center text-center min-w-screen {$theme}">
		Small web <br>
		&copy;2022
	</div>
</footer>

<style lang="postcss">
	.dark {
		@apply bg-zinc-900
	}

	.light {
		@apply bg-zinc-200
	}
</style>
