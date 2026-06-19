import type { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Shop Original Paintings',
  description:
    'Browse and buy original handcrafted paintings by Shanzay Arshia. Acrylics, portraits, abstracts, and more — shipped across Pakistan.',
  openGraph: {
    title: 'Shop Original Paintings | Muse By Arshia',
    description:
      'Browse and buy original handcrafted paintings by Shanzay Arshia. Shipped across Pakistan.',
  },
}

import { CategoryPills } from '@/components/shop/CategoryPills'
import { SortDropdown } from '@/components/shop/SortDropdown'
import { ProductCard } from '@/components/shop/ProductCard'
import { Pagination } from '@/components/shop/Pagination'
import type { PaginatedProducts, Product } from '@/types'
import { prisma } from '@/lib/prisma'

interface PageProps {
  searchParams: {
    category?: string
    sort?: string
    page?: string
  }
}

async function getProducts(searchParams: PageProps['searchParams']): Promise<PaginatedProducts> {
  const category = searchParams.category
  const page = parseInt(searchParams.page ?? '1')
  const limit = 12

  try {
    const where = {
      isVisible: true,
      ...(category && { category: { slug: category } }),
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: { category: { select: { name: true, slug: true } } },
        orderBy: [{ isFeatured: 'desc' }, { sortOrder: 'asc' }, { createdAt: 'desc' }],
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.product.count({ where }),
    ])

    return {
      products: products as unknown as Product[],
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    }
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
