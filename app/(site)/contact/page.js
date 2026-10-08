import { supabase, waLink } from '@/lib/supabase'
import { PageHead } from '../Cards'
import ContactForm from './ContactForm'

export const revalidate = 30
export const metadata = { title: 'Contact', description: 'Contact Paa Asane Technologies on WhatsApp or send a message for Windows, laptop repair and website help in Ghana.' }

export default async function Contact() {
  const { data: s } = await supabase.from('site_settings').select('*').eq('id', 1).single()
  return (
    <>
      <PageHead label="Contact" title="Let's talk" text="Reach me on WhatsApp for the fastest reply, or send a message here." />
      <section className="mx-auto mt-10 grid max-w-6xl gap-6 px-5 md:grid-cols-2">
        <div className="card text-white" style={{ background: '#0F3D2A' }}>
          <p className="label text-white/60">WhatsApp</p>
          <p className="text-2xl font-semibold">{s?.phone}</p>
          <a href={waLink(s?.phone, 'Hello, I need help with...')} className="mt-4 inline-flex rounded-lg bg-lime px-5 py-3 text-sm font-semibold text-ink">Chat on WhatsApp</a>
          <p className="label mt-8 text-white/60">Email</p>
          <a href={`mailto:${s?.email}`} className="font-semibold">{s?.email}</a>
        </div>
        <ContactForm />
      </section>
    </>
  )
}
