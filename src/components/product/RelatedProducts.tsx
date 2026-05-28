import { ProductCard } from '@/components/shop/ProductCard'
import type { Product } from '@/types'

export function RelatedProducts({ products }: { products: Product[] }) {
  if (!products.length) return null

  return (
    <section className="mt-20 pt-16 border-t border-shop-border">
      <h2 className="font-display text-3xl font-light text-ink mb-10">You may also like</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </section>
  )
}
