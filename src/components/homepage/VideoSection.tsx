'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export function VideoSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="relative h-[80vh] overflow-hidden">
      {/* Fallback background image shown beneath the video */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/video-bg.jpg')" }}
        aria-hidden="true"
      />
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      >
        <source
          src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/homepage-reel.mp4`}
          type="video/mp4"
        />
      </video>

      <div className="absolute inset-0 bg-ink/55" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="font-accent italic text-cream/80 text-2xl md:text-3xl mb-6"
        >
          &ldquo;Art is not what you see,
          <br />
          but what you make others see.&rdquo;
        </motion.p>
        <motion.a
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 1 }}
          href="/shop"
          className="font-sans text-sm tracking-[0.25em] text-cream border border-cream/60 px-10 py-3 hover:bg-cream hover:text-ink transition-all duration-300"
        >
          SHOP ORIGINALS
        </motion.a>
      </div>
    </section>
  )
}
