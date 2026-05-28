'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { LayoutDashboard, Package, ShoppingBag, Tag, Megaphone, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingBag },
  { label: 'Discounts', href: '/admin/discounts', icon: Tag },
  { label: 'Banners', href: '/admin/banners', icon: Megaphone },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-ink text-cream flex flex-col">
      <div className="px-6 py-6 border-b border-cream/10">
        <Link href="/admin" className="font-display text-xl font-light tracking-widest">
          Admin
        </Link>
        <p className="font-sans text-xs text-cream/40 mt-1">Painter&apos;s Store</p>
      </div>

      <nav className="flex-1 px-4 py-4">
        {NAV.map((item) => {
          const Icon = item.icon
          const isActive =
            item.href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-sm font-sans text-sm transition-colors mb-1',
                isActive
                  ? 'bg-rust text-cream'
                  : 'text-cream/60 hover:text-cream hover:bg-cream/10'
              )}
            >
              <Icon size={16} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="px-4 py-4 border-t border-cream/10">
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="flex items-center gap-3 px-3 py-2.5 w-full font-sans text-sm text-cream/60 hover:text-cream rounded-sm hover:bg-cream/10 transition-colors"
        >
          <LogOut size={16} />
          Sign Out
        </button>
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 w-full font-sans text-sm text-cream/60 hover:text-cream rounded-sm hover:bg-cream/10 transition-colors mt-1"
          target="_blank"
        >
          ↗ View Store
        </Link>
      </div>
    </aside>
  )
}
