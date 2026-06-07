'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { cn } from '@/lib/utils'

const CATEGORIES = [
  { label: 'All Works', slug: '' },
  { label: 'Portraits', slug: 'portraits' },
  { label: 'Abstract', slug: 'abstract' },
  { label: 'Landscape', slug: 'landscape' },
  { label: 'Still Life', slug: 'still-life' },
  { label: 'Limited Editions', slug: 'limited-editions' },
]

export function CategoryPills() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get('category') ?? ''

  const select = useCallback(
    (slug: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (slug) params.set('category', slug)
      else params.delete('category')
      params.delete('page')
      router.push(`/shop?${params.toString()}`)
    },
    [router, searchParams]
  )

  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => select(cat.slug)}
          className={cn(
            'font-sans text-sm tracking-wide px-6 py-2.5 border transition-all duration-200',
            activeCategory === cat.slug
              ? 'bg-ink text-cream border-ink'
              : 'bg-transparent text-shop-text border-shop-border hover:border-ink hover:text-ink'
          )}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}
