<script lang="ts">
	export let tags: string[] = [];
	$: tags.sort((a, b) => {
		return a > b ? 1 : -1;
	});
</script>

{#each tags as tag (tag)}
	<div class={$$props.class}>#{tag}</div>
{/each}
