/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#412653", // Deep purple background
				secondary: "#3F567F", // Muted blue
				accent1: "#D174D2", // Magenta
				accent2: "#00FFFF", // Coral
			},
			fontFamily: {
				heading: ["Space Grotesk", "sans-serif"],
				body: ["Inter", "sans-serif"],
			},
			maxWidth: {
				content: "1200px",
			},
		},
	},
	plugins: [],
};
