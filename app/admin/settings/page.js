'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

const fields = [['business_name', 'Business name'], ['tagline', 'Tagline'], ['phone', 'Phone / WhatsApp'], ['email', 'Email'], ['hero_headline', 'Home headline']]

export default function Settings() {
  const [s, setS] = useState(null)
  const [msg, setMsg] = useState('')
  useEffect(() => { supabase.from('site_settings').select('*').eq('id', 1).single().then(({ data }) => setS(data)) }, [])
  if (!s) return <p className="text-muted">Loading…</p>

  const set = (k) => (e) => setS({ ...s, [k]: e.target.value })
  const flash = (t) => { setMsg(t); setTimeout(() => setMsg(''), 3000) }

  async function upload(field, file) {
    if (!file) return
    const path = `branding/${field}-${Date.now()}.${file.name.split('.').pop()}`
    const { error } = await supabase.storage.from('media').upload(path, file, { upsert: true })
    if (error) return alert('Upload failed: ' + error.message)
    const url = supabase.storage.from('media').getPublicUrl(path).data.publicUrl
    await supabase.from('site_settings').update({ [field]: url, updated_at: new Date().toISOString() }).eq('id', 1)
    setS({ ...s, [field]: url }); flash('Updated ✓')
  }
  const clear = async (field) => { await supabase.from('site_settings').update({ [field]: '' }).eq('id', 1); setS({ ...s, [field]: '' }); flash('Removed') }

  async function save(e) {
    e.preventDefault()
    const { id, updated_at, logo_url, favicon_url, about_photo_url, social_links, ...rest } = s
    const { error } = await supabase.from('site_settings').update({ ...rest, updated_at: new Date().toISOString() }).eq('id', 1)
    flash(error ? error.message : 'Saved ✓')
  }

  const Upload = ({ field, title, help }) => (
    <div className="card">
      <p className="font-semibold">{title}</p>
      <p className="text-xs text-muted">{help}</p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="flex h-24 items-center justify-center rounded-lg border border-line bg-white">{s[field] ? <img src={s[field]} alt="" className="max-h-16 max-w-[80%]" /> : <span className="text-xs text-muted">No image</span>}</div>
        <div className="flex h-24 items-center justify-center rounded-lg bg-brand">{s[field] ? <img src={s[field]} alt="" className="max-h-16 max-w-[80%]" /> : <span className="text-xs text-white/60">No image</span>}</div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <input type="file" accept="image/png,image/svg+xml,image/jpeg,image/x-icon" className="text-sm" onChange={(e) => upload(field, e.target.files[0])} />
        {s[field] && <button className="btn-ghost" onClick={() => clear(field)}>Remove</button>}
      </div>
    </div>
  )

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-semibold">Settings</h1>
      {msg && <p className="mt-3 rounded-lg bg-lime px-4 py-2 text-sm font-semibold">{msg}</p>}
      <h2 className="mt-8 text-xl font-semibold">Branding</h2>
      <div className="mt-4 grid gap-5 md:grid-cols-2">
        <Upload field="logo_url" title="Website logo" help="Shown in the navbar. Transparent PNG or SVG works best." />
        <Upload field="favicon_url" title="Favicon" help="Small square icon shown in the browser tab." />
        <Upload field="about_photo_url" title="Your photo (About page)" help="A clear, professional portrait works best (4:5 portrait)." />
      </div>
      <h2 className="mt-10 text-xl font-semibold">Business info</h2>
      <form onSubmit={save} className="card mt-4 space-y-4">
        {fields.map(([k, l]) => <div key={k}><label className="label">{l}</label><input className="input" value={s[k] || ''} onChange={set(k)} /></div>)}
        <div><label className="label">Home subheading</label><textarea className="input" rows={3} value={s.hero_subheading || ''} onChange={set('hero_subheading')} /></div>
        <h3 className="pt-4 text-lg font-semibold">About page</h3>
        {[['about_name', 'Your full name'], ['about_role', 'Your title (e.g. IT specialist & web engineer)'], ['about_location', 'Location (e.g. Accra, Ghana)'], ['about_skills', 'Skills (comma separated)']].map(([k, l]) => <div key={k}><label className="label">{l}</label><input className="input" value={s[k] || ''} onChange={set(k)} /></div>)}
        <div><label className="label">Your story (leave a blank line between paragraphs)</label><textarea className="input" rows={7} value={s.about_bio || ''} onChange={set('about_bio')} /></div>
        <button className="btn">Save changes</button>
      </form>
    </div>
  )
}
