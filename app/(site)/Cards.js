import { I, services } from '@/lib/services'
import { waLink, stars } from '@/lib/supabase'
import Phone, { Laptop } from './PhoneShowcase'

export function PageHead({ label, title, text }) {
  return (
    <div className="hero-in mx-auto max-w-6xl px-5 pt-32 md:pt-40">
      <p className="label">{label}</p>
      <h1 className="text-4xl font-semibold md:text-6xl">{title}</h1>
      {text && <p className="mt-4 max-w-xl text-lg text-muted">{text}</p>}
    </div>
  )
}

export function ServiceCards({ phone, limit }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {services.slice(0, limit || services.length).map((v, i) => (
        <article key={v.title} className={`card lift reveal flex flex-col ${v.featured ? 'bg-brand text-white md:col-span-2 lg:col-span-3' : ''}`}>
          <div className="flex items-center justify-between">
            <span className={`flex h-11 w-11 items-center justify-center rounded-lg ${v.featured ? 'bg-lime text-ink' : 'bg-brand text-white'}`}>
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{I[v.icon]}</svg>
            </span>
            <span className={`text-sm ${v.featured ? 'text-white/60' : 'text-muted'}`}>{v.featured ? 'Featured' : String(i + 1).padStart(2, '0')}</span>
          </div>
          <h3 className="mt-5 text-xl font-semibold">{v.title}</h3>
          <p className={`mt-2 flex-1 text-sm md:max-w-2xl ${v.featured ? 'text-white/75' : 'text-muted'}`}>{v.text}</p>
          <div className="mt-4 flex flex-wrap gap-2">{v.tags.map((t) => <span key={t} className={`tag ${v.featured ? 'border-white/25 text-white/80' : ''}`}>{t}</span>)}</div>
          <a href={waLink(phone, `Hello, I need help with: ${v.title}`)} target="_blank" rel="noopener noreferrer" className={`mt-5 text-sm font-semibold ${v.featured ? 'text-lime' : 'text-brand'}`}>{v.featured ? 'Discuss your project →' : 'Request this service →'}</a>
        </article>
      ))}
    </div>
  )
}

export const ProjectCard = ({ p }) => (
  <article className="card lift reveal overflow-hidden p-0">
    {p.cover_url && <img src={p.cover_url} alt={p.title} loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover" />}
    <div className="p-5">
      <span className="tag">{p.category}</span>
      <h3 className="mt-3 text-xl font-semibold">{p.title}</h3>
      <p className="mt-2 text-sm text-muted">{p.summary}</p>
      {/^https?:\/\//.test(p.live_url || '') && <a href={p.live_url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm font-semibold text-brand">Visit live site →</a>}
    </div>
  </article>
)

export const ReviewCard = ({ r }) => (
  <div className="card lift reveal">
    <p style={{ color: '#526600' }}>{stars(r.rating)}</p>
    <p className="mt-3 text-sm">{r.comment}</p>
    <p className="mt-4 text-sm font-semibold">{r.client_name}</p>
    <p className="text-xs text-muted">{r.service_name}</p>
  </div>
)

export function ProjectShowcase({ p, flip }) {
  const shots = (p.gallery?.length ? p.gallery : p.cover_url ? [p.cover_url] : []).map((g) => (typeof g === 'string' ? { src: g, label: '' } : g))
  return (
    <div className={`card reveal grid items-center gap-10 overflow-hidden ${shots.length ? 'md:grid-cols-[1fr_1.1fr]' : ''}`}>
      <div className={flip ? 'md:order-2' : ''}>
        <span className="tag">{p.category}</span>
        <h2 className="mt-4 text-3xl font-semibold md:text-4xl">{p.title}</h2>
        {p.summary && <p className="mt-3 whitespace-pre-line text-muted">{p.summary}</p>}
        {p.features?.length > 0 && (
          <ul className="mt-5 space-y-2 text-sm">
            {p.features.map((t) => <li key={t} className="flex gap-2"><span className="text-brand">✓</span>{t}</li>)}
          </ul>
        )}
        {p.tools?.length > 0 && <div className="mt-5 flex flex-wrap gap-2">{p.tools.map((t) => <span key={t} className="tag">{t}</span>)}</div>}
        {/^https?:\/\//.test(p.live_url || '') && <a href={p.live_url} target="_blank" rel="noopener noreferrer" className="btn mt-6">Visit live site →</a>}
      </div>
      {shots.length > 0 && (p.device === 'desktop' ? (
        <div className="flex flex-col py-4">
          <Laptop shots={shots} start={0} className={shots.length > 1 ? 'w-[82%] self-start' : 'w-[92%] self-center'} />
          {shots.length > 1 && <Laptop shots={shots} start={Math.floor(shots.length / 2)} className="-mt-[26%] hidden w-[82%] self-end sm:block" />}
        </div>
      ) : (
        <div className="flex items-start justify-center gap-5 py-4">
          <Phone shots={shots} start={0} />
          {shots.length > 1 && <Phone shots={shots} start={Math.floor(shots.length / 2)} className="mt-12 hidden sm:block" />}
        </div>
      ))}
    </div>
  )
}
