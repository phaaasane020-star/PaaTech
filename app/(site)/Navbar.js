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

// Floating frosted-glass header. Clear glass over the dark hero; turns darker once you scroll or leave the home page so it stays readable.
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
    <header className="fixed inset-x-0 top-3 z-40 px-3 sm:px-5">
      <div className={`mx-auto max-w-6xl rounded-2xl border border-white/20 shadow-lg backdrop-blur-md transition-colors duration-300 ${solid ? 'bg-brand/90' : 'bg-white/10 dark:bg-black/20'}`}>
        <div className="flex items-center justify-between gap-3 px-3 py-2.5 sm:px-4">
          <Link href="/" className="flex min-w-0 items-center gap-3 text-white">
            {logo
              ? <img src={logo} alt="" className="h-11 w-11 shrink-0 rounded-xl bg-black object-contain p-1" />
              : <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20">
                  <svg viewBox="0 0 64 64" className="h-7 w-7"><path d="M16 38 32 22l16 16" fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" /><path d="M16 52 32 36l16 16" fill="none" stroke="#C8F135" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>}
            <span className="min-w-0 leading-tight">
              <span className="block truncate font-display text-base font-semibold sm:text-lg">{name}</span>
              <span className="block truncate text-[11px] text-lime sm:text-xs">Everything Tech, One Plug.</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {links.map(([h, l, icon]) => (
              <Link key={h} href={h} aria-current={isOn(h) ? 'page' : undefined}
                className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium transition ${isOn(h) ? 'bg-white/15 text-white' : 'text-white/75 hover:bg-white/10 hover:text-white'}`}>
                <Icon>{icon}</Icon>{l}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href={wa} target="_blank" rel="noopener noreferrer" className="hidden rounded-xl bg-lime px-4 py-2.5 text-sm font-semibold text-ink transition hover:-translate-y-0.5 active:scale-[.97] sm:inline-flex">Hire me</a>
            <button type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}
              className="rounded-xl border border-white/20 bg-white/10 p-2.5 text-white lg:hidden">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">{open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}</svg>
            </button>
          </div>
        </div>

        {open && (
          <nav className="border-t border-white/15 p-3 lg:hidden" aria-label="Mobile">
            {links.map(([h, l, icon]) => (
              <Link key={h} href={h} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-white ${isOn(h) ? 'bg-white/15' : 'hover:bg-white/10'}`}><Icon>{icon}</Icon>{l}</Link>
            ))}
            <a href={wa} target="_blank" rel="noopener noreferrer" className="mt-2 flex w-full items-center justify-center rounded-xl bg-lime px-4 py-3 text-sm font-semibold text-ink">Hire me on WhatsApp</a>
          </nav>
        )}
      </div>
    </header>
  )
}
