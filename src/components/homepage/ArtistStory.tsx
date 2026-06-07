'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

export function ArtistStory() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="bg-cream py-28 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Text column */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <p className="font-sans text-xs tracking-[0.35em] uppercase text-rust mb-6">
            Muse By Arshia
          </p>
          <h2 className="font-display text-5xl md:text-6xl font-light text-ink leading-tight mb-8">
            A journey
            <br />
            <em className="font-accent italic text-dusty-rose">through paint.</em>
          </h2>
          <p className="font-sans font-light text-ink/60 text-base leading-relaxed mb-6">
            Medicine taught me how the body works. Art taught me how feelings look. As a medical
            student, I found painting not as an escape from studying, but as the other half of
            understanding what it means to be human. In anatomy I learned what lies beneath the
            skin — in painting, I discovered what lies beneath expression.
          </p>
          <p className="font-sans font-light text-ink/60 text-base leading-relaxed mb-10">
            Every canvas becomes a conversation between science and emotion, between precision
            and intuition. Each brushstroke carries something that words — and textbooks — could
            never fully hold.
          </p>
          <a
            href="/about"
            className="inline-flex items-center gap-3 font-sans text-sm tracking-widest uppercase text-ink hover:text-rust transition-colors"
          >
            <span className="border-b border-current pb-0.5">Meet the Artist</span>
            <span aria-hidden="true">→</span>
          </a>
        </motion.div>

        {/* Image column */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          className="relative"
        >
          {/* Decorative offset frame */}
          <div className="hidden md:block absolute -top-4 -right-4 w-full h-full border border-gold/30" aria-hidden="true" />
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="/images/artist-portrait.jpg"
              alt="The artist at work"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/20 to-transparent" />
          </div>
          {/* Floating caption */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute -bottom-5 -left-5 bg-cream px-5 py-3 shadow-sm border border-shop-border"
          >
            <p className="font-accent italic text-rust text-sm">Original works only.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
