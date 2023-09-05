/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'black-text': '#212429',
        primary: '#F6B750',
        'input-border': '#d1d5db',
        'input-placeholder': '#999999',
      },
      boxShadow: {
        around: '0 0 6px rgba(0, 0, 0, 0.24)',
      },
    },
  },
  plugins: [],
}
