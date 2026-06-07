'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { useCart } from '@/context/CartContext'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About', href: '/about' },
]

export function Navbar() {
  const { scrolled } = useScrollProgress()
  const { openCart, itemCount } = useCart()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const isHomepage = pathname === '/'

  return (
    <>
      <motion.nav
        className={cn(
          'w-full transition-all duration-500',
          scrolled || !isHomepage
            ? 'bg-cream/90 backdrop-blur-md border-b border-gold/30 py-4'
            : 'bg-transparent py-6'
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex flex-col items-start leading-none group">
            <span className="font-script text-4xl text-ink group-hover:text-rust transition-colors duration-300">
              Muse
            </span>
            <span className="font-display text-[10px] tracking-[0.35em] uppercase text-ink/80 -mt-1 pl-0.5">
              by Arshia
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'font-sans text-sm tracking-wide transition-colors',
                  pathname === link.href
                    ? 'text-rust'
                    : 'text-ink/70 hover:text-ink'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={openCart}
              aria-label={`Open cart, ${itemCount} items`}
              className="relative p-2 text-ink/70 hover:text-ink transition-colors"
            >
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-rust text-cream text-[10px] font-sans font-medium w-4 h-4 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            <button
              className="md:hidden p-2 text-ink/70 hover:text-ink"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimateMobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} pathname={pathname} />
    </>
  )
}

function AnimateMobileMenu({
  open,
  onClose,
  pathname,
}: {
  open: boolean
  onClose: () => void
  pathname: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: open ? 1 : 0, x: open ? '0%' : '100%' }}
      transition={{ duration: 0.3 }}
      className={cn(
        'fixed inset-y-0 right-0 z-50 w-72 bg-cream shadow-xl flex flex-col pt-20 px-8',
        !open && 'pointer-events-none'
      )}
    >
      <button onClick={onClose} aria-label="Close menu" className="absolute top-6 right-6">
        <X size={20} />
      </button>
      <nav className="flex flex-col gap-6">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className={cn(
              'font-display text-2xl font-light',
              pathname === link.href ? 'text-rust' : 'text-ink'
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </motion.div>
  )
}
