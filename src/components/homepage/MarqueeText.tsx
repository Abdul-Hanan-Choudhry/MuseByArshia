export function MarqueeText() {
  const text =
    'Original Paintings  ·  Handcrafted Art  ·  Ships Across Pakistan  ·  One of a Kind  ·  '
  const repeated = text.repeat(4)

  return (
    <div className="bg-ink py-4 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee" aria-hidden="true">
        <span className="font-display italic text-cream/60 text-xl tracking-wide">
          {repeated}
        </span>
        <span className="font-display italic text-cream/60 text-xl tracking-wide">
          {repeated}
        </span>
      </div>
    </div>
  )
}
