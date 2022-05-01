<script lang="ts" context="module">
	export const prerender = true;
</script>

<script lang="ts">
	import SwitchThemeBtn from "$lib/components/SwitchThemeBtn.svelte";
</script>

<nav class="flex flex-col py-1 capitalize shadow-sm ">
	<section
		class="container mx-auto flex h-14 gap-2 px-2 text-xl md:h-20 md:text-3xl"
	>
		<div class="my-auto">
			<a href="/" class="font-bold"> Kepin </a>
			<div class="flex flex-row gap-3 text-sm">
				<a href="/">home</a>
				<a href="/blog">blog</a>
				<a href="/settings">settings</a>
			</div>
		</div>
		<div class="mr-auto" />
		<SwitchThemeBtn class="p-2" />
	</section>
</nav>
