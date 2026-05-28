'use client'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { Product } from '@/types'
import { formatPrice } from '@/lib/utils'
import { useCart } from '@/context/CartContext'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-t border-shop-border">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 font-sans text-sm text-ink"
      >
        {title}
        <ChevronDown
          size={16}
          className={cn('transition-transform duration-200', open && 'rotate-180')}
        />
      </button>
      {open && (
        <div className="pb-4 font-sans text-sm text-shop-muted leading-relaxed">{children}</div>
      )}
    </div>
  )
}

export function ProductInfo({ product }: { product: Product }) {
  const { addItem } = useCart()

  const discountPercent = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : null

  return (
    <div className="space-y-6">
      <div>
        <p className="font-sans text-xs tracking-[0.3em] uppercase text-shop-muted mb-2">
          {product.category.name}
        </p>
        <h1 className="font-sans text-2xl font-medium text-ink mb-3">{product.title}</h1>

        <div className="flex items-center gap-4 mb-4">
          {product.salePrice ? (
            <>
              <span className="font-sans text-xl font-medium text-sale-red">
                {formatPrice(product.salePrice)}
              </span>
              <span className="font-sans text-sm text-shop-muted line-through">
                {formatPrice(product.price)}
              </span>
              {discountPercent && (
                <span className="bg-sale-red text-white text-xs font-sans px-2 py-0.5">
                  -{discountPercent}%
                </span>
              )}
            </>
          ) : (
            <span className="font-sans text-xl text-ink">{formatPrice(product.price)}</span>
          )}
        </div>

        <div className="flex gap-4 font-sans text-sm text-shop-muted mb-6">
          <span>{product.size}</span>
          <span>·</span>
          <span>{product.medium}</span>
          {product.year && (
            <>
              <span>·</span>
              <span>{product.year}</span>
            </>
          )}
        </div>
      </div>

      <p className="font-sans font-light text-shop-text leading-relaxed">{product.description}</p>

      {product.isSoldOut ? (
        <div className="border border-shop-border p-4 text-center">
          <p className="font-sans text-sm text-shop-muted tracking-widest uppercase">Sold Out</p>
        </div>
      ) : (
        <Button
          onClick={() => addItem(product)}
          size="lg"
          className="w-full"
        >
          Add to Cart
        </Button>
      )}

      <div className="bg-shop-border/50 p-4 rounded-sm">
        <p className="font-sans text-xs text-shop-muted text-center">
          🎨 This is a one-of-a-kind original painting
        </p>
      </div>

      <div className="border-t border-shop-border">
        <Accordion title="Shipping">
          <p>
            We ship across Pakistan within 3–7 business days. Karachi, Lahore, and Islamabad are
            typically faster. We package all paintings securely to prevent damage in transit.
          </p>
        </Accordion>
        <Accordion title="Returns & Exchanges">
          <p>
            Due to the one-of-a-kind nature of original art, we do not accept returns unless the
            painting arrives damaged. Please WhatsApp us within 48 hours of receiving your order
            with photos of any damage.
          </p>
        </Accordion>
      </div>
    </div>
  )
}
