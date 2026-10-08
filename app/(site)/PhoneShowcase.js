'use client'
import { useEffect, useState } from 'react'

// A phone frame that cycles through screenshots, slowly panning across each one.
export default function Phone({ shots, start = 0, className = '' }) {
  const [i, setI] = useState(start % shots.length)
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % shots.length), 4200)
    return () => clearInterval(t)
  }, [shots.length])
  return (
    <figure className={`phone ${className}`}>
      <div className="phone-screen">
        {shots.map((s, k) => <img key={s.src} src={s.src} alt={s.label || 'Project screenshot'} className={`pan ${k === i ? 'on' : ''}`} />)}
        <span className="phone-notch" />
      </div>
      <figcaption className="mt-3 text-center text-xs text-muted">{shots[i].label || `${i + 1} / ${shots.length}`}</figcaption>
    </figure>
  )
}

// A full laptop (screen, bezel, hinge and keyboard base) that cycles through screenshots.
export function Laptop({ shots, start = 0, className = '' }) {
  const [i, setI] = useState(start % shots.length)
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % shots.length), 4200)
    return () => clearInterval(t)
  }, [shots.length])
  return (
    <figure className={`laptop ${className}`}>
      <div className="laptop-lid">
        <div className="laptop-screen">
          {shots.map((s, k) => <img key={s.src} src={s.src} alt={s.label} className={`shot ${k === i ? 'on' : ''}`} />)}
        </div>
      </div>
      <div className="laptop-base" />
    </figure>
  )
}
