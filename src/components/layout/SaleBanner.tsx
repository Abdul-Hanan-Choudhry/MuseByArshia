'use client'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import type { SaleBanner as SaleBannerType } from '@/types'

interface SaleBannerProps {
  banner: SaleBannerType | null
}

export function SaleBanner({ banner }: SaleBannerProps) {
  const [dismissed, setDismissed] = useState(false)
  const isActive = !!banner && !dismissed

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-ink text-cream overflow-hidden"
        >
          <div className="flex items-center justify-center gap-3 py-2.5 px-4 text-sm font-sans font-medium">
            <span>{banner!.message}</span>
            {banner!.linkUrl && (
              <Link
                href={banner!.linkUrl}
                className="underline underline-offset-2 hover:text-blush transition-colors"
              >
                {banner!.linkText ?? 'Shop Now'}
              </Link>
            )}
            <button
              onClick={() => setDismissed(true)}
              aria-label="Dismiss banner"
              className="ml-2 text-cream/60 hover:text-cream transition-colors"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
