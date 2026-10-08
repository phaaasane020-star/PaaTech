import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center px-5 text-center">
      <p className="label">404</p>
      <h1 className="text-4xl font-semibold">Page not found</h1>
      <p className="mt-3 text-muted">The page you are looking for does not exist or has moved.</p>
      <Link href="/" className="btn mt-6">Back to home</Link>
    </div>
  )
}
