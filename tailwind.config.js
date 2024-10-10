/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        // Add custom breakpoints here
        'xs': '480px',  // Extra small devices like small phones
        '2xl': '1440px', // Larger than the default 'xl' size
        '3xl': '1600px', // Very large screens or desktops
      },
    },
  },
  plugins: [],
}
