import Image from 'next/image'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream pt-8 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-rust mb-6">
              About
            </p>
            <h1 className="font-display text-5xl md:text-6xl font-light text-ink leading-tight mb-8">
              The story
              <br />
              <em className="font-accent italic">behind the art</em>
            </h1>
            <p className="font-sans font-light text-ink/60 text-base leading-relaxed mb-5">
              Hi, I&apos;m Arshia — a medical student who fell in love with painting while looking
              for a break from textbooks, lectures, and endless hours of studying.
            </p>
            <p className="font-sans font-light text-ink/60 text-base leading-relaxed mb-5">
              What started as a simple escape quickly became something much more. Painting gave
              me a space to slow down, express myself, and create something meaningful with my
              own hands. Every canvas became a reflection of a moment, an emotion, or an idea
              that words couldn&apos;t fully capture.
            </p>
            <p className="font-sans font-light text-ink/60 text-base leading-relaxed mb-5">
              I&apos;ve never attended art school, and I didn&apos;t start painting because I wanted to be
              perfect at it. I started because I genuinely enjoyed the process — the quiet hours
              spent mixing colours, experimenting with new techniques, and watching an idea
              slowly come to life.
            </p>
            <p className="font-sans font-light text-ink/60 text-base leading-relaxed mb-5">
              Balancing medicine and art isn&apos;t always easy, but creating has become one of the
              most rewarding parts of my journey. There&apos;s something special about knowing that a
              piece I made in my room can one day become part of someone else&apos;s home and story.
            </p>
            <p className="font-sans font-light text-ink/60 text-base leading-relaxed mb-10">
              Each painting is created with intention, patience, and care. My hope is that when
              you bring one of my pieces home, you feel a little of the joy, comfort, and meaning
              that went into making it. Thank you for being here and supporting my art.
            </p>
            <p className="font-display text-xl font-light text-ink italic mb-10">— Shanzay Arshia</p>
            <Link
              href="/shop"
              className="inline-block bg-ink text-cream font-sans text-sm tracking-widest px-10 py-4 hover:bg-rust transition-colors duration-300"
            >
              View My Work
            </Link>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="/images/Arshia.jpeg"
              alt="Arshia — the artist"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Commission CTA */}
        <div className="bg-ink text-cream px-10 py-14 mb-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url('/images/Arshia.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
          <div className="relative z-10">
            <p className="font-sans text-xs tracking-[0.35em] uppercase text-gold mb-4">Commissions</p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-cream mb-6 leading-snug">
              A painting made
              <br />
              <em className="font-accent italic text-dusty-rose">just for you.</em>
            </h2>
            <p className="font-sans font-light text-cream/70 text-base leading-relaxed max-w-xl mx-auto mb-8">
              Looking for a commissioned piece or a custom painting created just for you?
              Feel free to reach out through my Instagram — I&apos;d love to bring your idea to life.
            </p>
            <a
              href="https://www.instagram.com/arshiasdiary_?igsh=c2VxeGdvbTV1bWZm"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border border-cream/50 text-cream font-sans text-sm tracking-widest px-10 py-3 hover:bg-cream hover:text-ink transition-all duration-300"
            >
              Message on Instagram
            </a>
          </div>
        </div>

        <div className="border-t border-gold/30 pt-16">
          <h2 className="font-display text-4xl font-light text-ink mb-10 text-center">
            My Process
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Between Medicine & Art',
                desc: 'Most of my days are spent in medicine, but painting is where my mind slows down. Ideas come from emotions I can\'t fully explain — quiet moments, memories, and the comfort I find in colours.',
              },
              {
                step: '02',
                title: 'Creating the Piece',
                desc: 'I paint slowly and intuitively, layering acrylics until the canvas feels alive. Imperfections stay because they make the piece feel human — every artwork carries my mood from the moment it was made.',
              },
              {
                step: '03',
                title: 'What Matters Most',
                desc: 'Art was never about perfection for me — it\'s about making people feel something. Knowing a painting made between stressful study days can bring comfort to someone else\'s room is the most rewarding part of all.',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <p className="font-display text-5xl font-light text-ink/20 mb-4">{item.step}</p>
                <h3 className="font-display text-xl font-light text-ink mb-3">{item.title}</h3>
                <p className="font-sans font-light text-ink/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
