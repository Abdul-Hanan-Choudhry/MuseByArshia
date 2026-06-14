import type { Metadata } from 'next'
import type { Product } from '@/types'

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Explore the full collection of original paintings by Muse By Arshia — portraits, abstracts, landscapes, and more.',
  openGraph: {
    title: 'Gallery | Muse By Arshia',
    description:
      'Explore the full collection of original paintings by Muse By Arshia.',
  },
}

import { GalleryGrid } from '@/components/gallery/GalleryGrid'

async function getAllPaintings(): Promise<Product[]> {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/products?limit=50`, {
      cache: 'no-store',
    })
    if (!res.ok) return []
    const data = await res.json()
    return data.products ?? []
  } catch {
    return []
  }
}

export default async function GalleryPage() {
  const paintings = await getAllPaintings()

  return (
    <div className="min-h-screen bg-cream pb-24">
      {/* Header */}
      <div className="py-20 px-6 text-center">
        <p className="font-sans text-xs tracking-[0.35em] uppercase text-rust mb-5">
          Collection
        </p>
        <h1 className="font-display text-6xl md:text-7xl font-light text-ink mb-8">
          Gallery
        </h1>
        <div className="flex items-center justify-center gap-4">
          <div className="h-px w-20 bg-ink/20" />
          <div className="w-1.5 h-1.5 rounded-full bg-rust" />
          <div className="h-px w-20 bg-ink/20" />
        </div>
        {paintings.length > 0 && (
          <p className="font-sans text-sm text-ink/40 mt-6 tracking-wide">
            {paintings.length} {paintings.length === 1 ? 'piece' : 'pieces'}
          </p>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <GalleryGrid paintings={paintings} />
      </div>
    </div>
  )
}
