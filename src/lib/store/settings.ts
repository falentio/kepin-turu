import { writable } from "svelte/store";

export interface Settings {
	theme?: string;
	font?: string;
}

const ITEM_NAME = "kepin-turu-settings";

const getFromStorage = (): Settings | null => {
	const local = window.localStorage.getItem(ITEM_NAME);
	if (local === null) {
		return null;
	}
	try {
		return JSON.parse(local) as Settings;
	} catch {
		return {} as Settings;
	}
};

const setToStorage = (s: Settings) => {
	const str = JSON.stringify(s);
	window.localStorage.setItem(ITEM_NAME, str);
};

export const settings = writable<Settings>({});

export const init = () => {
	const stored = getFromStorage();
	if (stored !== null) {
		settings.set(stored);
	}
	settings.subscribe((s: Settings) => {
		setToStorage(s);
	});
	settings.update((s: Settings) => {
		s.font ||= "abel";
		s.theme ||= "dark";
		return s;
	});
};

export const switchTheme = () => {
	settings.update((s: Settings) => {
		s.theme = s.theme === "light" ? "dark" : "light";
		return s;
	});
};

export const getFontClass = (name?: string) => {
	switch (name) {
		case "roboto":
			return "roboto"
		case "open sans":
			return "openSans"
		case "dm sans":
			return "dmSans"
		default:
			return "abel"
	}
}