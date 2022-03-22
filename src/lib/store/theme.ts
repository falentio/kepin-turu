import { writable } from "svelte/store"
import { browser } from "$app/env"

export const theme = writable<string>("dark")

export const switchTheme = () => {
	theme.update(prev => {
		if (prev === "dark") {
			return "light"
		} else {
			return "dark"
		}
	})
}

export const init = () => {
	const current = localStorage.getItem("theme") ?? "dark"
	theme.set(current)
	theme.subscribe(v => {
		if (browser) {
			localStorage.setItem("theme", v)
		}
		return v
	})
}
