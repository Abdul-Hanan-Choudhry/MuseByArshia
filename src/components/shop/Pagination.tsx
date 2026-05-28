'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'

interface PaginationProps {
  currentPage: number
  totalPages: number
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  if (totalPages <= 1) return null

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', String(page))
    router.push(`/shop?${params.toString()}`)
  }

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-2 mt-12">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage <= 1}
        className="font-sans text-sm text-shop-text hover:text-rust disabled:opacity-30 disabled:cursor-not-allowed px-3 py-2"
      >
        ← Prev
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => goToPage(page)}
          aria-current={page === currentPage ? 'page' : undefined}
          className={cn(
            'font-sans text-sm w-9 h-9 transition-colors',
            page === currentPage
              ? 'bg-ink text-cream'
              : 'text-shop-text hover:bg-shop-border'
          )}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="font-sans text-sm text-shop-text hover:text-rust disabled:opacity-30 disabled:cursor-not-allowed px-3 py-2"
      >
        Next →
      </button>
    </nav>
  )
}
