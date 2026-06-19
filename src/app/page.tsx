export const dynamic = 'force-dynamic'

import { HeroSection } from '@/components/homepage/HeroSection'
import { MarqueeText } from '@/components/homepage/MarqueeText'
import { ArtistStory } from '@/components/homepage/ArtistStory'
import { FeaturedWorks } from '@/components/homepage/FeaturedWorks'
import { VideoSection } from '@/components/homepage/VideoSection'
import { CatalogPreview } from '@/components/homepage/CatalogPreview'
import { NewsletterSection } from '@/components/homepage/NewsletterSection'
import type { Product } from '@/types'
import { prisma } from '@/lib/prisma'

async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const products = await prisma.product.findMany({
      where: { isVisible: true, isFeatured: true },
      include: { category: { select: { name: true, slug: true } } },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
      take: 8,
    })
    return products as unknown as Product[]
  } catch {
    return []
  }
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Muse By Arshia',
  description:
    'Original handcrafted paintings by Shanzay Arshia, shipped across Pakistan.',
  url: process.env.NEXTAUTH_URL,
  sameAs: ['https://www.instagram.com/arshiasdiary_'],
  founder: { '@type': 'Person', name: 'Shanzay Arshia' },
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts()

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <MarqueeText />
      <ArtistStory />
      <FeaturedWorks paintings={featuredProducts.slice(0, 3)} />
      <VideoSection />
      <CatalogPreview products={featuredProducts} />
      <NewsletterSection />
    </main>
  )
}
