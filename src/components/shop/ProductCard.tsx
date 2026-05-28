'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/types'
import { formatPrice } from '@/lib/utils'
import { useCart } from '@/context/CartContext'

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addItem } = useCart()

  const discountPercent = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.6 }}
      className="group"
    >
      <Link href={`/product/${product.slug}`}>
        <div className="relative aspect-[4/5] overflow-hidden bg-shop-border mb-3">
          <Image
            src={product.images[0] ?? '/images/placeholder.jpg'}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {discountPercent && (
            <div className="absolute top-3 left-3 bg-sale-red text-white text-xs font-sans font-medium px-2 py-1">
              SALE -{discountPercent}%
            </div>
          )}

          {product.isSoldOut && (
            <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
              <span className="font-sans text-sm tracking-widest text-ink/70 border border-ink/30 px-4 py-2">
                SOLD
              </span>
            </div>
          )}

          {!product.isSoldOut && (
            <button
              onClick={(e) => {
                e.preventDefault()
                addItem(product)
              }}
              className="absolute bottom-0 left-0 right-0 bg-ink text-cream text-center font-sans text-xs tracking-widest py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
            >
              ADD TO CART
            </button>
          )}
        </div>
      </Link>

      <div>
        <p className="font-sans text-sm font-medium text-shop-text mb-1">{product.title}</p>
        <p className="font-sans text-xs text-shop-muted mb-2">
          {product.size} · {product.medium}
        </p>
        <div className="flex items-center gap-3">
          {product.salePrice ? (
            <>
              <span className="font-sans text-sm font-medium text-sale-red">
                {formatPrice(product.salePrice)}
              </span>
              <span className="font-sans text-xs text-shop-muted line-through">
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <span className="font-sans text-sm text-shop-text">{formatPrice(product.price)}</span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
