---
date: 1-1-2006
---

# hello 1

Ut eu mollit ex enim ut aliquip nulla labore qui sit laboris pariatur.

## hello 2

Sed proident veniam consequat ut veniam pariatur laboris aliquip elit reprehenderit.
Irure veniam pariatur exercitation ut sunt sint est sed consequat id id exercitation minim quis.

### hello 3

Excepteur ad tempor ut nulla eu laboris anim in elit in eiusmod laborum sed culpa labore dolore aliquip adipisicing et nostrud labore ut fugiat elit quis dolor proident occaecat proident sit cupidatat in sit.

```svelte
<div></div>
<style lang="postcss" global>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;

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
```


[anu](/)
