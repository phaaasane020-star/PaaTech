'use client'
import { useEffect, useRef, useState } from 'react'

// Counts a number up when it scrolls into view ("4.9 ★" keeps its suffix).
export default function CountUp({ value }) {
  const ref = useRef(null)
  const m = String(value).match(/^([\d.]+)(.*)$/)
  const target = m ? parseFloat(m[1]) : 0
  const dec = m && m[1].includes('.') ? m[1].split('.')[1].length : 0
  const [n, setN] = useState(target)

  useEffect(() => {
    if (!m || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setN(0)
    const io = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      const tick = (t) => {
        const p = Math.min((t - t0) / 1400, 1)
        setN(target * (1 - Math.pow(1 - p, 3)))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.4 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  return <span ref={ref}>{m ? n.toFixed(dec) + m[2] : value}</span>
}
