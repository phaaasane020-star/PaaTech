import Link from 'next/link'
import HeroRobot from './HeroRobot'
import { supabase, waLink } from '@/lib/supabase'
import { ServiceCards, ProjectCard } from './Cards'
import ReviewCarousel from './ReviewCarousel'
import { services } from '@/lib/services'
import { harambee } from '@/lib/featured'

export const revalidate = 30

const tech = ['React', 'Next.js', 'Laravel', 'Python', 'Tailwind CSS', 'Supabase', 'Windows 11', 'Microsoft Office', 'Troubleshooting', 'WhatsApp support']

// Section heading inside a panel: small numbered badge, title, and a "View all" link
const Head = ({ n, t, href }) => (
  <div className="flex items-end justify-between gap-4">
    <div>
      <p className="inline-flex items-center rounded-full border border-line bg-paper px-3 py-1 text-xs font-semibold tracking-wide text-muted">{n}</p>
      <h2 className="mt-4 text-3xl font-semibold md:text-4xl">{t}</h2>
    </div>
    <Link href={href} className="shrink-0 whitespace-nowrap text-sm font-semibold text-brand">View all →</Link>
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
      <section className="relative isolate overflow-hidden bg-ink text-white md:min-h-[100svh]">
        {/* 3D robot (model-viewer, transparent background). Top block on phones; right half on desktop so the words sit on the left */}
        <div className="hero-in relative h-[50svh] min-h-[340px] w-full md:absolute md:inset-y-0 md:right-0 md:h-auto md:w-[52%] md:pt-20">
          <HeroRobot className="h-full w-full" />
        </div>

        <div className="pointer-events-none relative z-10 mx-auto flex max-w-6xl px-5 pb-20 md:min-h-[100svh] md:items-center md:pb-16 md:pt-28">
          <div className="pointer-events-auto -mt-8 w-full md:mt-0 md:max-w-[34rem]">
            <p className="hero-in text-xs font-semibold uppercase tracking-[.18em] text-white/50">Web developer · IT support · Ghana</p>

            <h1 className="hero-in d1 mt-6 text-[2.35rem] font-bold leading-[1.04] min-[400px]:text-[2.6rem] sm:text-6xl lg:text-[4.25rem]">
              Full-Stack Web<br />Development &amp;<br />
              <span className="text-white/45">IT Solutions</span>
            </h1>

            <p className="hero-in d2 mt-6 max-w-md text-lg leading-relaxed text-white/70">{s?.hero_subheading || 'I build websites and web apps, and keep Windows laptops and office systems running for businesses and individuals across Ghana.'}</p>

            <div className="hero-in d3 mt-9 flex flex-wrap gap-3 max-sm:[&>*]:flex-1 max-sm:[&>*]:justify-center">
              <a href={waLink(s?.phone, 'Hello, I would like to start a project.')} target="_blank" rel="noopener noreferrer"
                className="shine group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-lav active:scale-[.97]">
                Start a project
                <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </a>
              <Link href="/projects" className="inline-flex items-center rounded-xl border border-white/20 bg-black/40 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10 active:scale-[.97]">View my work</Link>
            </div>

            <dl className="hero-in d4 mt-10 grid max-w-md grid-cols-3 sm:mt-12 divide-x divide-white/10 border-t border-white/10 pt-6">
              {[
                avg ? [`${avg}/5`, `${reviews.length} client review${reviews.length > 1 ? 's' : ''}`] : ['Web + IT', 'One reliable plug'],
                [`${services.length}+`, 'Services offered'],
                ['Ghana', 'Nationwide support']
              ].map(([v, l], i) => (
                <div key={l} className={`min-w-0 ${i ? 'pl-3 sm:pl-5' : 'pr-3 sm:pr-4'}`}>
                  <dt className="sr-only">{l}</dt>
                  <dd className="font-display text-xl font-semibold sm:text-2xl">{v}</dd>
                  <dd className="mt-1 text-xs text-white/55">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

      </section>

      <div className="marquee mt-16 border-y border-line py-4">
        <div className="marquee-track">
          {[...services, ...services].map((v, i) => <span key={i} className="tag whitespace-nowrap px-4 py-2 text-sm">{v.title}</span>)}
        </div>
      </div>

      <div className="marquee border-b border-line py-4">
        <div className="marquee-track rev">
          {[...tech, ...tech].map((t, i) => <span key={i} className="tag whitespace-nowrap px-4 py-2 text-sm">{t}</span>)}
        </div>
      </div>

      <section id="services" className="panel-wrap mt-10 scroll-mt-24 sm:mt-14">
        <div className="panel">
        <Head n="01 — Selected services" t="What I do" href="/services" />
        <div className="mt-8"><ServiceCards phone={s?.phone} limit={6} /></div>
        </div>
      </section>

      <section className="panel-wrap">
        <div className="panel">
        <Head n="02 — Selected work" t="Recent projects" href="/projects" />
        <div className="mt-8 grid gap-6 md:grid-cols-3">{[harambee, ...(projects || [])].slice(0, 3).map((p) => <ProjectCard key={p.id} p={p} />)}</div>
        </div>
      </section>

      <section className="panel-wrap">
        <div className="panel">
        <Head n="03 — Client reviews" t="What clients say" href="/reviews" />
        {reviews?.length ? <div className="mt-10"><ReviewCarousel reviews={reviews.slice(0, 10)} /></div> : <p className="mt-8 text-muted">Reviews from my first clients will show here.</p>}
        </div>
      </section>

      <section className="panel-wrap">
        <div className="panel reveal border-ink bg-ink text-white">
          <h2 className="text-3xl font-semibold">Need your laptop or website sorted?</h2>
          <p className="mt-2 text-white/70">Message me on WhatsApp and let's get it done.</p>
          <a href={waLink(s?.phone, 'Hello, I need help with...')} className="mt-5 inline-flex rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-white">Chat on WhatsApp</a>
        </div>
      </section>
    </>
  )
}
