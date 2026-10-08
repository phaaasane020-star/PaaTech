// Built-in project shown first on the My Work page (same layout as projects added in the admin).
export const harambee = {
  id: 'team-harambee',
  title: 'Team Harambee campaign website',
  category: 'Web engineering',
  summary: 'A student-focused campaign and campus platform for UMaT, built around engagement, welfare, ideas and finding your way around campus.',
  features: [
    'Campus Guide with search, categories and Google Maps directions',
    'Academic bank, events and updates pages',
    'Contact form with WhatsApp and TikTok links',
    'Dark and light mode, fully responsive'
  ],
  tools: ['React', 'Vite', 'Tailwind CSS', 'Google Maps'],
  device: 'phone', // 'phone' or 'desktop'
  live_url: '',
  cover_url: '/work/harambee-1.webp',
  gallery: [
    { src: '/work/harambee-1.webp', label: 'Home page' },
    { src: '/work/harambee-2.webp', label: 'Campus Guide' },
    { src: '/work/harambee-3.webp', label: 'Contact page' },
    { src: '/work/harambee-4.webp', label: 'Hostels listing' },
    { src: '/work/harambee-5.webp', label: 'More hostels' }
  ]
}
