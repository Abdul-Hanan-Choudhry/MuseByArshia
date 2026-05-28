'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/types'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}

const item = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' as const } },
}

export function GalleryGrid({ paintings }: { paintings: Product[] }) {
  if (!paintings.length) {
    return (
      <div className="flex flex-col items-center py-24 gap-6">
        <div className="relative w-48 h-48 opacity-30">
          <Image src="/images/placeholder.jpg" alt="No paintings" fill className="object-cover" />
        </div>
        <p className="font-sans text-ink/40 tracking-wide">No paintings available yet.</p>
      </div>
    )
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
    >
      {paintings.map((painting) => (
        <motion.div key={painting.id} variants={item}>
          <Link href={`/product/${painting.slug}`} className="block group">
            <div className="relative aspect-[3/4] overflow-hidden bg-[#E8E0D4]">
              <Image
                src={painting.images[0] ?? '/images/placeholder.jpg'}
                alt={painting.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              />

              {/* Permanent subtle bottom gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-ink/10 to-transparent" />

              {/* Hover tint */}
              <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/15 transition-colors duration-500" />

              {/* Sold badge */}
              {painting.isSoldOut && (
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-ink font-sans text-[10px] tracking-[0.2em] uppercase px-3 py-1">
                  Sold
                </div>
              )}

              {/* Bottom info */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="font-display text-lg text-cream leading-snug mb-1 drop-shadow-sm">
                  {painting.title}
                </p>
                <div className="overflow-hidden h-5">
                  <p className="font-sans text-sm text-cream/70 translate-y-full group-hover:translate-y-0 transition-transform duration-400">
                    {painting.isSoldOut
                      ? 'Sold'
                      : `Rs. ${(painting.salePrice ?? painting.price).toLocaleString()}`}
                  </p>
                </div>
                <div className="h-px bg-rust/80 w-0 group-hover:w-full transition-all duration-500 mt-2" />
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  )
}
