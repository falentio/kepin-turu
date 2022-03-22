<script context="module" lang="ts">
	export const prerender = true;
	export const hydrate = true;
</script>

<script lang="ts">
	import type { BlogData } from "./_types"
	export let blogData: BlogData;
</script>

<div>
	{@html blogData.content}
</div>

<style lang="postcss">
	div :global(h1) {
		@apply text-xl;
	}
</style>
