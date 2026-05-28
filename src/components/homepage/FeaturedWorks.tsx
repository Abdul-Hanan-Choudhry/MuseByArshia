'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/types'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
}

export function FeaturedWorks({ paintings }: { paintings: Product[] }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  if (!paintings.length) return null

  return (
    <section className="bg-[#F0EBE0] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <h2 className="font-display text-5xl font-light text-ink">Art Works</h2>
          <Link
            href="/gallery"
            className="font-sans text-sm tracking-wide text-ink/60 hover:text-rust transition-colors"
          >
            View All →
          </Link>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {paintings.slice(0, 3).map((p) => (
            <motion.div
              key={p.id}
              variants={itemVariants}
              className="relative aspect-[3/4] overflow-hidden group"
            >
              <Link href={`/product/${p.slug}`} className="block h-full">
                <Image
                  src={p.images[0] ?? '/images/placeholder.jpg'}
                  alt={p.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-4 left-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="font-display text-base text-cream">{p.title}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-8 text-center"
        >
          <Link
            href="/gallery"
            className="inline-block border border-ink text-ink font-sans text-sm tracking-widest px-10 py-3 hover:bg-ink hover:text-cream transition-all duration-300"
          >
            View Gallery
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
