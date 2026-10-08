import './globals.css'
import { Inter, Space_Grotesk } from 'next/font/google'
import { supabase } from '@/lib/supabase'
import { site } from '@/lib/site'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const grotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-grotesk' })

export const revalidate = 30

export async function generateMetadata() {
  const { data: s } = await supabase.from('site_settings').select('business_name,tagline,favicon_url,logo_url,updated_at').eq('id', 1).single()
  const name = s?.business_name || 'Paa Asane Technologies'
  const description = 'Windows installation and activation, Microsoft Office setup, laptop formatting and repair, virus removal and custom website development in Ghana. Chat on WhatsApp for a quick quote.'
  return {
    metadataBase: new URL(site),
    title: { default: `${name} | Windows, laptop repair & web development in Ghana`, template: `%s | ${name}` },
    description,
    icons: { icon: s?.favicon_url ? `${s.favicon_url}?v=${encodeURIComponent(s.updated_at || '')}` : '/favicon.svg' },
    openGraph: { title: name, description, siteName: name, type: 'website', locale: 'en_GH', images: s?.logo_url ? [s.logo_url] : undefined },
    twitter: { card: 'summary_large_image', title: name, description }
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${grotesk.variable}`}>
      <body>{children}</body>
    </html>
  )
}
