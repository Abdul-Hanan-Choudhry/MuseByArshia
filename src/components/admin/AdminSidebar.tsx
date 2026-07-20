'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { LayoutDashboard, Package, ShoppingBag, Tag, Megaphone, Award, LogOut, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingBag },
  { label: 'Certificate', href: '/admin/certificate', icon: Award },
  { label: 'Discounts', href: '/admin/discounts', icon: Tag },
  { label: 'Banners', href: '/admin/banners', icon: Megaphone },
]

function NavLinks({ onNav }: { onNav?: () => void }) {
  const pathname = usePathname()
  return (
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
            onClick={onNav}
            className={cn(
              'flex items-center gap-3 px-3 py-3 rounded-sm font-sans text-sm transition-colors mb-1',
              isActive
                ? 'bg-rust text-cream'
                : 'text-cream/60 hover:text-cream hover:bg-cream/10'
            )}
          >
            <Icon size={18} />
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}

function SidebarFooter({ onNav }: { onNav?: () => void }) {
  return (
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
        onClick={onNav}
        className="flex items-center gap-3 px-3 py-2.5 w-full font-sans text-sm text-cream/60 hover:text-cream rounded-sm hover:bg-cream/10 transition-colors mt-1"
        target="_blank"
      >
        ↗ View Store
      </Link>
    </div>
  )
}

export function AdminSidebar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <>
      {/* Mobile top bar */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-ink text-cream flex items-center justify-between px-4 border-b border-cream/10">
        <Link href="/admin" className="font-display text-xl font-light tracking-widest">
          Admin
        </Link>
        <button
          onClick={() => setOpen(true)}
          className="p-2 text-cream/70 hover:text-cream -mr-1"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpen(false)}
          />
          <aside className="relative w-72 max-w-[85vw] bg-ink text-cream flex flex-col h-full shadow-2xl">
            <div className="px-6 py-5 border-b border-cream/10 flex items-center justify-between">
              <div>
                <p className="font-display text-xl font-light tracking-widest">Admin</p>
                <p className="font-sans text-xs text-cream/40 mt-1">Painter&apos;s Store</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1 text-cream/60 hover:text-cream"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            <NavLinks onNav={() => setOpen(false)} />
            <SidebarFooter onNav={() => setOpen(false)} />
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-ink text-cream flex-col">
        <div className="px-6 py-6 border-b border-cream/10">
          <Link href="/admin" className="font-display text-xl font-light tracking-widest">
            Admin
          </Link>
          <p className="font-sans text-xs text-cream/40 mt-1">Painter&apos;s Store</p>
        </div>
        <NavLinks />
        <SidebarFooter />
      </aside>
    </>
  )
}
