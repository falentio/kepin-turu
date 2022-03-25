<script lang="ts">
	import { invalidate, goto, prefetch } from "$app/navigation"
	export let target: string = ""
	export let text: string
	let a

	async function click() {
		a.click()
	}
</script>
<a sveltekit:prefetch href="./{target}" bind:this={a}>ff</a>
<button class:invisible={!target} class="{$$props.class} rounded-md" on:click={click}>
	<div>{text}</div>
	<div class="capitalize">{target.replace(/-/gi, " ")}</div>
</button>