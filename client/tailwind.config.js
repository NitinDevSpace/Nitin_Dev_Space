/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#01071f",
				primary2: '#070d27',
				primary3: "#0a112b",
				secondary: "#3F567F",
				accent1: "#add6e9ff",
				accent2: "#e1b666ff",
				orange: "#ff8b60",
				pink: "#be4673",
				blue: "#0793e8",
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
