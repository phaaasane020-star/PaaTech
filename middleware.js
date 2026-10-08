import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

// Runs on the server before any /admin page is sent. Visitors without a valid login are redirected.
export async function middleware(request) {
  let response = NextResponse.next({ request })
  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (list) => {
        list.forEach(({ name, value }) => request.cookies.set(name, value))
        response = NextResponse.next({ request })
        list.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
      }
    }
  })
  const { data: { user } } = await supabase.auth.getUser() // verified with Supabase, not just read from the cookie
  const path = request.nextUrl.pathname
  if (path !== '/admin/login' && !user) return NextResponse.redirect(new URL('/admin/login', request.url))
  if (path === '/admin/login' && user) return NextResponse.redirect(new URL('/admin/projects', request.url))
  return response
}

export const config = { matcher: ['/admin/:path*'] }
