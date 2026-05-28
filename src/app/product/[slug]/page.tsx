import { notFound } from 'next/navigation'
import { ImageGallery } from '@/components/product/ImageGallery'
import { ProductInfo } from '@/components/product/ProductInfo'
import { RelatedProducts } from '@/components/product/RelatedProducts'
import type { Product } from '@/types'

interface PageProps {
  params: { slug: string }
}

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/products/${slug}`, {
      cache: 'no-store',
    })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

async function getRelated(categorySlug: string, currentId: string): Promise<Product[]> {
  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/products?category=${categorySlug}&limit=5`,
      { cache: 'no-store' }
    )
    if (!res.ok) return []
    const data = await res.json()
    return (data.products as Product[]).filter((p) => p.id !== currentId).slice(0, 4)
  } catch {
    return []
  }
}

export default async function ProductPage({ params }: PageProps) {
  const product = await getProduct(params.slug)
  if (!product) notFound()

  const related = await getRelated(product.category.slug, product.id)

  return (
    <div className="min-h-screen bg-shop-bg pt-8 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <nav className="font-sans text-xs text-shop-muted mb-8" aria-label="Breadcrumb">
          <a href="/shop" className="hover:text-ink">Shop</a>
          <span className="mx-2">›</span>
          <a href={`/shop?category=${product.category.slug}`} className="hover:text-ink">
            {product.category.name}
          </a>
          <span className="mx-2">›</span>
          <span className="text-ink">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          <ImageGallery images={product.images} title={product.title} />
          <ProductInfo product={product} />
        </div>

        <RelatedProducts products={related} />
      </div>
    </div>
  )
}
