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

const PAYMENT_METHODS = [
  { value: 'COD', label: 'Cash on Delivery', desc: 'Pay when you receive' },
  { value: 'JAZZCASH', label: 'JazzCash', desc: 'Send to our number' },
  { value: 'EASYPAISA', label: 'EasyPaisa', desc: 'Send to our number' },
  { value: 'BANK_TRANSFER', label: 'Bank Transfer', desc: 'Manual confirmation' },
]

function CheckoutContent() {
  const { items, subtotal, clearCart } = useCart()
  const searchParams = useSearchParams()
  const router = useRouter()

  const discountId = searchParams.get('discountId') ?? undefined
  const discountAmount = parseInt(searchParams.get('discountAmount') ?? '0')

  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '', city: '', postalCode: '',
  })
  const [paymentMethod, setPaymentMethod] = useState('COD')
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
        paymentMethod,
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

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-10">
          <div className="space-y-6">
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

            <div>
              <h2 className="font-sans font-medium text-ink mb-4">Payment Method</h2>
              <div className="space-y-3">
                {PAYMENT_METHODS.map((method) => (
                  <label
                    key={method.value}
                    className={`flex items-start gap-3 border p-4 cursor-pointer transition-colors ${
                      paymentMethod === method.value
                        ? 'border-ink bg-cream'
                        : 'border-shop-border bg-white hover:border-ink/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.value}
                      checked={paymentMethod === method.value}
                      onChange={() => setPaymentMethod(method.value)}
                      className="mt-0.5"
                    />
                    <div>
                      <p className="font-sans text-sm font-medium text-ink">{method.label}</p>
                      <p className="font-sans text-xs text-shop-muted">{method.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

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
