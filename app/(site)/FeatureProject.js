import Phone from './PhoneShowcase'

// Turns a database row into the shape the showcase card needs.
export const fromDb = (p) => ({
  title: p.title,
  category: p.category,
  summary: p.summary,
  features: (p.solution || '').split('\n').map((t) => t.trim()).filter(Boolean),
  tools: p.tools || [],
  shots: (p.gallery?.length ? p.gallery : p.cover_url ? [p.cover_url] : []).map((src) => ({ src })),
  live_url: p.live_url,
  client: p.client_name,
  date: p.completed_on
})

// The same "phone + details" showcase used for every project.
export default function FeatureProject({ p, flip = false, featured = false }) {
  const n = p.shots.length
  const meta = [p.client && `Client: ${p.client}`, p.date && new Date(p.date).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })].filter(Boolean).join(' · ')
  return (
    <div className={`card reveal grid items-center gap-10 overflow-hidden ${n ? (flip ? 'md:grid-cols-[1.1fr_1fr]' : 'md:grid-cols-[1fr_1.1fr]') : ''}`}>
      <div>
        <span className="tag">{featured ? 'Featured · ' : ''}{p.category}</span>
        <h2 className="mt-4 text-3xl font-semibold md:text-4xl">{p.title}</h2>
        {meta && <p className="mt-2 text-xs text-muted">{meta}</p>}
        {p.summary && <p className="mt-3 whitespace-pre-line text-muted">{p.summary}</p>}
        {p.features.length > 0 && (
          <ul className="mt-5 space-y-2 text-sm">
            {p.features.map((t) => <li key={t} className="flex gap-2"><span className="text-brand">✓</span>{t}</li>)}
          </ul>
        )}
        {p.tools.length > 0 && <div className="mt-5 flex flex-wrap gap-2">{p.tools.map((t) => <span key={t} className="tag">{t}</span>)}</div>}
        {p.live_url && <a href={p.live_url} target="_blank" rel="noopener noreferrer" className="btn mt-6">Visit live site →</a>}
      </div>
      {n > 0 && (
        <div className={`flex items-start justify-center gap-5 py-4 ${flip ? 'md:order-first' : ''}`}>
          <Phone shots={p.shots} start={0} />
          {n > 1 && <Phone shots={p.shots} start={Math.floor(n / 2)} className="mt-12 hidden sm:block" />}
        </div>
      )}
    </div>
  )
}
