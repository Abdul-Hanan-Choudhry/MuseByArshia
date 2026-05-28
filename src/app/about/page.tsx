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
            <p className="font-sans font-light text-ink/60 text-base leading-relaxed mb-6">
              Art has always been more than a craft — it is a conversation between feeling and
              form. Every canvas begins with an emotion, a colour seen in passing light, a
              texture felt in a quiet moment.
            </p>
            <p className="font-sans font-light text-ink/60 text-base leading-relaxed mb-6">
              Born and raised with a deep love for colour and texture, my journey into painting
              began as a way to process the world around me. What started as a hobby has grown
              into a passion that shapes every waking moment.
            </p>
            <p className="font-sans font-light text-ink/60 text-base leading-relaxed mb-10">
              Each painting is made with intention, care, and love. I hope they bring as much
              joy to your home as they brought me in their creation.
            </p>
            <Link
              href="/shop"
              className="inline-block bg-ink text-cream font-sans text-sm tracking-widest px-10 py-4 hover:bg-rust transition-colors duration-300"
            >
              View My Work
            </Link>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="/images/About.jpg"
              alt="The artist at work"
              fill
              className="object-cover"
            />
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
                title: 'Inspiration',
                desc: 'Every piece begins with a feeling or a memory — a colour encountered in an unexpected place, a moment of stillness, or a dream.',
              },
              {
                step: '02',
                title: 'Creation',
                desc: 'I work primarily with oils and acrylics on canvas. Each layer is applied slowly, allowing the composition to breathe and evolve naturally.',
              },
              {
                step: '03',
                title: 'Completion',
                desc: 'A painting is finished when it speaks for itself — when there is nothing left to add and nothing left to take away.',
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
