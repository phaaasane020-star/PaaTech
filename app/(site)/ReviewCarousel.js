'use client'
import { useEffect, useRef, useState } from 'react'

const GOLD = '#C49A3A'

// Testimonial carousel: autoplay with progress bar, arrows, dots, swipe, pause on hover.
export default function ReviewCarousel({ reviews }) {
  const [i, setI] = useState(0)
  const [dir, setDir] = useState('next')
  const [paused, setPaused] = useState(false)
  const touch = useRef(null)
  const n = reviews.length
  const go = (d) => { setDir(d > 0 ? 'next' : 'prev'); setI((x) => (x + d + n) % n) }

  useEffect(() => {
    if (n < 2 || paused) return
    const t = setTimeout(() => go(1), 6500)
    return () => clearTimeout(t)
  }, [i, paused, n])

  const r = reviews[i]
  return (
    <div className="mx-auto max-w-2xl"
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => { touch.current = e.touches[0].clientX }}
      onTouchEnd={(e) => { if (touch.current == null) return; const dx = e.changedTouches[0].clientX - touch.current; if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1); touch.current = null }}>
      <div className="relative">
        <div className="card t-card relative overflow-hidden px-6 py-10 text-center sm:px-16" aria-live="polite">
          <span className="t-bigquote" aria-hidden="true">“</span>
          <div key={i} className={`t-slide t-${dir}`}>
            <span className="t-quote-icon mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/40">
              <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" /><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" /></svg>
            </span>
            <div className="mt-5 flex justify-center gap-1" role="img" aria-label={`${r.rating} out of 5 stars`}>
              {[1, 2, 3, 4, 5].map((s) => (
                <svg key={s} viewBox="0 0 24 24" className="t-star" fill="currentColor" style={{ animationDelay: `${s * 90}ms`, color: s <= r.rating ? GOLD : '#E6E1D6' }}><path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 17.8 5.8 21.1 7 14.2 2 9.3l6.9-1z" /></svg>
              ))}
            </div>
            <blockquote className="mt-6 text-lg italic leading-relaxed text-ink sm:text-xl">“{r.comment || 'Great service, highly recommended!'}”</blockquote>
            <div className="mt-8 flex flex-col items-center">
              <span className="t-avatar flex h-16 w-16 items-center justify-center rounded-full font-display text-2xl font-semibold text-white">{(r.client_name || '?').trim().charAt(0).toUpperCase()}</span>
              <p className="mt-3 font-display text-lg font-semibold">{r.client_name}</p>
              {r.service_name && <p className="text-sm text-muted">{r.service_name}</p>}
            </div>
          </div>
          {n > 1 && <div key={`${i}-${paused}`} className="t-progress" style={{ animationPlayState: paused ? 'paused' : 'running' }} />}
        </div>
        {n > 1 && (
          <>
            <button type="button" className="t-arrow -left-3 sm:-left-6" onClick={() => go(-1)} aria-label="Previous review"><svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M15 5l-7 7 7 7" /></svg></button>
            <button type="button" className="t-arrow -right-3 sm:-right-6" onClick={() => go(1)} aria-label="Next review"><svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5l7 7-7 7" /></svg></button>
          </>
        )}
      </div>
      {n > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {reviews.map((_, k) => <button key={k} type="button" aria-label={`Show review ${k + 1}`} onClick={() => { setDir(k > i ? 'next' : 'prev'); setI(k) }} className={`t-dot ${k === i ? 'on' : ''}`} />)}
        </div>
      )}
    </div>
  )
}
