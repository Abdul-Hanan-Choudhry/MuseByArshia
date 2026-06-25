'use client'
import { Suspense, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { formatPrice, calculateShipping } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import Image from 'next/image'
import Link from 'next/link'

const CITIES = [
  'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Multan', 'Faisalabad',
  'Peshawar', 'Quetta', 'Sialkot', 'Gujranwala', 'Hyderabad', 'Abbottabad', 'Other',
]

const SADAPAY_NUMBER = process.env.NEXT_PUBLIC_SADAPAY_NUMBER ?? ''
const SADAPAY_NAME = process.env.NEXT_PUBLIC_SADAPAY_NAME ?? ''

function CheckoutContent() {
  const { items, subtotal, clearCart } = useCart()
  const searchParams = useSearchParams()
  const router = useRouter()

  const discountId = searchParams.get('discountId') ?? undefined
  const discountAmount = parseInt(searchParams.get('discountAmount') ?? '0')

  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '', city: '', postalCode: '',
  })
  const [paymentReference, setPaymentReference] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const shippingCost = calculateShipping(form.city, subtotal)
  const finalTotal = subtotal - discountAmount + shippingCost

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/checkout/cod', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: items.map((i) => ({ productId: i.product.id })),
        customer: form,
        discountCodeId: discountId,
        discountAmount,
        paymentMethod: 'SADAPAY',
        paymentReference: paymentReference.trim() || undefined,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error ?? 'Something went wrong. Please try again.')
      setLoading(false)
      return
    }

    clearCart()
    router.push(`/checkout/success?order=${data.orderNumber}`)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-shop-bg pt-8 pb-20 flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="font-sans text-shop-muted">Your cart is empty.</p>
          <Link href="/shop"><Button variant="outline">Browse Paintings</Button></Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-shop-bg pt-8 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="font-display text-4xl font-light text-ink mb-10">Checkout</h1>

        {/* Advance payment notice banner */}
        <div className="bg-ink text-cream px-6 py-4 mb-8 flex gap-3 items-start">
          <span className="text-gold mt-0.5 flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </span>
          <div>
            <p className="font-sans text-sm font-medium leading-snug">Only advance online payments are accepted.</p>
            <p className="font-sans text-xs text-cream/70 mt-1 leading-relaxed">
              Please transfer the full order amount to the account below before placing your order.
              Once transferred, enter your transaction ID — your order will be confirmed after payment is verified.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-10">
          <div className="space-y-6">

            {/* Delivery information */}
            <div>
              <h2 className="font-sans font-medium text-ink mb-4">Delivery Information</h2>
              <div className="space-y-4">
                {[
                  { name: 'name', label: 'Full Name', type: 'text', required: true },
                  { name: 'phone', label: 'Phone / WhatsApp', type: 'tel', required: true },
                  { name: 'email', label: 'Email', type: 'email', required: true },
                  { name: 'address', label: 'Complete Address', type: 'text', required: true },
                  { name: 'postalCode', label: 'Postal Code', type: 'text', required: false },
                ].map((field) => (
                  <div key={field.name}>
                    <label htmlFor={field.name} className="block font-sans text-sm text-ink mb-1">
                      {field.label} {field.required && <span className="text-sale-red">*</span>}
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      required={field.required}
                      value={(form as Record<string, string>)[field.name]}
                      onChange={handleChange}
                      className="w-full border border-shop-border bg-white px-4 py-2.5 font-sans text-sm text-shop-text focus:outline-none focus:border-ink"
                    />
                  </div>
                ))}

                <div>
                  <label htmlFor="city" className="block font-sans text-sm text-ink mb-1">
                    City <span className="text-sale-red">*</span>
                  </label>
                  <select
                    id="city"
                    name="city"
                    required
                    value={form.city}
                    onChange={handleChange}
                    className="w-full border border-shop-border bg-white px-4 py-2.5 font-sans text-sm text-shop-text focus:outline-none focus:border-ink"
                  >
                    <option value="">Select city</option>
                    {CITIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Payment section */}
            <div>
              <h2 className="font-sans font-medium text-ink mb-4">Payment</h2>

              {/* Sadapay account card */}
              <div className="border border-shop-border bg-white">
                <div className="bg-cream border-b border-shop-border px-5 py-3 flex items-center justify-between">
                  <span className="font-sans text-xs uppercase tracking-widest text-shop-muted">Online Transfer</span>
                  <span className="font-sans text-xs font-medium text-ink bg-ink/5 px-2 py-0.5">Sadapay</span>
                </div>
                <div className="px-5 py-5 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-sans text-xs text-shop-muted uppercase tracking-wider mb-1">Account Number</p>
                      <p className="font-sans text-base font-semibold text-ink tracking-wide">{SADAPAY_NUMBER}</p>
                    </div>
                    <div>
                      <p className="font-sans text-xs text-shop-muted uppercase tracking-wider mb-1">Account Name</p>
                      <p className="font-sans text-sm font-medium text-ink">{SADAPAY_NAME}</p>
                    </div>
                  </div>

                  <div className="border-t border-shop-border pt-4">
                    <label className="block font-sans text-sm text-ink mb-1.5">
                      Transaction ID / Reference <span className="text-sale-red">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={paymentReference}
                      onChange={(e) => setPaymentReference(e.target.value)}
                      placeholder="Enter your Sadapay transaction ID"
                      className="w-full border border-shop-border bg-shop-bg px-4 py-2.5 font-sans text-sm text-shop-text focus:outline-none focus:border-ink"
                    />
                    <p className="font-sans text-xs text-shop-muted mt-2 leading-relaxed">
                      Open your Bank app → send the exact total shown → copy the transaction ID and paste it here.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Order summary */}
          <div>
            <div className="bg-cream border border-shop-border p-6 sticky top-4">
              <h2 className="font-sans font-medium text-ink mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {items.map(({ product }) => (
                  <div key={product.id} className="flex gap-3">
                    <div className="relative w-14 h-16 flex-shrink-0 bg-shop-border overflow-hidden">
                      {product.images[0] && (
                        <Image src={product.images[0]} alt={product.title} fill className="object-cover" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-sans text-xs font-medium text-ink line-clamp-2">{product.title}</p>
                      <p className="font-sans text-xs text-shop-muted">{product.size}</p>
                    </div>
                    <p className="font-sans text-xs text-ink flex-shrink-0">
                      {formatPrice(product.salePrice ?? product.price)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t border-shop-border pt-4 font-sans text-sm">
                <div className="flex justify-between text-shop-muted">
                  <span>Subtotal</span><span>{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-sale-red">
                    <span>Discount</span><span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-shop-muted">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}</span>
                </div>
                <div className="flex justify-between font-medium text-ink border-t border-shop-border pt-2 mt-2">
                  <span>Total</span><span>{formatPrice(finalTotal)}</span>
                </div>
              </div>

              <p className="font-sans text-xs text-shop-muted mt-4 leading-relaxed">
                Send exactly <strong className="text-ink">{formatPrice(finalTotal)}</strong> to the Sadapay account and enter the transaction ID before placing your order.
              </p>

              {error && (
                <p className="font-sans text-xs text-sale-red mt-4" role="alert">{error}</p>
              )}

              <Button type="submit" disabled={loading} className="w-full mt-6">
                {loading ? 'Placing Order...' : 'Place Order'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-shop-bg pt-24 flex items-center justify-center"><div className="w-6 h-6 border-2 border-ink/20 border-t-ink rounded-full animate-spin" /></div>}>
      <CheckoutContent />
    </Suspense>
  )
}
