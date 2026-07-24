'use client'
import { forwardRef } from 'react'
import { Libre_Baskerville, EB_Garamond, Great_Vibes, Montserrat } from 'next/font/google'

const C = {
  cream: '#F5F0E1',
  gold: '#C9A227',
  goldDeep: '#8B6914',
  goldLight: '#E8D48B',
  goldMid: '#D4AF37',
  charcoal: '#3C3631',
  muted: '#6B635A',
}

const baskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const garamond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
})

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

function Divider() {
  return (
    <div className="flex items-center gap-3 w-[340px] my-3">
      <div className="flex-1 h-[2px]" style={{ backgroundColor: C.goldMid }} />
      <div className="w-[10px] h-[10px] rotate-45 shrink-0" style={{ backgroundColor: C.goldMid }} />
      <div className="flex-1 h-[2px]" style={{ backgroundColor: C.goldMid }} />
    </div>
  )
}

function GoldSeal() {
  return (
    <div className="relative w-[220px] h-[220px] flex items-center justify-center shrink-0">
      <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full drop-shadow-md" aria-hidden>
        <defs>
          <radialGradient id="sealGoldFill" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#FFF6D0" />
            <stop offset="35%" stopColor={C.goldLight} />
            <stop offset="65%" stopColor={C.goldMid} />
            <stop offset="100%" stopColor={C.goldDeep} />
          </radialGradient>
          <linearGradient id="sealGoldRing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF3C4" />
            <stop offset="50%" stopColor={C.goldMid} />
            <stop offset="100%" stopColor={C.goldDeep} />
          </linearGradient>
          <path id="sealTop" d="M 36,100 A 64,64 0 0,1 164,100" fill="none" />
          <path id="sealBottom" d="M 34,104 A 66,66 0 0,0 166,104" fill="none" />
        </defs>

        <ellipse cx="100" cy="100" rx="96" ry="96" fill="url(#sealGoldFill)" />
        <ellipse cx="100" cy="100" rx="96" ry="96" fill="none" stroke="url(#sealGoldRing)" strokeWidth="4" />
        <ellipse
          cx="100"
          cy="100"
          rx="88"
          ry="88"
          fill="none"
          stroke="#FFF6D0"
          strokeWidth="1.5"
          strokeDasharray="2.6 2.8"
        />
        <ellipse cx="100" cy="100" rx="80" ry="80" fill="none" stroke={C.goldDeep} strokeWidth="1" opacity="0.75" />

        <text fill="#FDF8EC" fontSize="10.5" letterSpacing="3.2" fontFamily="Montserrat, Arial, sans-serif" fontWeight="700">
          <textPath href="#sealTop" startOffset="50%" textAnchor="middle">
            AUTHENTICATED
          </textPath>
        </text>
        <text fill="#FDF8EC" fontSize="9" letterSpacing="2.1" fontFamily="Montserrat, Arial, sans-serif" fontWeight="700">
          <textPath href="#sealBottom" startOffset="50%" textAnchor="middle">
            MUSE BY ARSHIA
          </textPath>
        </text>

        <path d="M58 84 C72 72, 86 70, 94 78" stroke="#FDF8EC" strokeWidth="1.2" fill="none" />
        <path d="M142 84 C128 72, 114 70, 106 78" stroke="#FDF8EC" strokeWidth="1.2" fill="none" />
        <path d="M58 122 C72 134, 86 136, 94 128" stroke="#FDF8EC" strokeWidth="1.2" fill="none" />
        <path d="M142 122 C128 134, 114 136, 106 128" stroke="#FDF8EC" strokeWidth="1.2" fill="none" />
        <circle cx="100" cy="42" r="2.4" fill="#FDF8EC" />
        <circle cx="100" cy="158" r="2.4" fill="#FDF8EC" />
      </svg>
      <p
        className={`${baskerville.className} relative z-10 text-[20px] tracking-[0.2em] font-bold`}
        style={{ color: '#FDF8EC', textShadow: '0 1px 3px rgba(80,50,0,0.4)' }}
      >
        ORIGINAL
      </p>
    </div>
  )
}

/** Large portrait certificate — not locked to A4; borders stay fully inside */
export const CertificateOfAuthenticity = forwardRef<HTMLDivElement, Props>(
  function CertificateOfAuthenticity({ data }, ref) {
    const title = data.title.trim() || 'Untitled'
    const name = data.name.trim() || 'Shanzay Arshia'
    const year = data.year.trim() || '—'
    const size = data.size.trim() || '—'
    const medium = data.medium.trim() || '—'
    const issueDate = data.issueDate.trim() || '—'

    const details = [
      { label: 'Medium', value: medium },
      { label: 'Dimensions', value: size },
      { label: 'Year', value: year },
    ]

    return (
      <div
        ref={ref}
        className={`relative select-none ${montserrat.className}`}
        style={{
          width: 1000,
          height: 1400,
          backgroundColor: C.cream,
          color: C.charcoal,
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/certificate-bg.png"
          alt=""
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ objectFit: 'fill' }}
          draggable={false}
        />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 40%, rgba(245,240,225,0.92) 0%, rgba(245,240,225,0.55) 50%, transparent 78%)',
          }}
        />

        {/* Outer cream edge so border never clips */}
        <div className="absolute inset-0 pointer-events-none z-[4]" style={{ border: `18px solid ${C.cream}` }} />

        {/* Clear double gold border — fully inside the page */}
        <div
          className="absolute pointer-events-none z-[5]"
          style={{ inset: 28, border: `2px solid ${C.goldMid}` }}
        />
        <div
          className="absolute pointer-events-none z-[5]"
          style={{ inset: 38, border: `1.5px solid ${C.gold}` }}
        />

        {/* Corner diamonds on outer border */}
        {[
          { top: 24, left: 24 },
          { top: 24, right: 24 },
          { bottom: 24, left: 24 },
          { bottom: 24, right: 24 },
        ].map((pos, i) => (
          <div
            key={i}
            className="absolute z-[6] w-3 h-3 rotate-45"
            style={{ ...pos, backgroundColor: C.goldMid }}
          />
        ))}

        {/* Midpoint diamonds */}
        <div className="absolute z-[6] w-2.5 h-2.5 rotate-45 left-1/2 -translate-x-1/2" style={{ top: 24, backgroundColor: C.goldMid }} />
        <div className="absolute z-[6] w-2.5 h-2.5 rotate-45 left-1/2 -translate-x-1/2" style={{ bottom: 24, backgroundColor: C.goldMid }} />
        <div className="absolute z-[6] w-2.5 h-2.5 rotate-45 top-1/2 -translate-y-1/2" style={{ left: 24, backgroundColor: C.goldMid }} />
        <div className="absolute z-[6] w-2.5 h-2.5 rotate-45 top-1/2 -translate-y-1/2" style={{ right: 24, backgroundColor: C.goldMid }} />

        {/* Content — stacked evenly (no hollow center from justify-between) */}
        <div
          className="relative z-10 flex flex-col items-center"
          style={{ padding: '72px 80px 64px' }}
        >
          <p
            className="text-[15px] tracking-[0.5em] uppercase font-semibold mb-4"
            style={{ color: C.goldMid }}
          >
            Original Artwork
          </p>

          <h1
            className={`${baskerville.className} text-[64px] italic font-normal leading-none tracking-wide`}
            style={{ color: C.charcoal }}
          >
            Muse by Arshia
          </h1>

          <Divider />

          <h2
            className="text-[20px] tracking-[0.34em] uppercase font-semibold mb-8"
            style={{ color: C.charcoal }}
          >
            Certificate of Authenticity
          </h2>

          <p
            className={`${garamond.className} text-center text-[24px] leading-[1.65] max-w-[700px] mb-3`}
            style={{ color: C.charcoal }}
          >
            This is to certify that the artwork described below is an original
            painting created entirely by{' '}
            <span className={`${baskerville.className} italic`} style={{ color: C.goldMid }}>
              {name}
            </span>
            .
          </p>
          <p
            className={`${garamond.className} text-center text-[21px] leading-[1.55] max-w-[640px] mb-10`}
            style={{ color: C.charcoal }}
          >
            All copyright and reproduction rights are retained by the artist.
          </p>

          <p
            className={`${baskerville.className} text-[56px] italic text-center leading-snug px-4 mb-12`}
            style={{ color: C.goldMid }}
          >
            &ldquo;{title}&rdquo;
          </p>

          <div className="w-[480px] space-y-7 mb-14">
            {details.map((item) => (
              <div key={item.label} className="grid grid-cols-[1fr_20px_1.55fr] items-baseline">
                <span className={`${garamond.className} text-[24px] text-right`} style={{ color: C.charcoal }}>
                  {item.label}
                </span>
                <span className="text-center text-[20px]" style={{ color: C.goldMid }}>
                  |
                </span>
                <span className={`${garamond.className} text-[25px] italic`} style={{ color: C.charcoal }}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          <div className="w-full max-w-[620px] flex justify-between items-end mb-12">
            <div className="text-center w-[260px]">
              <p className={`${vibes.className} text-[58px] leading-none`} style={{ color: C.goldMid }}>
                Shanzay
              </p>
              <div className="flex items-center gap-2 mt-1 mb-3">
                <div className="flex-1 h-[2px]" style={{ backgroundColor: C.goldMid }} />
                <div className="w-[8px] h-[8px] rotate-45 shrink-0" style={{ backgroundColor: C.goldMid }} />
                <div className="flex-1 h-[2px]" style={{ backgroundColor: C.goldMid }} />
              </div>
              <p className="text-[13px] tracking-[0.1em] uppercase font-medium" style={{ color: C.goldMid }}>
                Artist Signature / Shanzay Arshia
              </p>
            </div>

            <div className="text-center w-[220px]">
              <p
                className={`${garamond.className} text-[22px] italic h-[58px] flex items-end justify-center`}
                style={{ color: C.charcoal }}
              >
                {issueDate}
              </p>
              <div className="flex items-center gap-2 mt-1 mb-3">
                <div className="flex-1 h-[2px]" style={{ backgroundColor: C.goldMid }} />
                <div className="w-[8px] h-[8px] rotate-45 shrink-0" style={{ backgroundColor: C.goldMid }} />
                <div className="flex-1 h-[2px]" style={{ backgroundColor: C.goldMid }} />
              </div>
              <p className="text-[13px] tracking-[0.22em] uppercase font-medium" style={{ color: C.goldMid }}>
                Date
              </p>
            </div>
          </div>

          <div className="mb-8">
            <GoldSeal />
          </div>

          <div className="flex items-center gap-3 w-[380px]">
            <div className="flex-1 h-[2px]" style={{ backgroundColor: C.goldMid }} />
            <div className="w-[8px] h-[8px] rotate-45 shrink-0" style={{ backgroundColor: C.goldMid }} />
            <p className="text-[15px] tracking-[0.12em] whitespace-nowrap font-medium" style={{ color: C.goldDeep }}>
              www.musebyarshia.com
            </p>
            <div className="w-[8px] h-[8px] rotate-45 shrink-0" style={{ backgroundColor: C.goldMid }} />
            <div className="flex-1 h-[2px]" style={{ backgroundColor: C.goldMid }} />
          </div>
        </div>
      </div>
    )
  }
)
