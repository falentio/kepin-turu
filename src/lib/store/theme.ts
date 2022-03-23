import { writable } from "svelte/store";

const ITEM_NAME = "theme";
const DEFAULT_THEME = "light";

const getSysTheme = () => {
	const isDark = window?.matchMedia("(prefers-color-scheme: dark)");
	return isDark ? "dark" : "light";
};

export const theme = writable<string>("dark");

export const switchTheme = () => {
	theme.update((prev) => {
		if (prev === "dark") {
			return "light";
		} else if (prev === "light") {
			return "dark";
		} else {
			// fallback if ancidentially set non known theme
			return DEFAULT_THEME;
		}
	});
};

export const init = () => {
	const current =
		localStorage.getItem(ITEM_NAME) ?? getSysTheme() ?? DEFAULT_THEME;
	theme.set(current);
	theme.subscribe((v) => {
		localStorage.setItem(ITEM_NAME, v);
	});
};
