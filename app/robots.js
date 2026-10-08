import { site } from '@/lib/site'

export default function robots() {
  return { rules: { userAgent: '*', allow: '/', disallow: ['/admin', '/rate/'] }, sitemap: `${site}/sitemap.xml` }
}
