<script lang="ts">
	import { goto, prefetch } from "$app/navigation";
	import { browser } from "$app/env";
	export let target: string | null = null;
	export let text: string;
	$: if (browser) {
		prefetch(target);
	}
</script>

<button
	class:invisible={target === null}
	class="{$$props.class} w-36 rounded-md border-2 border-solid border-zinc-700 py-1 px-3 font-serif shadow-md md:w-48"
	on:click={() => goto(target)}
>
	<div class="truncate">{text}</div>
	<div class="capitalize">{target?.replace(/-/gi, " ")}</div>
</button>
