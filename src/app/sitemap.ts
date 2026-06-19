import type { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const raw = process.env.NEXTAUTH_URL ?? 'https://musebyarshia.vercel.app'
  const base = (raw.startsWith('http') ? raw : `https://${raw}`).replace(/\/$/, '')

  let products: { slug: string; updatedAt: Date }[] = []
  try {
    products = await prisma.product.findMany({
      where: { isVisible: true },
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: 'desc' },
    })
  } catch {
    // DB unreachable at build time — return static pages only
  }

  return [
    { url: base,               lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/shop`,     lastModified: new Date(), changeFrequency: 'daily',   priority: 0.9 },
    { url: `${base}/gallery`,  lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${base}/about`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    ...products.map((p) => ({
      url: `${base}/product/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ]
}
