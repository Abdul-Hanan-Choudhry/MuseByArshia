'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import type { Order } from '@/types'

const STATUS_COLORS: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  CONFIRMED: 'bg-blue-100 text-blue-800',
  PROCESSING: 'bg-purple-100 text-purple-800',
  SHIPPED: 'bg-indigo-100 text-indigo-800',
  DELIVERED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800',
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  useEffect(() => {
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (statusFilter) params.set('status', statusFilter)
    fetch(`/api/orders?${params.toString()}`)
      .then((r) => r.json())
      .then((data) => setOrders(data.orders ?? []))
  }, [search, statusFilter])

  return (
    <div>
      <h1 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">Orders</h1>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by name, phone, or order #"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 px-4 py-2 text-sm flex-1 focus:outline-none focus:border-ink"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:border-ink"
        >
          <option value="">All statuses</option>
          {['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Mobile card list */}
      <div className="md:hidden space-y-3">
        {orders.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-12">No orders found.</p>
        )}
        {orders.map((order) => (
          <Link
            key={order.id}
            href={`/admin/orders/${order.id}`}
            className="block bg-white border border-gray-200 rounded-lg p-4 active:bg-gray-50"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-rust">{order.orderNumber}</span>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_COLORS[order.status] ?? ''}`}>
                {order.status}
              </span>
            </div>
            <p className="text-sm font-medium text-gray-900">{order.customerName}</p>
            <p className="text-xs text-gray-500">{order.customerPhone} · {order.city}</p>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
              <span className="text-sm font-semibold text-gray-900">
                Rs. {order.total.toLocaleString()}
              </span>
              <span className="text-xs text-gray-400">
                {new Date(order.createdAt).toLocaleDateString('en-PK')}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {['Order #', 'Customer', 'City', 'Items', 'Total', 'Payment', 'Status', 'Date'].map((h) => (
                  <th key={h} className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <Link href={`/admin/orders/${order.id}`} className="text-sm font-medium text-rust hover:underline">
                      {order.orderNumber}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-gray-900">{order.customerName}</p>
                    <p className="text-xs text-gray-500">{order.customerPhone}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{order.city}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{order.items.length}</td>
                  <td className="px-4 py-3 text-sm font-medium">Rs. {order.total.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{order.paymentMethod}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${STATUS_COLORS[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString('en-PK')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
