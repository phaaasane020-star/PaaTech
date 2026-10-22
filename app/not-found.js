import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="relative isolate flex min-h-screen items-center overflow-hidden bg-brand px-5 text-white">
      <div className="mx-auto w-full max-w-6xl">
        <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[.18em] text-white/50"><span className="h-px w-6 bg-accent" />Error 404</p>
        <h1 className="mt-6 text-5xl font-bold leading-[1.02] md:text-7xl">Page not <span className="text-accent">found.</span></h1>
        <p className="mt-5 max-w-md text-lg text-white/65">The page you are looking for does not exist or has moved.</p>
        <Link href="/" className="shine mt-9 inline-flex rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-ink transition hover:-translate-y-0.5">Back to home →</Link>
      </div>
    </div>
  )
}
