'use client'
import { useEffect, useRef } from 'react'

export default function MotionFX() {
  const bar = useRef(null)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const root = document.documentElement
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const max = root.scrollHeight - window.innerHeight
        if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`
        root.style.setProperty('--sy', String(window.scrollY))
      })
    }
    const onMove = (e) => {
      if (e.pointerType === 'touch') return
      const el = e.target.closest && e.target.closest('.lift')
      if (!el) return
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width
      const y = (e.clientY - r.top) / r.height
      el.style.setProperty('--mx', `${x * 100}%`)
      el.style.setProperty('--my', `${y * 100}%`)
      el.style.setProperty('--rx', `${(0.5 - y) * 6}deg`)
      el.style.setProperty('--ry', `${(x - 0.5) * 8}deg`)
    }
    const onOut = (e) => {
      const el = e.target.closest && e.target.closest('.lift')
      if (el && !el.contains(e.relatedTarget)) { el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg') }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerout', onOut)
    onScroll()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerout', onOut)
    }
  }, [])
  return <div ref={bar} className="scroll-bar" aria-hidden="true" />
}
