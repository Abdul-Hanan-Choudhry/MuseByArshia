'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'
import { SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'

const CATEGORIES = [
  { label: 'All', slug: '' },
  { label: 'Portraits', slug: 'portraits' },
  { label: 'Abstract', slug: 'abstract' },
  { label: 'Landscape', slug: 'landscape' },
  { label: 'Still Life', slug: 'still-life' },
  { label: 'Limited Editions', slug: 'limited-editions' },
]

const SIZES = ['Small (A4)', 'Medium (A3)', 'Large (A2)', 'XL (A1)']

const PRICE_RANGES = [
  { label: 'Under Rs. 5,000', min: '0', max: '5000' },
  { label: 'Rs. 5,000 – 15,000', min: '5000', max: '15000' },
  { label: 'Rs. 15,000 – 30,000', min: '15000', max: '30000' },
  { label: 'Above Rs. 30,000', min: '30000', max: '' },
]

export function FilterSidebar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [mobileOpen, setMobileOpen] = useState(false)

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) params.set(key, value)
      else params.delete(key)
      params.delete('page')
      router.push(`/shop?${params.toString()}`)
    },
    [router, searchParams]
  )

  const activeCategory = searchParams.get('category') ?? ''
  const activeMinPrice = searchParams.get('minPrice') ?? ''
  const activeMaxPrice = searchParams.get('maxPrice') ?? ''
  const activeSize = searchParams.get('size') ?? ''

  const handlePriceRange = (min: string, max: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (min === activeMinPrice && max === activeMaxPrice) {
      params.delete('minPrice')
      params.delete('maxPrice')
    } else {
      if (min) params.set('minPrice', min)
      else params.delete('minPrice')
      if (max) params.set('maxPrice', max)
      else params.delete('maxPrice')
    }
    params.delete('page')
    router.push(`/shop?${params.toString()}`)
  }

  const hasActiveFilters = activeCategory || activeMinPrice || activeSize

  const filterContent = (
    <>
      <div className="mb-6">
        <h3 className="font-sans text-xs tracking-[0.3em] uppercase text-shop-muted mb-3">
          Category
        </h3>
        <ul className="space-y-2">
          {CATEGORIES.map((cat) => (
            <li key={cat.slug}>
              <button
                onClick={() => updateParam('category', cat.slug)}
                className={cn(
                  'font-sans text-sm transition-colors w-full text-left py-0.5',
                  activeCategory === cat.slug
                    ? 'text-rust font-medium'
                    : 'text-shop-text hover:text-rust'
                )}
              >
                {cat.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="font-sans text-xs tracking-[0.3em] uppercase text-shop-muted mb-3">
          Size
        </h3>
        <ul className="space-y-2">
          {SIZES.map((size) => (
            <li key={size}>
              <button
                onClick={() => updateParam('size', activeSize === size ? '' : size)}
                className={cn(
                  'font-sans text-sm transition-colors w-full text-left py-0.5',
                  activeSize === size ? 'text-rust font-medium' : 'text-shop-text hover:text-rust'
                )}
              >
                {size}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="font-sans text-xs tracking-[0.3em] uppercase text-shop-muted mb-3">
          Price
        </h3>
        <ul className="space-y-2">
          {PRICE_RANGES.map((range) => {
            const isActive = activeMinPrice === range.min && activeMaxPrice === range.max
            return (
              <li key={range.label}>
                <button
                  onClick={() => handlePriceRange(range.min, range.max)}
                  className={cn(
                    'font-sans text-sm transition-colors w-full text-left py-0.5',
                    isActive ? 'text-rust font-medium' : 'text-shop-text hover:text-rust'
                  )}
                >
                  {range.label}
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      {hasActiveFilters && (
        <button
          onClick={() => router.push('/shop')}
          className="font-sans text-xs text-shop-muted hover:text-ink underline underline-offset-2"
        >
          Clear all filters
        </button>
      )}
    </>
  )

  return (
    <aside className="w-full">
      {/* Mobile toggle button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden w-full flex items-center justify-between border border-shop-border bg-white px-4 py-3 mb-4"
      >
        <span className="flex items-center gap-2 font-sans text-sm text-shop-text">
          <SlidersHorizontal size={15} />
          Filters
          {hasActiveFilters && (
            <span className="bg-rust text-cream text-[10px] px-1.5 py-0.5 rounded-sm">Active</span>
          )}
        </span>
        {mobileOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {/* Mobile: collapsible */}
      <div className={cn('md:hidden', mobileOpen ? 'block' : 'hidden')}>
        <div className="border border-shop-border bg-white p-4 mb-4">
          {filterContent}
        </div>
      </div>

      {/* Desktop: always visible */}
      <div className="hidden md:block">{filterContent}</div>
    </aside>
  )
}
