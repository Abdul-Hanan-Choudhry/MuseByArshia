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

export default async function HomePage() {
  const [, featuredProducts] = await Promise.all([getBanner(), getFeaturedProducts()])

  return (
    <main>
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
