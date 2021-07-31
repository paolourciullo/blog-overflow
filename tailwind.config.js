module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'top-bar': '#0A043C',
        'search-bar': '#03506F',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
