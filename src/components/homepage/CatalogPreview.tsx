import Link from 'next/link'
import type { Product } from '@/types'
import { ProductCard } from '@/components/shop/ProductCard'

export function CatalogPreview({ products }: { products: Product[] }) {
  return (
    <section className="bg-cream py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-5xl font-light text-ink text-center mb-14">Buy Art</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/shop"
            className="font-sans text-sm tracking-widest border border-ink text-ink px-10 py-3 hover:bg-ink hover:text-cream transition-all duration-300 inline-block"
          >
            Go to Shop
          </Link>
        </div>
      </div>
    </section>
  )
}
