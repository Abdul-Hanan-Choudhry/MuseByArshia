import { Suspense } from 'react'
import { CategoryPills } from '@/components/shop/CategoryPills'
import { SortDropdown } from '@/components/shop/SortDropdown'
import { ProductCard } from '@/components/shop/ProductCard'
import { Pagination } from '@/components/shop/Pagination'
import type { PaginatedProducts } from '@/types'

interface PageProps {
  searchParams: {
    category?: string
    sort?: string
    page?: string
  }
}

async function getProducts(searchParams: PageProps['searchParams']): Promise<PaginatedProducts> {
  const params = new URLSearchParams()
  if (searchParams.category) params.set('category', searchParams.category)
  if (searchParams.page) params.set('page', searchParams.page)

  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/products?${params.toString()}`,
      { cache: 'no-store' }
    )
    if (!res.ok) return { products: [], pagination: { page: 1, limit: 12, total: 0, pages: 0 } }
    return res.json()
  } catch {
    return { products: [], pagination: { page: 1, limit: 12, total: 0, pages: 0 } }
  }
}

export default async function ShopPage({ searchParams }: PageProps) {
  const data = await getProducts(searchParams)
  const { products, pagination } = data

  return (
    <div className="min-h-screen bg-shop-bg pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-8">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-shop-muted mb-2">
            Browse
          </p>
          <h1 className="font-display text-4xl font-light text-ink">All Paintings</h1>
          <p className="font-sans text-sm text-shop-muted mt-1">{pagination.total} works</p>
        </div>

        {/* Category pills + sort row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-8 border-b border-shop-border">
          <Suspense fallback={null}>
            <CategoryPills />
          </Suspense>
          <Suspense fallback={null}>
            <SortDropdown />
          </Suspense>
        </div>

        {/* Product grid */}
        {products.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-sans text-shop-muted">No paintings found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}

        <Suspense fallback={null}>
          <Pagination currentPage={pagination.page} totalPages={pagination.pages} />
        </Suspense>
      </div>
    </div>
  )
}
