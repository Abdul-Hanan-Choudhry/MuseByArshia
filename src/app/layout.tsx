import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans, Playfair_Display, Great_Vibes } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import { ConditionalLayout } from '@/components/layout/ConditionalLayout'
import type { SaleBanner as SaleBannerType } from '@/types'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-sans',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  style: ['italic'],
  weight: ['400', '700'],
  variable: '--font-accent',
  display: 'swap',
})

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-script',
  display: 'swap',
})

const BASE_URL = (process.env.NEXTAUTH_URL ?? 'https://musebyarshia.vercel.app').replace(/\/$/, '')

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Muse By Arshia — Original Paintings',
    template: '%s | Muse By Arshia',
  },
  description:
    'Handcrafted original paintings by Shanzay Arshia, shipped across Pakistan. One-of-a-kind art for your home.',
  keywords: [
    'original paintings Pakistan',
    'buy original art online Pakistan',
    'handmade paintings',
    'acrylic paintings',
    'Pakistani artist',
    'original artwork',
    'Muse By Arshia',
    'Shanzay Arshia',
  ],
  authors: [{ name: 'Shanzay Arshia' }],
  creator: 'Shanzay Arshia',
  openGraph: {
    type: 'website',
    locale: 'en_PK',
    url: BASE_URL,
    siteName: 'Muse By Arshia',
    title: 'Muse By Arshia — Original Paintings',
    description: 'Handcrafted original paintings by Shanzay Arshia, shipped across Pakistan.',
    images: [{ url: '/images/About.jpeg', width: 1200, height: 630, alt: 'Muse By Arshia — Original Paintings' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muse By Arshia — Original Paintings',
    description: 'Handcrafted original paintings by Shanzay Arshia, shipped across Pakistan.',
    images: ['/images/About.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

async function getBanner(): Promise<SaleBannerType | null> {
  try {
    const base = process.env.NEXTAUTH_URL ?? 'http://localhost:3000'
    const res = await fetch(`${base}/api/banners`, { cache: 'no-store' })
    if (!res.ok) return null
    const data = await res.json()
    return data.banner ?? null
  } catch {
    return null
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const banner = await getBanner()

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} ${playfair.variable} ${greatVibes.variable}`}
    >
      <body className="antialiased">
        <CartProvider>
          <ConditionalLayout banner={banner}>
            {children}
          </ConditionalLayout>
        </CartProvider>
      </body>
    </html>
  )
}
