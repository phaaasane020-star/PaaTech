import { site } from '@/lib/site'

export default function sitemap() {
  return ['', '/about', '/services', '/projects', '/reviews', '/contact'].map((p) => ({ url: `${site}${p}`, lastModified: new Date() }))
}
