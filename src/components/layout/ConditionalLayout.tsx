'use client'
import { usePathname } from 'next/navigation'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { CartDrawer } from './CartDrawer'
import { SaleBanner } from './SaleBanner'
import { HeaderSpacer } from './HeaderSpacer'
import type { SaleBanner as SaleBannerType } from '@/types'

export function ConditionalLayout({
  children,
  banner,
}: {
  children: React.ReactNode
  banner: SaleBannerType | null
}) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')

  if (isAdmin) return <>{children}</>

  return (
    <>
      <div id="site-header" className="fixed top-0 left-0 right-0 z-40">
        <SaleBanner banner={banner} />
        <Navbar />
      </div>
      <HeaderSpacer />
      {children}
      <Footer />
      <CartDrawer />
    </>
  )
}
