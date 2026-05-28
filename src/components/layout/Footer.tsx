import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-ink text-cream/70 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <div className="mb-4 leading-none">
            <span className="font-script text-4xl text-cream block">Muse</span>
            <span className="font-display text-[10px] tracking-[0.35em] uppercase text-cream/50 pl-0.5">
              by Arshia
            </span>
          </div>
          <p className="font-sans font-light text-sm leading-relaxed">
            Original paintings handcrafted with passion. Each piece is one-of-a-kind and ships
            directly to your door across Pakistan.
          </p>
        </div>

        <div>
          <h4 className="font-sans text-xs tracking-[0.3em] uppercase text-cream/50 mb-4">
            Navigate
          </h4>
          <nav className="flex flex-col gap-2">
            {[
              { label: 'Shop', href: '/shop' },
              { label: 'Gallery', href: '/gallery' },
              { label: 'About', href: '/about' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-sm text-cream/70 hover:text-cream transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <h4 className="font-sans text-xs tracking-[0.3em] uppercase text-cream/50 mb-4">
            Contact
          </h4>
          <p className="font-sans text-sm leading-relaxed">
            Questions? WhatsApp us or send an email and we&apos;ll get back to you within 24 hours.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-cream/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-sans text-xs text-cream/40">
          © {new Date().getFullYear()} Muse By Arshia. All rights reserved.
        </p>
        <p className="font-sans text-xs text-cream/40">Ships across Pakistan</p>
      </div>
    </footer>
  )
}
