import Link from 'next/link'
import { supabase, waLink } from '@/lib/supabase'
import { ServiceCards, ProjectCard, ReviewCard } from './Cards'
import { services } from '@/lib/services'
import { harambee } from '@/lib/featured'

export const revalidate = 30

const Head = ({ n, t, href }) => (
  <div className="flex items-end justify-between gap-4">
    <div><p className="label">{n}</p><h2 className="text-3xl font-semibold md:text-4xl">{t}</h2></div>
    <Link href={href} className="text-sm font-semibold text-brand">View all →</Link>
  </div>
)

export default async function Home() {
  const [{ data: s }, { data: projects }, { data: reviews }] = await Promise.all([
    supabase.from('site_settings').select('*').eq('id', 1).single(),
    supabase.from('projects').select('*').order('created_at', { ascending: false }).limit(3),
    supabase.from('reviews').select('*').order('created_at', { ascending: false })
  ])
  const avg = reviews?.length ? (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1) : null
  return (
    <>
      <section className="relative overflow-hidden rounded-b-[2.5rem] text-white"
        style={{ background: 'radial-gradient(900px 480px at 88% 8%, rgba(200,241,53,.2), transparent 60%), radial-gradient(700px 480px at 0% 100%, rgba(27,90,63,.85), transparent 60%), linear-gradient(160deg, #0F3D2A, #07231A)' }}>
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-36 md:grid-cols-[1.15fr_1fr] md:pb-28 md:pt-44">
          <div>
            <h1 className="hero-in text-4xl font-semibold leading-[1.08] sm:text-5xl md:text-6xl">Full-stack web developer and IT systems specialist</h1>
            <p className="hero-in d1 mt-6 max-w-xl text-lg text-white/75">{s?.hero_subheading || 'I build websites and web apps, and keep Windows laptops and office systems running for businesses and individuals across Ghana.'}</p>
            <div className="hero-in d2 mt-8 flex flex-wrap gap-3">
              <a href={waLink(s?.phone, 'Hello, I would like to start a project.')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-xl bg-lime px-6 py-3.5 text-sm font-semibold text-ink transition hover:-translate-y-0.5 active:scale-[.97]">Start a project</a>
              <Link href="/projects" className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-semibold backdrop-blur-md transition hover:bg-white/15 active:scale-[.97]">See my work</Link>
            </div>
            <ul className="hero-in d3 mt-10 flex flex-wrap gap-2" aria-label="Technologies">
              {['React', 'Next.js', 'Laravel', 'Python', 'Tailwind CSS'].map((t) => <li key={t} className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/80">{t}</li>)}
            </ul>
            {avg && <p className="hero-in d3 mt-5 text-sm text-white/70"><span className="font-semibold text-lime">{avg} out of 5</span> from {reviews.length} client review{reviews.length > 1 ? 's' : ''}</p>}
          </div>

          <div className="hero-in d2">
            {s?.about_photo_url ? (
              <div className="relative mx-auto max-w-xs md:max-w-sm">
                <img src={s.about_photo_url} alt={s?.about_name || 'Portrait'} className="aspect-[4/5] w-full rounded-2xl border border-white/20 object-cover" />
                <div className="absolute -bottom-4 left-4 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 shadow-lg backdrop-blur-md"><p className="font-semibold">{s?.about_name || s?.business_name}</p><p className="text-xs text-white/70">{s?.about_role || 'Full-stack web developer and IT specialist'}</p></div>
              </div>
            ) : (
              <div className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-lg backdrop-blur-md">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-display text-xl font-semibold">Your tech, sorted</p>
                  <span className="text-xs text-white/60">{services.length} services</span>
                </div>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/15"><div className="bar-fill h-full rounded-full bg-lime" /></div>
                <ul className="mt-5 space-y-2.5">
                  {['Windows 11 installed', 'Office set up and activated', 'Drivers updated, laptop running fast', 'Website live on your own domain'].map((t, i) => (
                    <li key={t} className="check-row flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm" style={{ animationDelay: `${0.9 + i * 0.8}s` }}>
                      <span className="check-dot flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-lime text-ink">
                        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7" style={{ animationDelay: `${0.9 + i * 0.8}s` }} /></svg>
                      </span>{t}
                    </li>
                  ))}
                </ul>
                <a href={waLink(s?.phone, 'Hello, I need help with...')} target="_blank" rel="noopener noreferrer" className="check-row mt-5 inline-flex w-full items-center justify-center rounded-xl bg-white/15 px-4 py-3 text-sm font-semibold transition hover:bg-white/20" style={{ animationDelay: '4.2s' }}>Get yours done on WhatsApp</a>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="marquee mt-16 border-y border-white/60 py-4">
        <div className="marquee-track">
          {[...services, ...services].map((v, i) => <span key={i} className="tag whitespace-nowrap px-4 py-2 text-sm">{v.title}</span>)}
        </div>
      </div>

      <section className="mx-auto mt-24 max-w-6xl px-5">
        <Head n="01 — Services" t="What I do" href="/services" />
        <div className="mt-8"><ServiceCards phone={s?.phone} limit={6} /></div>
      </section>

      <section className="mx-auto mt-24 max-w-6xl px-5">
        <Head n="02 — Selected work" t="Recent projects" href="/projects" />
        <div className="mt-8 grid gap-6 md:grid-cols-3">{[harambee, ...(projects || [])].slice(0, 3).map((p) => <ProjectCard key={p.id} p={p} />)}</div>
      </section>

      <section className="mx-auto mt-24 max-w-6xl px-5">
        <Head n="03 — Client reviews" t="What clients say" href="/reviews" />
        {reviews?.length ? <div className="mt-8 grid gap-6 md:grid-cols-3">{reviews.slice(0, 3).map((r) => <ReviewCard key={r.id} r={r} />)}</div> : <p className="mt-8 text-muted">Reviews from my first clients will show here.</p>}
      </section>

      <section className="mx-auto mt-24 max-w-6xl px-5">
        <div className="card reveal bg-brand text-white" style={{ background: '#0F3D2A' }}>
          <h2 className="text-3xl font-semibold">Need your laptop or website sorted?</h2>
          <p className="mt-2 text-white/70">Message me on WhatsApp and let's get it done.</p>
          <a href={waLink(s?.phone, 'Hello, I need help with...')} className="mt-5 inline-flex rounded-lg bg-lime px-5 py-3 text-sm font-semibold text-ink">Chat on WhatsApp</a>
        </div>
      </section>
    </>
  )
}
