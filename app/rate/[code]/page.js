'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function Rate() {
  const { code } = useParams()
  const [info, setInfo] = useState(null)
  const [state, setState] = useState('loading')
  const [rating, setRating] = useState(0)
  const [name, setName] = useState('')
  const [comment, setComment] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    supabase.rpc('get_rating_link', { p_code: code }).then(({ data }) => {
      const row = data?.[0]
      if (!row) return setState('invalid')
      setInfo(row)
      setName(row.out_client || '')
      setState(row.out_status)
    })
  }, [code])

  async function submit(e) {
    e.preventDefault()
    if (!rating) return alert('Please tap a star rating first.')
    setBusy(true)
    const { data } = await supabase.rpc('submit_review', { p_code: code, p_name: name, p_rating: rating, p_comment: comment })
    setBusy(false)
    setState(data ? 'done' : 'expired')
  }

  const msg = {
    loading: 'Loading…',
    invalid: 'This link is not valid.',
    expired: 'This link has expired or was already used.',
    completed: 'This link has expired or was already used.',
    done: 'Thank you! Your review has been sent. ✓'
  }[state]

  return (
    <div className="mx-auto flex min-h-screen max-w-lg items-center px-5 py-10">
      <div className="card w-full">
        <p className="font-display text-lg font-semibold">Paa Asane Technologies</p>
        {state !== 'pending' ? <p className="mt-6 text-muted">{msg}</p> : (
          <form onSubmit={submit} className="mt-6 space-y-5">
            <div>
              <h1 className="text-3xl font-semibold">How was your experience?</h1>
              <p className="mt-2 text-sm text-muted">Service: {info?.out_service}</p>
            </div>
            <div className="flex gap-1 text-4xl">
              {[1, 2, 3, 4, 5].map((n) => (
                <button type="button" key={n} onClick={() => setRating(n)} aria-label={`${n} stars`}
                  className={n <= rating ? 'text-[#526600]' : 'text-line'}>★</button>
              ))}
            </div>
            <div><label className="label">Your name</label><input className="input" value={name} onChange={(e) => setName(e.target.value)} /></div>
            <div><label className="label">Comment</label><textarea className="input" rows={4} maxLength={1000} value={comment} onChange={(e) => setComment(e.target.value)} /></div>
            <button className="btn w-full" disabled={busy}>{busy ? 'Sending…' : 'Submit review'}</button>
          </form>
        )}
      </div>
    </div>
  )
}
