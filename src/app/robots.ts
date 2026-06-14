import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const base = (process.env.NEXTAUTH_URL ?? 'https://musebyarshia.vercel.app').replace(/\/$/, '')
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
