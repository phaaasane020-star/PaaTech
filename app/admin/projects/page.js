'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

const cats = ['Web Engineering', 'Windows & Software', 'Laptop Services', 'Others']
const empty = { title: '', category: cats[0], summary: '', features: '', client_name: '', completed_on: '', tools: '', live_url: '', device: 'phone', published: true }
const lines = (t) => t.split('\n').map((x) => x.trim()).filter(Boolean)

export default function Projects() {
  const [list, setList] = useState([])
  const [f, setF] = useState(empty)
  const [files, setFiles] = useState([])
  const [busy, setBusy] = useState(false)
  const set = (k) => (e) => setF({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })

  const load = () => supabase.from('projects').select('*').order('created_at', { ascending: false }).then(({ data }) => setList(data || []))
  useEffect(() => { load() }, [])

  async function save(e) {
    e.preventDefault()
    const form = e.target
    setBusy(true)
    const urls = []
    for (const file of files) {
      const path = `projects/${Date.now()}-${Math.random().toString(36).slice(2, 6)}-${file.name.replace(/\s+/g, '-')}`
      const { error } = await supabase.storage.from('media').upload(path, file)
      if (error) { setBusy(false); return alert('Image upload failed: ' + error.message) }
      urls.push(supabase.storage.from('media').getPublicUrl(path).data.publicUrl)
    }
    const { features, tools, ...rest } = f
    const slug = f.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '-' + Math.random().toString(36).slice(2, 6)
    const { error } = await supabase.from('projects').insert({
      ...rest, slug, cover_url: urls[0] || '', gallery: urls,
      completed_on: f.completed_on || null,
      features: lines(features),
      tools: tools.split(',').map((t) => t.trim()).filter(Boolean)
    })
    setBusy(false)
    if (error) return alert(error.message + (error.message.includes('column') ? '\n\nRun the SQL migrations in Supabase first.' : ''))
    setF(empty); setFiles([]); form.reset(); load()
  }

  const toggle = async (p) => { await supabase.from('projects').update({ published: !p.published }).eq('id', p.id); load() }
  const setDevice = async (p, device) => { await supabase.from('projects').update({ device }).eq('id', p.id); load() }
  const remove = async (p) => { if (confirm(`Delete "${p.title}"?`)) { await supabase.from('projects').delete().eq('id', p.id); load() } }

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-semibold">Projects</h1>
      <p className="mt-2 text-sm text-muted">Every project you add appears on the My Work page in the same style as Team Harambee: description, feature list, tags and phone screenshots.</p>
      <form onSubmit={save} className="card mt-6 grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2"><label className="label">Title</label><input className="input" value={f.title} onChange={set('title')} required /></div>
        <div><label className="label">Category</label><select className="input" value={f.category} onChange={set('category')}>{cats.map((c) => <option key={c}>{c}</option>)}</select></div>
        <div><label className="label">Date completed</label><input type="date" className="input" value={f.completed_on} onChange={set('completed_on')} /></div>
        <div className="md:col-span-2"><label className="label">Description</label><textarea className="input" rows={3} value={f.summary} onChange={set('summary')} /></div>
        <div className="md:col-span-2"><label className="label">Key features (one per line)</label><textarea className="input" rows={4} value={f.features} onChange={set('features')} placeholder={'Campus guide with search\nContact form with WhatsApp link'} /></div>
        <div><label className="label">Tools / tags (comma separated)</label><input className="input" value={f.tools} onChange={set('tools')} placeholder="React, Tailwind, Supabase" /></div>
        <div><label className="label">Live link</label><input className="input" value={f.live_url} onChange={set('live_url')} placeholder="https://" /></div>
        <div><label className="label">Client (optional)</label><input className="input" value={f.client_name} onChange={set('client_name')} /></div>
        <div><label className="label">Screenshots (select up to 6)</label><input type="file" multiple accept="image/*" className="input" onChange={(e) => setFiles([...e.target.files].slice(0, 6))} />{files.length > 0 && <p className="mt-1 text-xs text-muted">{files.length} selected</p>}</div>
        <div><label className="label">Show screenshots as</label><select className="input" value={f.device} onChange={set('device')}><option value="phone">Mobile phone</option><option value="desktop">Computer (PC)</option></select></div>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={f.published} onChange={set('published')} /> Publish on website</label>
        <button className="btn md:col-span-2" disabled={busy}>{busy ? 'Saving…' : 'Add project'}</button>
      </form>

      <div className="mt-8 space-y-3">
        {list.map((p) => (
          <div key={p.id} className="card flex items-center gap-4 p-4">
            {p.cover_url ? <img src={p.cover_url} alt="" className="h-14 w-20 rounded object-cover" /> : <div className="h-14 w-20 rounded bg-paper" />}
            <div className="flex-1"><p className="font-semibold">{p.title}</p><p className="text-xs text-muted">{p.category} · {p.published ? 'Published' : 'Draft'} · {p.gallery?.length || 0} screenshot(s)</p></div>
            <select className="input w-auto py-2" value={p.device || 'phone'} onChange={(e) => setDevice(p, e.target.value)} title="Screenshot format"><option value="phone">Phone</option><option value="desktop">PC</option></select>
            <button className="btn-ghost" onClick={() => toggle(p)}>{p.published ? 'Hide' : 'Publish'}</button>
            <button className="btn-ghost" onClick={() => remove(p)}>Delete</button>
          </div>
        ))}
        {!list.length && <p className="text-muted">No projects yet. Add your first one above.</p>}
      </div>
    </div>
  )
}
