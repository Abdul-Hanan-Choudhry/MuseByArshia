'use client'
import { forwardRef } from 'react'
import { Bodoni_Moda, EB_Garamond, Great_Vibes, Montserrat } from 'next/font/google'

/** Exact palette from the reference certificate */
const C = {
  cream: '#F5F2EB',
  gold: '#A68B5B',
  charcoal: '#333333',
  muted: '#5C564F',
  blush: 'rgba(212, 165, 140, 0.45)',
  wash: 'rgba(196, 168, 130, 0.32)',
}

/** High-contrast Didot/Bodoni italic — brand + artwork title */
const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
})

/** Classic book serif — body copy + detail values */
const garamond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
})

/** Clean spaced caps — ORIGINAL ARTWORK / CERTIFICATE / labels */
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
})

/** Fluid script — artist signature */
const vibes = Great_Vibes({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
})

export interface CertificateData {
  title: string
  name: string
  year: string
  size: string
  medium: string
  issueDate: string
}

interface Props {
  data: CertificateData
}

function BotanicalCorner({ flip }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 280 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute w-[280px] h-[280px] pointer-events-none ${
        flip ? 'top-0 right-0 rotate-180' : 'bottom-0 left-0'
      }`}
      aria-hidden
    >
      <ellipse cx="50" cy="230" rx="120" ry="90" fill="#D4A58C" fillOpacity="0.5" />
      <ellipse cx="90" cy="200" rx="70" ry="55" fill="#C4A882" fillOpacity="0.28" />
      <ellipse cx="40" cy="200" rx="40" ry="50" fill="#A68B5B" fillOpacity="0.15" />
      <path d="M45 250 C70 180 110 150 155 95" stroke="#A68B5B" strokeWidth="1.4" strokeOpacity="0.5" />
      <path d="M70 245 C95 190 130 170 165 130" stroke="#A68B5B" strokeWidth="1.1" strokeOpacity="0.38" />
      <path d="M55 240 C80 200 100 180 125 155" stroke="#A68B5B" strokeWidth="1" strokeOpacity="0.32" />
      <ellipse cx="152" cy="92" rx="18" ry="28" transform="rotate(-40 152 92)" fill="#A68B5B" fillOpacity="0.4" />
      <ellipse cx="130" cy="125" rx="14" ry="24" transform="rotate(-25 130 125)" fill="#A68B5B" fillOpacity="0.35" />
      <ellipse cx="108" cy="155" rx="12" ry="20" transform="rotate(-15 108 155)" fill="#8F7350" fillOpacity="0.3" />
      <ellipse cx="168" cy="128" rx="13" ry="22" transform="rotate(15 168 128)" fill="#A68B5B" fillOpacity="0.28" />
      <ellipse cx="88" cy="185" rx="11" ry="18" transform="rotate(-8 88 185)" fill="#8F7350" fillOpacity="0.28" />
      <circle cx="62" cy="210" r="7" fill="#C4876E" fillOpacity="0.48" />
      <circle cx="78" cy="195" r="5" fill="#C4876E" fillOpacity="0.38" />
      <circle cx="95" cy="175" r="4" fill="#A68B5B" fillOpacity="0.4" />
    </svg>
  )
}

export const CertificateOfAuthenticity = forwardRef<HTMLDivElement, Props>(
  function CertificateOfAuthenticity({ data }, ref) {
    const title = data.title.trim() || 'Untitled'
    const name = data.name.trim() || 'Shanzay Arshia'
    const year = data.year.trim() || '—'
    const size = data.size.trim() || '—'
    const medium = data.medium.trim() || '—'
    const issueDate = data.issueDate.trim() || '—'

    const details = [
      { label: 'Name', value: name },
      { label: 'Year', value: year },
      { label: 'Dimension', value: size },
      { label: 'Medium', value: medium },
    ]

    return (
      <div
        ref={ref}
        className={`relative w-[794px] h-[1123px] overflow-hidden select-none ${montserrat.className}`}
        style={{ backgroundColor: C.cream, color: C.charcoal }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 10% 90%, ${C.blush} 0%, transparent 40%), radial-gradient(ellipse at 92% 6%, ${C.wash} 0%, transparent 36%)`,
          }}
        />

        <BotanicalCorner />
        <BotanicalCorner flip />

        {/* Double gold border */}
        <div className="absolute inset-[24px]" style={{ border: `1.5px solid ${C.gold}` }} />
        <div className="absolute inset-[32px]" style={{ border: `1px solid ${C.gold}` }} />

        {[
          'top-[18px] left-[18px]',
          'top-[18px] right-[18px]',
          'bottom-[18px] left-[18px]',
          'bottom-[18px] right-[18px]',
        ].map((pos) => (
          <div key={pos} className={`absolute ${pos} w-3 h-3 rotate-45`} style={{ backgroundColor: C.gold }} />
        ))}

        <div className="relative z-10 h-full flex flex-col items-center px-[80px] pt-[68px] pb-[48px]">
          {/* ORIGINAL ARTWORK — spaced gold caps */}
          <p
            className="text-[10px] tracking-[0.5em] uppercase font-medium mb-3"
            style={{ color: C.gold }}
          >
            Original Artwork
          </p>

          {/* Muse by Arshia — Bodoni italic */}
          <h1
            className={`${bodoni.className} text-[48px] font-normal italic leading-none tracking-wide`}
            style={{ color: C.charcoal }}
          >
            Muse by Arshia
          </h1>

          <div className="flex items-center gap-3 my-5 w-[280px]">
            <div className="flex-1 h-px" style={{ backgroundColor: C.gold }} />
            <div className="w-[7px] h-[7px] rotate-45" style={{ backgroundColor: C.gold }} />
            <div className="flex-1 h-px" style={{ backgroundColor: C.gold }} />
          </div>

          {/* CERTIFICATE OF AUTHENTICITY — spaced charcoal caps */}
          <h2
            className="text-[13px] tracking-[0.38em] uppercase font-medium mb-9"
            style={{ color: C.charcoal }}
          >
            Certificate of Authenticity
          </h2>

          {/* Body — classic Garamond */}
          <p
            className={`${garamond.className} text-center text-[16px] leading-[1.85] max-w-[480px] mb-2`}
            style={{ color: C.charcoal }}
          >
            This is to certify that the artwork described below is an original
            painting created entirely by{' '}
            <span className="italic font-semibold" style={{ color: C.gold }}>
              {name}
            </span>
            .
          </p>
          <p
            className={`${garamond.className} text-center text-[15px] leading-[1.7] max-w-[450px] mb-9`}
            style={{ color: C.charcoal }}
          >
            All copyright and reproduction rights are retained by the artist.
          </p>

          {/* Artwork title — Bodoni italic gold */}
          <p
            className={`${bodoni.className} text-[38px] italic leading-snug text-center px-2 mb-10`}
            style={{ color: C.gold }}
          >
            &ldquo;{title}&rdquo;
          </p>

          {/* Details: Label | Value */}
          <div className="w-[380px] space-y-3.5 mb-auto">
            {details.map((item) => (
              <div
                key={item.label}
                className="grid grid-cols-[1fr_16px_1.45fr] items-center"
              >
                <span
                  className="text-[12px] text-right font-medium tracking-wide"
                  style={{ color: C.charcoal }}
                >
                  {item.label}
                </span>
                <span className="text-center text-[14px]" style={{ color: C.gold }}>
                  |
                </span>
                <span
                  className={`${garamond.className} text-[16px] italic pl-1`}
                  style={{ color: C.charcoal }}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          {/* Signature + Date */}
          <div className="w-full max-w-[500px] flex justify-between items-end mt-12 mb-9">
            <div className="text-center w-[210px]">
              <p
                className={`${vibes.className} text-[42px] leading-none mb-0`}
                style={{ color: C.charcoal }}
              >
                Shanzay
              </p>
              <div className="flex items-center gap-2 mb-2 mt-0.5">
                <div className="flex-1 h-px" style={{ backgroundColor: C.gold }} />
                <div className="w-[6px] h-[6px] rotate-45" style={{ backgroundColor: C.gold }} />
                <div className="flex-1 h-px" style={{ backgroundColor: C.gold }} />
              </div>
              <p className="text-[9px] tracking-[0.1em] uppercase" style={{ color: C.gold }}>
                Artist Signature / Shanzay Arshia
              </p>
            </div>

            <div className="text-center w-[180px]">
              <p
                className={`${garamond.className} text-[16px] italic h-10 flex items-end justify-center mb-0`}
                style={{ color: C.charcoal }}
              >
                {issueDate}
              </p>
              <div className="flex items-center gap-2 mb-2 mt-0.5">
                <div className="flex-1 h-px" style={{ backgroundColor: C.gold }} />
                <div className="w-[6px] h-[6px] rotate-45" style={{ backgroundColor: C.gold }} />
                <div className="flex-1 h-px" style={{ backgroundColor: C.gold }} />
              </div>
              <p className="text-[9px] tracking-[0.25em] uppercase" style={{ color: C.gold }}>
                Date
              </p>
            </div>
          </div>

          {/* Oval seal */}
          <div className="relative w-[148px] h-[148px] mb-5 flex items-center justify-center">
            <svg viewBox="0 0 160 160" className="absolute inset-0 w-full h-full" aria-hidden>
              <ellipse cx="80" cy="80" rx="76" ry="76" fill="none" stroke={C.gold} strokeWidth="1.6" />
              <ellipse cx="80" cy="80" rx="70" ry="70" fill="none" stroke={C.gold} strokeWidth="0.7" strokeDasharray="3 2" />
              <path d="M38 48 C52 36, 68 34, 78 42" stroke={C.gold} strokeWidth="0.9" fill="none" />
              <path d="M122 48 C108 36, 92 34, 82 42" stroke={C.gold} strokeWidth="0.9" fill="none" />
              <path d="M38 112 C52 124, 68 126, 78 118" stroke={C.gold} strokeWidth="0.9" fill="none" />
              <path d="M122 112 C108 124, 92 126, 82 118" stroke={C.gold} strokeWidth="0.9" fill="none" />
              <circle cx="80" cy="28" r="2" fill={C.gold} />
              <circle cx="80" cy="132" r="2" fill={C.gold} />
            </svg>
            <div className="relative text-center px-3 z-10">
              <p className="text-[8px] tracking-[0.22em] uppercase leading-snug" style={{ color: C.gold }}>
                Authenticated
                <br />
                Original
              </p>
              <div className="w-9 h-px mx-auto my-2" style={{ backgroundColor: C.gold }} />
              <p className={`${bodoni.className} text-[12px] italic`} style={{ color: C.gold }}>
                Muse by Arshia
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center gap-3 w-[300px]">
            <div className="flex-1 h-px" style={{ backgroundColor: C.gold }} />
            <div className="w-[6px] h-[6px] rotate-45" style={{ backgroundColor: C.gold }} />
            <p className="text-[11px] tracking-[0.12em] whitespace-nowrap" style={{ color: C.muted }}>
              www.musebyarshia.com
            </p>
            <div className="w-[6px] h-[6px] rotate-45" style={{ backgroundColor: C.gold }} />
            <div className="flex-1 h-px" style={{ backgroundColor: C.gold }} />
          </div>
        </div>
      </div>
    )
  }
)
