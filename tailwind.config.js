module.exports = {
  content: ['./app/**/*.{js,jsx}'],
  theme: { extend: {
    colors: { paper: '#F5FFF4', line: '#D9D8E4', ink: '#27232E', muted: '#625D70', brand: '#474150', accent: '#FFBB00', lav: '#9C99B8' },
    fontFamily: { sans: ['var(--font-inter)', 'sans-serif'], display: ['var(--font-grotesk)', 'sans-serif'] }
  } },
  plugins: []
}
