'use client'
import { useEffect, useState } from 'react'
import { supabase, waLink } from '@/lib/supabase'

export default function Messages() {
  const [list, setList] = useState([])
  const load = () => supabase.from('messages').select('*').order('created_at', { ascending: false }).then(({ data }) => setList(data || []))
  useEffect(() => { load() }, [])
  const read = async (m) => { await supabase.from('messages').update({ is_read: !m.is_read }).eq('id', m.id); load() }
  const remove = async (m) => { if (confirm('Delete this message?')) { await supabase.from('messages').delete().eq('id', m.id); load() } }

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-semibold">Messages</h1>
      <p className="mt-2 text-sm text-muted">Messages sent from the Contact page. {list.filter((m) => !m.is_read).length} unread.</p>
      <div className="mt-6 space-y-3">
        {list.map((m) => (
          <div key={m.id} className={`card ${m.is_read ? '' : 'border-l-4 border-l-brand'}`}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold">{m.name} {!m.is_read && <span className="ml-1 rounded bg-lime px-2 py-0.5 text-xs">New</span>}</p>
                <p className="text-xs text-muted">{m.phone} · {m.service || 'No service chosen'} · {new Date(m.created_at).toLocaleString()}</p>
              </div>
              <div className="flex gap-2">
                {m.phone && <a className="btn" target="_blank" rel="noopener noreferrer" href={waLink(m.phone, `Hi ${m.name}, thanks for contacting Paa Asane Technologies.`)}>Reply on WhatsApp</a>}
                <button className="btn-ghost" onClick={() => read(m)}>{m.is_read ? 'Mark unread' : 'Mark read'}</button>
                <button className="btn-ghost" onClick={() => remove(m)}>Delete</button>
              </div>
            </div>
            <p className="mt-3 whitespace-pre-wrap text-sm">{m.message}</p>
          </div>
        ))}
        {!list.length && <p className="text-muted">No messages yet.</p>}
      </div>
    </div>
  )
}
