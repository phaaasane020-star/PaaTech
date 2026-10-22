module.exports = {
  content: ['./app/**/*.{js,jsx}'],
  theme: { extend: {
    colors: { paper: '#FAF8F3', line: '#E6E1D6', ink: '#0B1A14', muted: '#55605A', brand: '#0F3D2E', accent: '#C49A3A', 'accent-deep': '#8F6D22', lav: '#B8B39F' },
    fontFamily: { sans: ['var(--font-inter)', 'sans-serif'], display: ['var(--font-grotesk)', 'sans-serif'] }
  } },
  plugins: []
}
