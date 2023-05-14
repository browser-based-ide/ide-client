/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter", "sans-serif"],
				// 'mono': ['Space Grotesk', 'monospace'],
			},
			colors: {
				dark: "#1e1e1e",
				blue: "#137DCE",
			},
		},
	},
	plugins: [],
};
