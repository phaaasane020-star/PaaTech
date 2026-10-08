import { supabase, waLink } from '@/lib/supabase'
import { PageHead, ServiceCards } from '../Cards'

export const revalidate = 30
export const metadata = { title: 'Services', description: 'Windows installation, upgrade and activation, Microsoft Office setup, laptop formatting, virus removal, driver installation, boot error fixing and custom web engineering.' }

export default async function Services() {
  const { data: s } = await supabase.from('site_settings').select('phone').eq('id', 1).single()
  return (
    <>
      <PageHead label="Services" title="What I do" text="From Windows and Office to repairs and custom websites." />
      <section className="mx-auto mt-10 max-w-6xl px-5">
        <ServiceCards phone={s?.phone} />
        <p className="mt-6 text-sm text-muted">Something else not listed? <a href={waLink(s?.phone, 'Hello, I have a different tech problem...')} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand">Message me on WhatsApp</a>.</p>
      </section>
    </>
  )
}
