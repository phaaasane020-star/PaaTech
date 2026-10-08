module.exports = {
  content: ['./app/**/*.{js,jsx}'],
  theme: { extend: {
    colors: { paper: '#F5F3EE', line: '#E3DFD6', ink: '#101A14', muted: '#5C665F', brand: '#0F3D2A', lime: '#C8F135' },
    fontFamily: { sans: ['var(--font-inter)', 'sans-serif'], display: ['var(--font-grotesk)', 'sans-serif'] }
  } },
  plugins: []
}
