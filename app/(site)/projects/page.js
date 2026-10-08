import { supabase } from '@/lib/supabase'
import { PageHead, ProjectShowcase } from '../Cards'
import { harambee } from '@/lib/featured'

export const revalidate = 30
export const metadata = { title: 'My Work', description: 'Websites and tech projects completed for clients, with screenshots and details.' }

export default async function Projects() {
  const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false })
  const all = [harambee, ...(data || [])]
  return (
    <>
      <PageHead label="My work" title="Selected work" text="Websites, setups and fixes I have completed for clients." />
      <section className="mx-auto mt-10 max-w-6xl space-y-8 px-5">
        {all.map((p, i) => <ProjectShowcase key={p.id} p={p} flip={i % 2 === 1} />)}
      </section>
    </>
  )
}
