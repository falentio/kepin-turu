<script lang="ts">
	import Icon from "@iconify/svelte";
</script>

<div class="flex flex-col justify-center gap-5 py-5">
	<div class="mx-auto w-40">
		<a href="https://github.com/falentio" class="shadow-xl" target="blank">
			<img
				src="https://github.com/falentio.png"
				alt="profile pictore"
				class="rounded-full"
			/>
		</a>
	</div>
	<div class="mx-auto flex flex-wrap">
		halo saya kevin falentio. ini web kecil saya.
	</div>
	<div>
		saya mebuat web ini menggunakan
		<ul>
			<li>
				<a
					class="flex w-max gap-1"
					href="https://svelte.dev"
					target="blank"
				>
					<Icon icon="cib:svelte" class="my-auto h-full" />
					svelte
				</a>
			</li>
			<li>
				<a
					class="flex w-max gap-1"
					href="https://tailwindcss.com"
					target="blank"
				>
					<Icon icon="mdi:tailwind" class="my-auto h-full" />
					tailwind
				</a>
			</li>
		</ul>
	</div>
</div>

<style lang="postcss"></style>
