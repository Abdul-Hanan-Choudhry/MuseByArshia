'use client'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function HeroSection() {
  const imageRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }
    })
    return () => ctx.revert()
  }, [])

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden bg-ink flex items-center">
      {/* Full-bleed painting image with parallax */}
      <div ref={imageRef} className="absolute inset-0 w-full h-[115%] top-[-7.5%]">
        <Image
          src="/images/hero-painting.jpg"
          alt="Featured original painting"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
        {/* Dark vignette overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/30 to-ink/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/20" />
      </div>

      {/* Decorative left border line */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.2, duration: 1.2, ease: 'easeOut' }}
        className="absolute left-8 md:left-20 top-1/4 bottom-1/4 w-px bg-cream/25 origin-top"
      />

      {/* Hero text */}
      <div ref={textRef} className="relative z-10 px-8 md:px-20 max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-sans text-xs tracking-[0.35em] uppercase text-blush mb-6"
        >
          Original Paintings · Handcrafted in Pakistan
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1.1, ease: 'easeOut' as const }}
          className="font-display text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-light leading-none text-cream mb-4"
        >
          Art that
          <br />
          <em className="font-accent italic text-blush">moves you.</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 1 }}
          className="font-sans font-light text-cream/65 text-base md:text-lg leading-relaxed mb-12 max-w-md"
        >
          One-of-a-kind originals, each painted by hand —
          <br className="hidden md:block" />
          shipped to your door across Pakistan.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="flex items-center gap-6"
        >
          <a
            href="/shop"
            className="inline-block bg-cream text-ink font-sans text-xs tracking-[0.25em] uppercase px-10 py-4 hover:bg-blush hover:text-ink transition-colors duration-300"
          >
            Shop Originals
          </a>
          <a
            href="/gallery"
            className="font-sans text-xs tracking-[0.2em] uppercase text-cream/70 border-b border-cream/30 pb-0.5 hover:text-cream hover:border-cream transition-colors duration-300"
          >
            View Gallery
          </a>
        </motion.div>
      </div>

      {/* Bottom scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-cream/40"
        aria-hidden="true"
      >
        <div className="w-px h-10 bg-cream/30" />
        <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
          <path d="M1 1l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </motion.div>
    </section>
  )
}
