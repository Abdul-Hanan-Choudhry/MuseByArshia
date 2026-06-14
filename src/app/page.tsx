import { HeroSection } from '@/components/homepage/HeroSection'
import { MarqueeText } from '@/components/homepage/MarqueeText'
import { ArtistStory } from '@/components/homepage/ArtistStory'
import { FeaturedWorks } from '@/components/homepage/FeaturedWorks'
import { VideoSection } from '@/components/homepage/VideoSection'
import { CatalogPreview } from '@/components/homepage/CatalogPreview'
import { NewsletterSection } from '@/components/homepage/NewsletterSection'
import type { Product, SaleBanner } from '@/types'

async function getBanner(): Promise<SaleBanner | null> {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/banners`, { cache: 'no-store' })
    if (!res.ok) return null
    const data = await res.json()
    return data.banner ?? null
  } catch {
    return null
  }
}

async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/products?featured=true&limit=8`,
      { cache: 'no-store' }
    )
    if (!res.ok) return []
    const data = await res.json()
    return data.products ?? []
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
  const [, featuredProducts] = await Promise.all([getBanner(), getFeaturedProducts()])

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
