'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import type { Order } from '@/types'
import { formatPrice } from '@/lib/utils'

const ORDER_STATUSES = ['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED']
const PAYMENT_STATUSES = ['PENDING', 'PAID', 'FAILED', 'REFUNDED']

export default function AdminOrderDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [order, setOrder] = useState<Order | null>(null)
  const [status, setStatus] = useState('')
  const [paymentStatus, setPaymentStatus] = useState('')
  const [trackingNumber, setTrackingNumber] = useState('')
  const [courierName, setCourierName] = useState('')
  const [notes, setNotes] = useState('')
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')

  useEffect(() => {
    fetch(`/api/orders/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setOrder(data)
        setStatus(data.status)
        setPaymentStatus(data.paymentStatus)
        setTrackingNumber(data.trackingNumber ?? '')
        setCourierName(data.courierName ?? '')
        setNotes(data.notes ?? '')
      })
  }, [id])

  const handleSave = async () => {
    setSaving(true)
    setSaveMsg('')
    await fetch(`/api/orders/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, paymentStatus, trackingNumber, courierName, notes }),
    })
    setSaving(false)
    setSaveMsg('Saved')
    setTimeout(() => setSaveMsg(''), 3000)
  }

  if (!order) return <div className="text-sm text-gray-500">Loading...</div>

  return (
    <div>
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-ink mb-6"
      >
        <ArrowLeft size={16} /> Back to orders
      </button>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">{order.orderNumber}</h1>
          <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString('en-PK')}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Customer</h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {[
                ['Name', order.customerName],
                ['Phone', order.customerPhone],
                ['Email', order.customerEmail],
                ['City', order.city],
                ['Address', order.address],
                ['Postal Code', order.postalCode ?? '—'],
                ['Payment', order.paymentMethod],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-xs text-gray-500 mb-0.5">{label}</dt>
                  <dd className="text-gray-900">{value}</dd>
                </div>
              ))}
              {order.paymentReference && (
                <div className="col-span-2">
                  <dt className="text-xs text-gray-500 mb-0.5">Transaction Reference</dt>
                  <dd className="text-gray-900 font-mono font-semibold">{order.paymentReference}</dd>
                </div>
              )}
            </dl>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Items</h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4 items-center">
                  <div className="relative w-14 h-16 bg-gray-100 flex-shrink-0 overflow-hidden">
                    {item.product.images[0] && (
                      <Image src={item.product.images[0]} alt="" fill className="object-cover" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{item.product.title}</p>
                    <p className="text-xs text-gray-500">{item.product.size} · {item.product.medium}</p>
                  </div>
                  <p className="text-sm font-medium">{formatPrice(item.price)}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 border-t pt-4 space-y-1 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span><span>{formatPrice(order.subtotal)}</span>
              </div>
              {order.discountAmount > 0 && (
                <div className="flex justify-between text-sale-red">
                  <span>Discount</span><span>-{formatPrice(order.discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-500">
                <span>Shipping</span><span>{formatPrice(order.shippingCost)}</span>
              </div>
              <div className="flex justify-between font-semibold text-gray-900 border-t pt-2 mt-2">
                <span>Total</span><span>{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Update Order</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Order Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}
                  className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none">
                  {ORDER_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Payment Status</label>
                <select value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)}
                  className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none">
                  {PAYMENT_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Tracking Number</label>
                <input value={trackingNumber} onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="e.g. TCS-123456789"
                  className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Courier Service</label>
                <input value={courierName} onChange={(e) => setCourierName(e.target.value)}
                  placeholder="e.g. TCS, Leopards, Trax"
                  className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
                {status === 'SHIPPED' && (
                  <p className="text-xs text-amber-600 mt-1">A shipping email will be sent to the customer when saved with status SHIPPED.</p>
                )}
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Admin Notes</label>
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3}
                  className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
              </div>
              <button onClick={handleSave} disabled={saving}
                className="w-full bg-ink text-cream text-sm py-2.5 hover:bg-rust transition-colors disabled:opacity-60">
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              {saveMsg && <p className="text-xs text-green-600 text-center">{saveMsg}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
