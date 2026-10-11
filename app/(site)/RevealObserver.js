'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const SEL = 'main h1, main h2, main h3, main p, main li, main .card, main .tag, main img, main figure, main .btn, main .btn-ghost, footer .grid > div, .reveal'
const VARIANTS = ['reveal-l', 'reveal-zoom', 'reveal-r']

// Fades/slides almost everything in as it scrolls into view, with variants and a stagger inside each group.
export default function RevealObserver() {
  const path = usePathname()
  useEffect(() => {
    document.documentElement.classList.add('rv-ready')
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return
        const el = en.target
        el.classList.add('in')
        io.unobserve(el)
        setTimeout(() => { el.classList.remove('reveal', 'in', ...VARIANTS); el.style.transitionDelay = '' }, 1300)
      })
    }, { threshold: 0.1 })

    const t = setTimeout(() => {
      document.querySelectorAll(SEL).forEach((el) => {
        const r = el.getBoundingClientRect()
        const skip = el.closest('.hero-in, .marquee, .phone, .laptop, .no-reveal, header') || (r.top < window.innerHeight * 0.92 && r.bottom > 0)
        if (skip) { el.classList.remove('reveal'); return }
        const idx = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0
        if (!VARIANTS.some((v) => el.classList.contains(v))) {
          if (el.matches('img, figure')) el.classList.add('reveal-zoom')
          else if (el.matches('.card, li')) el.classList.add(VARIANTS[idx % 3])
        }
        el.classList.add('reveal')
        el.style.transitionDelay = `${(idx % 5) * 90}ms`
        io.observe(el)
      })
    }, 30)
    return () => { clearTimeout(t); io.disconnect() }
  }, [path])
  return null
}
