'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  ['/', 'Home', <path d="M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10" />],
  ['/services', 'Services', <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />],
  ['/projects', 'Projects', <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></>],
  ['/about', 'About', <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>],
  ['/contact', 'Contact', <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>]
]

const Icon = ({ children }) => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{children}</svg>
)

// Full-width header: your name as a wordmark on the left, text links, and a "Hire me" button.
// Phones keep the original dropdown menu (icon + label per page, WhatsApp button at the bottom).
// Transparent over the dark home hero; turns solid near-black once you scroll or leave the home page.
// Your logo (uploaded in Admin → Settings → Website logo) shows beside your name; the tab icon is set separately in app/layout.js.
export default function Navbar({ name, logo, wa }) {
  const path = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => setOpen(false), [path])

  const solid = scrolled || path !== '/' || open
  const isOn = (h) => (h === '/' ? path === '/' : path.startsWith(h))

  return (
    <header className={`nav-in fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300 ${open ? 'border-white/10 bg-ink' : solid ? 'border-white/10 bg-ink/95 backdrop-blur-md' : 'border-transparent bg-transparent'}`}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 md:h-[72px]">
        <Link href="/" className="flex min-w-0 items-center gap-2.5 text-white" aria-label={`${name} home`}>
          {logo && <img src={logo} alt="" className="h-9 w-9 shrink-0 rounded-lg object-contain md:h-10 md:w-10" />}
          <span className="min-w-0 truncate font-display text-[17px] font-bold tracking-tight sm:text-lg">{name}</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {links.map(([h, l]) => (
            <Link key={h} href={h} aria-current={isOn(h) ? 'page' : undefined}
              className={`relative py-2 text-sm font-medium transition-colors ${isOn(h) ? 'text-white' : 'text-white/65 hover:text-white'}`}>
              {l}
              <span aria-hidden="true" className={`absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-white transition-transform duration-300 ${isOn(h) ? 'scale-x-100' : 'scale-x-0'}`} />
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a href={wa} target="_blank" rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:brightness-110 active:scale-[.97] sm:inline-flex">
            Hire me
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M8 7h9v9" /></svg>
          </a>
          <button type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}
            className="rounded-xl border border-white/20 bg-white/10 p-2.5 text-white lg:hidden">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">{open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}</svg>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="mx-auto max-w-6xl border-t border-white/15 p-3 lg:hidden">
          {links.map(([h, l, icon]) => (
            <Link key={h} href={h} aria-current={isOn(h) ? 'page' : undefined}
              className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-white ${isOn(h) ? 'bg-white/15' : 'hover:bg-white/10'}`}><Icon>{icon}</Icon>{l}</Link>
          ))}
          <a href={wa} target="_blank" rel="noopener noreferrer" className="mt-2 flex w-full items-center justify-center rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-white">Hire me on WhatsApp</a>
        </nav>
      )}
    </header>
  )
}
