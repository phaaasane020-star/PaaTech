module.exports = {
  content: ['./app/**/*.{js,jsx}'],
  theme: { extend: {
    colors: { paper: '#EEF2FF', line: '#D2DDFF', ink: '#050208', muted: '#4A4F6A', brand: '#5465FF', accent: '#5465FF', 'accent-deep': '#5465FF', lav: '#D2DDFF' },
    fontFamily: { sans: ['var(--font-inter)', 'sans-serif'], display: ['var(--font-grotesk)', 'sans-serif'] }
  } },
  plugins: []
}
