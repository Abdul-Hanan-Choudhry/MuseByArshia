'use client'
import { useCart } from '@/context/CartContext'
import Image from 'next/image'
import Link from 'next/link'
import { Trash2 } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

export default function CartPage() {
  const { items, removeItem, subtotal, itemCount } = useCart()

  return (
    <div className="min-h-screen bg-shop-bg pt-8 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="font-display text-4xl font-light text-ink mb-10">
          Your Cart ({itemCount})
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-24 space-y-4">
            <p className="font-sans text-shop-muted">Your cart is empty.</p>
            <Link href="/shop">
              <Button variant="outline">Browse Paintings</Button>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-10">
            <div className="md:col-span-2 space-y-4">
              {items.map(({ product }) => (
                <div
                  key={product.id}
                  className="flex gap-4 bg-cream p-4 border border-shop-border"
                >
                  <div className="relative w-20 h-24 flex-shrink-0 bg-shop-border overflow-hidden">
                    {product.images[0] && (
                      <Image src={product.images[0]} alt={product.title} fill className="object-cover" />
                    )}
                  </div>
                  <div className="flex-1">
                    <Link href={`/product/${product.slug}`} className="font-sans font-medium text-ink hover:text-rust">
                      {product.title}
                    </Link>
                    <p className="font-sans text-xs text-shop-muted mt-1">
                      {product.size} · {product.medium}
                    </p>
                    <p className="font-sans text-sm font-medium text-rust mt-2">
                      {formatPrice(product.salePrice ?? product.price)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(product.id)}
                    aria-label="Remove"
                    className="text-shop-muted hover:text-ink"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-cream border border-shop-border p-6 h-fit space-y-4">
              <h2 className="font-sans font-medium text-ink">Order Summary</h2>
              <div className="flex justify-between font-sans text-sm text-shop-muted">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between font-sans text-sm text-shop-muted">
                <span>Shipping</span>
                <span className="text-ink">Calculated at checkout</span>
              </div>
              <div className="border-t border-shop-border pt-4 flex justify-between font-sans font-medium text-ink">
                <span>Total</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <Link href="/checkout">
                <Button className="w-full">Proceed to Checkout</Button>
              </Link>
              <Link href="/shop" className="block text-center font-sans text-xs text-shop-muted hover:text-ink underline">
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
