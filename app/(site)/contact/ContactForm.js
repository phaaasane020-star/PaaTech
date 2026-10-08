'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { services } from '@/lib/services'

export default function ContactForm() {
  const [f, setF] = useState({ name: '', phone: '', service: '', message: '' })
  const [state, setState] = useState('idle')
  const [hp, setHp] = useState('')
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })

  async function submit(e) {
    e.preventDefault()
    if (hp) return setState('sent') // bots fill the hidden field
    setState('sending')
    const { error } = await supabase.from('messages').insert(f)
    setState(error ? 'error' : 'sent')
  }

  if (state === 'sent') return <div className="card"><p className="font-semibold">Thank you! Your message has been sent. ✓</p><p className="mt-1 text-sm text-muted">I will get back to you soon.</p></div>
  return (
    <form onSubmit={submit} className="card space-y-4">
      <input tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" name="website" value={hp} onChange={(e) => setHp(e.target.value)} />
      <div><label className="label">Name</label><input className="input" maxLength={100} value={f.name} onChange={set('name')} required /></div>
      <div><label className="label">Phone</label><input className="input" maxLength={30} value={f.phone} onChange={set('phone')} /></div>
      <div><label className="label">Service needed</label>
        <select className="input" value={f.service} onChange={set('service')}><option value="">Select a service</option>{services.map((v) => <option key={v.title}>{v.title}</option>)}<option>Other</option></select></div>
      <div><label className="label">Message</label><textarea className="input" rows={4} maxLength={2000} value={f.message} onChange={set('message')} required /></div>
      {state === 'error' && <p className="text-sm text-red-700">Something went wrong. Please try WhatsApp instead.</p>}
      <button className="btn w-full" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : 'Send message'}</button>
    </form>
  )
}
