import { createClient } from '@supabase/supabase-js'
import { createBrowserClient } from '@supabase/ssr'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY // public "publishable" key: safe in the browser, protected by Row Level Security

// Server: plain client for public reads. Browser: cookie-based session so the server can verify the admin.
export const supabase = typeof window === 'undefined' ? createClient(url, key) : createBrowserClient(url, key)

export const waNumber = (phone) => {
  const d = String(phone || '0508934500').replace(/\D/g, '') // falls back to the business number if settings fail to load
  return d.startsWith('233') ? d : '233' + d.replace(/^0/, '')
}

export const waLink = (phone, text = '') =>
  `https://wa.me/${waNumber(phone)}${text ? '?text=' + encodeURIComponent(text) : ''}`

export const stars = (n) => '★'.repeat(n) + '☆'.repeat(5 - n)
