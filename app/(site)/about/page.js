import Link from 'next/link'
import { supabase, waLink } from '@/lib/supabase'
import { PageHead } from '../Cards'

export const revalidate = 30
export const metadata = { title: 'About', description: 'Meet the person behind Paa Asane Technologies: a tech specialist and web engineer in Ghana helping with Windows, laptops and websites.' }

const principles = [
  ['Clear communication', 'You always know what is being done, how long it will take and what it will cost.'],
  ['Quality you can trust', 'Every job is tested before I hand it back, so it works the way it should.'],
  ['Fair and honest service', 'Straight answers and fair prices. If I cannot fix something, I will tell you.']
]

const defaultBio = `I run Paa Asane Technologies, a tech service business in Ghana. I help individuals and businesses with Windows and Microsoft Office setup, laptop formatting and repair, troubleshooting, and the installation of everyday software.

I also design and build modern, responsive websites and web apps. Whether you need a stubborn laptop sorted or a professional online presence, I focus on doing the job properly and keeping you informed along the way.`

export default async function About() {
  const [{ data: s }, { data: reviews }, { count }] = await Promise.all([
    supabase.from('site_settings').select('*').eq('id', 1).single(),
    supabase.from('reviews').select('rating'),
    supabase.from('projects').select('*', { count: 'exact', head: true })
  ])
  const name = s?.about_name || s?.business_name || 'Paa Asane Technologies'
  const role = s?.about_role || 'Tech specialist & web engineer'
  const bio = (s?.about_bio || defaultBio).split(/\n\s*\n/)
  const skills = (s?.about_skills || 'Windows & Office, Laptop repair, Troubleshooting, Web engineering').split(',').map((t) => t.trim()).filter(Boolean)
  const initials = name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
  const n = reviews?.length || 0
  const avg = n ? (reviews.reduce((a, r) => a + r.rating, 0) / n).toFixed(1) : null
  const stats = [[(count || 0) + 1, 'Projects completed'], ...(avg ? [[`${avg} ★`, `Average rating (${n})`]] : [])]

  return (
    <>
      <PageHead label="About" title="About me" text="Who I am and how I work." />

      <section className="mx-auto mt-10 grid max-w-6xl items-start gap-12 px-5 md:grid-cols-[340px_1fr]">
        <div className="reveal relative">
          <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-brand">
            {s?.about_photo_url
              ? <img src={s.about_photo_url} alt={name} className="h-full w-full object-cover" />
              : <div className="flex h-full items-center justify-center font-display text-8xl font-semibold text-white">{initials}</div>}
          </div>
          <div className="card absolute -bottom-4 left-4 px-4 py-2 text-sm font-semibold">Based in {s?.about_location || 'Ghana'}</div>
        </div>

        <div className="reveal">
          <p className="label">{role}</p>
          <h2 className="text-4xl font-semibold md:text-5xl">{name}</h2>
          <div className="mt-6 space-y-4 text-lg text-muted">{bio.map((t, i) => <p key={i}>{t}</p>)}</div>
          <div className="mt-6 flex flex-wrap gap-2">{skills.map((t) => <span key={t} className="tag">{t}</span>)}</div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="btn">Contact me</Link>
            <a href={waLink(s?.phone, 'Hello, I would like to work with you.')} target="_blank" rel="noopener noreferrer" className="btn-ghost">Chat on WhatsApp</a>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-20 grid max-w-6xl gap-5 px-5 sm:[grid-template-columns:repeat(var(--n),minmax(0,1fr))]" style={{ '--n': stats.length }}>
        {stats.map(([v, l]) => (
          <div key={l} className="card lift reveal"><p className="font-display text-4xl font-semibold">{v}</p><p className="mt-1 text-sm text-muted">{l}</p></div>
        ))}
      </section>

      <section className="mx-auto mt-20 max-w-6xl px-5">
        <p className="label">How I work</p>
        <h2 className="text-3xl font-semibold md:text-4xl">What you can expect</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {principles.map(([t, d], i) => (
            <div key={t} className="card lift reveal">
              <span className="text-sm text-muted">0{i + 1}</span>
              <h3 className="mt-3 text-xl font-semibold">{t}</h3>
              <p className="mt-2 text-sm text-muted">{d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
