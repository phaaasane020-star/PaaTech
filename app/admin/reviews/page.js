'use client'
import { useEffect, useState } from 'react'
import { supabase, stars } from '@/lib/supabase'

export default function Reviews() {
  const [list, setList] = useState([])
  const load = () => supabase.from('reviews').select('*').order('created_at', { ascending: false }).then(({ data }) => setList(data || []))
  useEffect(() => { load() }, [])
  const setStatus = async (id, status) => { await supabase.from('reviews').update({ status }).eq('id', id); load() }
  const remove = async (id) => { if (confirm('Delete this review?')) { await supabase.from('reviews').delete().eq('id', id); load() } }

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-semibold">Reviews</h1>
      <p className="mt-2 text-sm text-muted">New reviews wait here until you approve them. Only approved reviews show on your website.</p>
      <div className="mt-6 space-y-3">
        {list.map((r) => (
          <div key={r.id} className="card">
            <div className="flex items-start justify-between gap-3">
              <div><p className="font-semibold">{r.client_name} <span className="text-[#526600]">{stars(r.rating)}</span></p><p className="text-xs text-muted">{r.service_name} · {r.status}</p></div>
              <div className="flex gap-2">
                {r.status !== 'approved' && <button className="btn" onClick={() => setStatus(r.id, 'approved')}>Approve</button>}
                {r.status !== 'hidden' && <button className="btn-ghost" onClick={() => setStatus(r.id, 'hidden')}>Hide</button>}
                <button className="btn-ghost" onClick={() => remove(r.id)}>Delete</button>
              </div>
            </div>
            <p className="mt-3 text-sm">{r.comment}</p>
          </div>
        ))}
        {!list.length && <p className="text-muted">No reviews yet.</p>}
      </div>
    </div>
  )
}
