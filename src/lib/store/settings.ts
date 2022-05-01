import { writable } from "svelte/store";

export interface Settings {
	theme?: "dark"
	font?: "abel"
}

const ITEM_NAME = "kepin-turu-settings"

const getFromStorage = (): Settings | null => {
	const local = window.localStorage.getItem(ITEM_NAME)
	if (local === null) {
		return null
	}
	try {
		return JSON.parse(local) as Settings
	} catch {
		return {} as Settings
	}
}

const setToStorage = (s: Settings) => {
	const str = JSON.stringify(s)
	window.localStorage.setItem(ITEM_NAME, str)
}

export const settings = new writable<Settings>({})

export const init = () => {
	const stored = getFromStorage()
	if (stored !== null) {
		settings.set(stored)
	}
	settings.subscribe(v => {
		setToStorage(v)
	})
}

export const switchTheme = () => {
	settings.update(v => {
		v.theme = v.theme === "light" ? "dark" : "light"
		return v
	})
}

export const changeFont = (name: string) => {
	theme.update(v => {
		v.font = name
		return v
	})
}