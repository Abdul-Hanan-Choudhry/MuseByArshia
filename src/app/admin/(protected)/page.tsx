import Link from 'next/link'
import { prisma } from '@/lib/prisma'

async function getStats() {
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  const [totalOrders, revenue, totalProducts, soldProducts, activeDiscounts, recentOrders] =
    await Promise.all([
      prisma.order.count({ where: { createdAt: { gte: startOfMonth } } }),
      prisma.order.aggregate({
        where: { createdAt: { gte: startOfMonth }, status: { not: 'CANCELLED' } },
        _sum: { total: true },
      }),
      prisma.product.count({ where: { isVisible: true } }),
      prisma.product.count({ where: { isSoldOut: true } }),
      prisma.discountCode.count({ where: { isActive: true } }),
      prisma.order.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: { items: { include: { product: { select: { title: true } } } } },
      }),
    ])

  return { totalOrders, revenue: revenue._sum.total ?? 0, totalProducts, soldProducts, activeDiscounts, recentOrders }
}

const STATUS_COLORS: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  CONFIRMED: 'bg-blue-100 text-blue-800',
  PROCESSING: 'bg-purple-100 text-purple-800',
  SHIPPED: 'bg-indigo-100 text-indigo-800',
  DELIVERED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800',
}

export default async function AdminDashboard() {
  const stats = await getStats()

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-900">Dashboard</h1>
        <Link
          href="/admin/products"
          className="bg-ink text-cream font-sans text-sm px-4 py-2 hover:bg-rust transition-colors"
        >
          + Add Painting
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
        {[
          { label: 'Orders this month', value: stats.totalOrders },
          { label: 'Revenue (PKR)', value: `Rs. ${stats.revenue.toLocaleString()}` },
          { label: 'Listings', value: `${stats.soldProducts} sold / ${stats.totalProducts}` },
          { label: 'Promo codes', value: stats.activeDiscounts },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-gray-200 p-4 md:p-5 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
            <p className="text-lg md:text-xl font-semibold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-4 md:px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="font-semibold text-gray-900">Recent Orders</h2>
          <Link href="/admin/orders" className="text-sm text-rust hover:underline">
            View all
          </Link>
        </div>

        {/* Mobile card list */}
        <div className="md:hidden divide-y divide-gray-100">
          {stats.recentOrders.map((order) => (
            <Link
              key={order.id}
              href={`/admin/orders/${order.id}`}
              className="block px-4 py-3 hover:bg-gray-50 active:bg-gray-50"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-rust">{order.orderNumber}</span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_COLORS[order.status] ?? ''}`}>
                  {order.status}
                </span>
              </div>
              <p className="text-sm text-gray-900">{order.customerName}</p>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-500">{order.city}</span>
                <span className="text-sm font-medium text-gray-900">Rs. {order.total.toLocaleString()}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {['Order #', 'Customer', 'Items', 'Total', 'Payment', 'Status', 'Date'].map((h) => (
                  <th key={h} className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stats.recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <Link href={`/admin/orders/${order.id}`} className="text-sm font-medium text-rust hover:underline">
                      {order.orderNumber}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900">{order.customerName}</p>
                    <p className="text-xs text-gray-500">{order.city}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.items.length}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    Rs. {order.total.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.paymentMethod}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${STATUS_COLORS[order.status] ?? ''}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500">
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
