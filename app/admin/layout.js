'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

const nav = [['/admin/projects', 'Projects'], ['/admin/reviews', 'Reviews'], ['/admin/links', 'Rating links'], ['/admin/messages', 'Messages'], ['/admin/settings', 'Settings']]

export default function AdminLayout({ children }) {
  const path = usePathname()
  const router = useRouter()
  const [ok, setOk] = useState(false)
  const isLogin = path === '/admin/login'

  useEffect(() => {
    if (isLogin) return
    supabase.auth.getSession().then(({ data }) => (data.session ? setOk(true) : router.replace('/admin/login')))
  }, [isLogin, router])

  if (isLogin) return children
  if (!ok) return <p className="p-10 text-muted">Loading…</p>

  return (
    <div className="min-h-screen md:flex">
      <aside className="bg-brand p-5 text-white md:w-56">
        <p className="font-display text-lg font-semibold">Paa Asane Admin</p>
        <nav className="mt-4 flex flex-wrap gap-2 md:flex-col">
          {nav.map(([h, l]) => (
            <Link key={h} href={h} className={`rounded-lg px-3 py-2 text-sm ${path === h ? 'bg-lime font-semibold text-ink' : 'hover:bg-white/10'}`}>{l}</Link>
          ))}
          <button className="rounded-lg px-3 py-2 text-left text-sm hover:bg-white/10" onClick={async () => { await supabase.auth.signOut(); router.replace('/admin/login') }}>Log out</button>
        </nav>
      </aside>
      <div className="flex-1 p-5 md:p-10">{children}</div>
    </div>
  )
}
