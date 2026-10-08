'use client'
import { useEffect, useState } from 'react'
import { supabase, waLink } from '@/lib/supabase'

export default function Links() {
  const [list, setList] = useState([])
  const [f, setF] = useState({ service_name: '', client_name: '', client_phone: '' })
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const url = (c) => `${window.location.origin}/rate/${c}`

  const load = () => supabase.from('rating_links').select('*').order('created_at', { ascending: false }).then(({ data }) => setList(data || []))
  useEffect(() => { load() }, [])

  async function create(e) {
    e.preventDefault()
    const code = crypto.randomUUID().replace(/-/g, '').slice(0, 14)
    const expires_at = new Date(Date.now() + 30 * 864e5).toISOString()
    const { error } = await supabase.from('rating_links').insert({ ...f, code, expires_at })
    if (error) return alert(error.message)
    setF({ service_name: '', client_name: '', client_phone: '' }); load()
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-semibold">Rating links</h1>
      <p className="mt-2 text-sm text-muted">Create a link after finishing a job and send it to your client. Each link works once and expires in 30 days.</p>
      <form onSubmit={create} className="card mt-6 grid gap-4 md:grid-cols-3">
        <div><label className="label">Service / project</label><input className="input" value={f.service_name} onChange={set('service_name')} required placeholder="Windows 11 installation" /></div>
        <div><label className="label">Client name</label><input className="input" value={f.client_name} onChange={set('client_name')} /></div>
        <div><label className="label">Client phone</label><input className="input" value={f.client_phone} onChange={set('client_phone')} placeholder="024..." /></div>
        <button className="btn md:col-span-3">Generate link</button>
      </form>
      <div className="mt-8 space-y-3">
        {list.map((l) => (
          <div key={l.id} className="card flex flex-wrap items-center gap-3 p-4">
            <div className="flex-1"><p className="font-semibold">{l.service_name}</p><p className="text-xs text-muted">{l.client_name} · {l.status}</p></div>
            {l.status === 'pending' && <>
              <button className="btn-ghost" onClick={() => { navigator.clipboard.writeText(url(l.code)); alert('Link copied') }}>Copy</button>
              <a className="btn" target="_blank" rel="noopener noreferrer" href={waLink(l.client_phone, `Hi ${l.client_name || ''}, thanks for choosing Paa Asane Technologies! Please rate my work here: ${url(l.code)}`)}>Send via WhatsApp</a>
            </>}
          </div>
        ))}
      </div>
    </div>
  )
}
