import { supabase } from '@/lib/supabase'
import { PageHead, ReviewCard } from '../Cards'

export const revalidate = 30
export const metadata = { title: 'Reviews', description: 'Ratings and reviews from real clients of Paa Asane Technologies.' }

export default async function Reviews() {
  const { data: reviews } = await supabase.from('reviews').select('*').order('created_at', { ascending: false })
  const n = reviews?.length || 0
  const avg = n ? (reviews.reduce((a, r) => a + r.rating, 0) / n).toFixed(1) : null
  return (
    <>
      <PageHead label="Reviews" title="What clients say" text="Real ratings from people I have worked with." />
      <section className="mx-auto mt-10 max-w-6xl px-5">
        {n ? (
          <>
            <div className="card mb-6 flex items-center gap-6 md:w-fit">
              <p className="font-display text-5xl font-semibold">{avg}</p>
              <div><p style={{ color: '#526600' }}>{'★'.repeat(Math.round(avg))}{'☆'.repeat(5 - Math.round(avg))}</p><p className="text-sm text-muted">{n} review{n > 1 ? 's' : ''}</p></div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{reviews.map((r) => <ReviewCard key={r.id} r={r} />)}</div>
          </>
        ) : <p className="text-muted">Reviews from my first clients will show here.</p>}
      </section>
    </>
  )
}
