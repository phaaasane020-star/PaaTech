'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  ['/', 'Home'],
  ['/services', 'Services'],
  ['/projects', 'Projects'],
  ['/about', 'About'],
  ['/contact', 'Contact']
]

// Full-width header: your name as a wordmark on the left, text links, and a "Hire me" button.
// Transparent over the dark home hero; turns solid near-black once you scroll or leave the home page.
// The browser-tab icon (favicon) is set separately in app/layout.js and is not shown here.
export default function Navbar({ name, wa }) {
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
  // stop the page scrolling behind the open phone menu
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const solid = scrolled || path !== '/' || open
  const isOn = (h) => (h === '/' ? path === '/' : path.startsWith(h))

  return (
    <header className={`nav-in fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300 ${solid ? 'border-white/10 bg-ink/95 backdrop-blur-md' : 'border-transparent bg-transparent'}`}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 md:h-[72px]">
        <Link href="/" className="min-w-0 truncate font-display text-[17px] font-bold tracking-tight text-white sm:text-lg" aria-label={`${name} home`}>
          {name}<span className="text-accent">.</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {links.map(([h, l]) => (
            <Link key={h} href={h} aria-current={isOn(h) ? 'page' : undefined}
              className={`relative py-2 text-sm font-medium transition-colors ${isOn(h) ? 'text-white' : 'text-white/65 hover:text-white'}`}>
              {l}
              <span aria-hidden="true" className={`absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-accent transition-transform duration-300 ${isOn(h) ? 'scale-x-100' : 'scale-x-0'}`} />
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a href={wa} target="_blank" rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-white active:scale-[.97] sm:inline-flex">
            Hire me
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M8 7h9v9" /></svg>
          </a>
          <button type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}
            className="-mr-2 flex h-11 w-11 items-center justify-center rounded-lg text-white transition hover:bg-white/10 lg:hidden">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">{open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 8h16M4 16h16" />}</svg>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="hero-in flex h-[calc(100svh-4rem)] flex-col border-t border-white/10 bg-ink px-5 pb-8 pt-4 lg:hidden">
          {links.map(([h, l]) => (
            <Link key={h} href={h} aria-current={isOn(h) ? 'page' : undefined}
              className={`flex items-center justify-between border-b border-white/10 py-4 font-display text-2xl font-semibold ${isOn(h) ? 'text-accent' : 'text-white'}`}>
              {l}<span aria-hidden="true" className="text-base text-white/30">→</span>
            </Link>
          ))}
          <a href={wa} target="_blank" rel="noopener noreferrer" className="mt-auto flex w-full items-center justify-center rounded-lg bg-accent px-4 py-4 text-base font-semibold text-ink">Hire me on WhatsApp</a>
        </nav>
      )}
    </header>
  )
}
