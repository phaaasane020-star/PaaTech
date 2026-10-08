import Link from 'next/link'
import { supabase, waLink, waNumber } from '@/lib/supabase'
import { services } from '@/lib/services'
import { site } from '@/lib/site'
import Navbar from './Navbar'
import RevealObserver from './RevealObserver'

export const revalidate = 30

export default async function SiteLayout({ children }) {
  const { data: s } = await supabase.from('site_settings').select('*').eq('id', 1).single()
  const name = s?.business_name || 'Paa Asane Technologies'
  const wa = waLink(s?.phone)
  const ld = {
    '@context': 'https://schema.org', '@type': 'ProfessionalService', name, url: site,
    description: 'Windows, Microsoft Office, laptop repair and web development services in Ghana.',
    telephone: '+' + waNumber(s?.phone), email: s?.email, areaServed: 'Ghana', image: s?.logo_url || undefined,
    address: { '@type': 'PostalAddress', addressCountry: 'GH' },
    makesOffer: services.map((v) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: v.title } }))
  }
  return (
    <>
      <Navbar name={name} logo={s?.logo_url} wa={wa} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, '\\u003c') }} />
      <RevealObserver />
      <main>{children}</main>
      <footer className="mt-24 bg-brand text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 md:grid-cols-3">
          <div><p className="font-display text-xl font-semibold">{name}</p><p className="mt-2 text-sm text-white/70">Everything Tech, One Plug.</p></div>
          <div className="text-sm">
            <p className="label text-white/60">Contact</p>
            <a className="block py-1" href={wa}>WhatsApp: {s?.phone}</a>
            <a className="block py-1" href={`mailto:${s?.email}`}>{s?.email}</a>
          </div>
          <div className="text-sm">
            <p className="label text-white/60">Pages</p>
            {[['/about', 'About'], ['/services', 'Services'], ['/projects', 'Projects'], ['/reviews', 'Reviews'], ['/contact', 'Contact']].map(([h, l]) => <Link key={h} href={h} className="block py-1">{l}</Link>)}
          </div>
        </div>
        <p className="border-t border-white/10 py-5 text-center text-xs text-white/50">© {new Date().getFullYear()} {name}. All rights reserved.</p>
      </footer>
      <a href={waLink(s?.phone, 'Hello, I need help with...')} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"
        className="fixed bottom-5 right-5 z-30 flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white shadow-lg ring-1 ring-white/20 transition hover:-translate-y-0.5 active:scale-95">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20l1.2-5.4A8.4 8.4 0 1 1 21 11.5z" /></svg>
        <span className="hidden sm:inline">Chat on WhatsApp</span>
      </a>
    </>
  )
}
