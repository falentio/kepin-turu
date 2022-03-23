const config = {
	mode: "jit",
	darkMode: "class",
	content: ["./src/**/*.{html,js,svelte,ts}"],

	theme: {
		extend: {},
	},

	plugins: [require("@tailwindcss/line-clamp")],
};

module.exports = config;
