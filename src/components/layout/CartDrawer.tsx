'use client'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { X, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

export function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, subtotal, itemCount } = useCart()
  const [discountCode, setDiscountCode] = useState('')
  const [discount, setDiscount] = useState<{
    id: string
    code: string
    discountAmount: number
  } | null>(null)
  const [discountError, setDiscountError] = useState('')

  const handleApplyCode = async () => {
    setDiscountError('')
    const res = await fetch('/api/discount-codes/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: discountCode, cartTotal: subtotal }),
    })
    const data = await res.json()
    if (!res.ok) {
      setDiscountError(data.error)
      setDiscount(null)
    } else {
      setDiscount(data)
    }
  }

  const finalTotal = subtotal - (discount?.discountAmount ?? 0)

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-ink/40 z-50"
            onClick={closeCart}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-cream z-50 flex flex-col shadow-2xl"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-shop-border">
              <h2 className="font-sans font-medium text-ink">Cart ({itemCount})</h2>
              <button onClick={closeCart} aria-label="Close cart">
                <X size={20} className="text-ink/70 hover:text-ink" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-6">
                <p className="font-sans text-ink/50 text-sm">Your cart is empty</p>
                <Button variant="outline" size="sm" onClick={closeCart}>
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                  {items.map(({ product }) => (
                    <div key={product.id} className="flex gap-4">
                      <div className="relative w-20 h-24 flex-shrink-0 bg-shop-border overflow-hidden">
                        {product.images[0] && (
                          <Image
                            src={product.images[0]}
                            alt={product.title}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/product/${product.slug}`}
                          onClick={closeCart}
                          className="font-sans text-sm font-medium text-ink line-clamp-2 hover:text-rust"
                        >
                          {product.title}
                        </Link>
                        <p className="font-sans text-xs text-shop-muted mt-1">
                          {product.size} · {product.medium}
                        </p>
                        <p className="font-sans text-sm text-rust mt-2">
                          {formatPrice(product.salePrice ?? product.price)}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(product.id)}
                        aria-label="Remove item"
                        className="text-shop-muted hover:text-ink self-start"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="px-6 py-4 border-t border-shop-border space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                      placeholder="Discount code"
                      className="flex-1 border border-shop-border px-3 py-2 font-sans text-sm focus:outline-none focus:border-ink"
                    />
                    <Button size="sm" onClick={handleApplyCode}>
                      Apply
                    </Button>
                  </div>
                  {discountError && (
                    <p className="font-sans text-xs text-sale-red">{discountError}</p>
                  )}
                  {discount && (
                    <p className="font-sans text-xs text-green-600">
                      Code applied: -{formatPrice(discount.discountAmount)}
                    </p>
                  )}

                  <div className="flex justify-between font-sans text-sm">
                    <span className="text-ink/70">Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  {discount && (
                    <div className="flex justify-between font-sans text-sm text-sale-red">
                      <span>Discount ({discount.code})</span>
                      <span>-{formatPrice(discount.discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-sans font-medium">
                    <span>Total (excl. shipping)</span>
                    <span>{formatPrice(finalTotal)}</span>
                  </div>

                  <Link
                    href={{
                      pathname: '/checkout',
                      query: discount
                        ? { discountId: discount.id, discountAmount: discount.discountAmount }
                        : {},
                    }}
                    onClick={closeCart}
                  >
                    <Button className="w-full mt-2">Proceed to Checkout</Button>
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
