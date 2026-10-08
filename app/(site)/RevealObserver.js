'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// Fades elements with the "reveal" class in as they scroll into view (works in every browser).
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
        setTimeout(() => el.classList.remove('reveal', 'in'), 1000) // hand control back so hover effects work
      })
    }, { threshold: 0.12 })
    const t = setTimeout(() => document.querySelectorAll('.reveal:not(.in)').forEach((el, i) => { el.style.transitionDelay = `${(i % 3) * 90}ms`; io.observe(el) }), 30)
    return () => { clearTimeout(t); io.disconnect() }
  }, [path])
  return null
}
