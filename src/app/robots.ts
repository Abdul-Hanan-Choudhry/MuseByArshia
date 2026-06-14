import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const raw = process.env.NEXTAUTH_URL ?? 'https://musebyarshia.vercel.app'
  const base = (raw.startsWith('http') ? raw : `https://${raw}`).replace(/\/$/, '')
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/checkout/', '/cart'],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  }
}
