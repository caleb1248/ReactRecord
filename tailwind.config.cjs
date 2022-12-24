const colors = require('tailwindcss/colors');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
		extend: {
    	colors: {
				...colors,
				themeColor: "#87d1ff"
			},
	
			inset: {
				"1/20": "10%"
			}
		}
  },
  plugins: []
}