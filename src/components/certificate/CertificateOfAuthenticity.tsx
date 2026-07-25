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
    <div className="flex items-center gap-3 w-[380px]">
      <div className="flex-1 h-[2.5px]" style={{ backgroundColor: C.goldMid }} />
      <div className="w-[11px] h-[11px] rotate-45 shrink-0" style={{ backgroundColor: C.goldMid }} />
      <div className="flex-1 h-[2.5px]" style={{ backgroundColor: C.goldMid }} />
    </div>
  )
}

function GoldSeal() {
  return (
    <div className="relative w-[240px] h-[240px] flex items-center justify-center shrink-0">
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
        className={`${baskerville.className} relative z-10 text-[22px] tracking-[0.2em] font-bold`}
        style={{ color: '#FDF8EC', textShadow: '0 1px 3px rgba(80,50,0,0.4)' }}
      >
        ORIGINAL
      </p>
    </div>
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
      { label: 'Medium', value: medium },
      { label: 'Dimensions', value: size },
      { label: 'Year', value: year },
    ]

    return (
      <div
        ref={ref}
        className={`relative select-none ${montserrat.className}`}
        style={{
          width: 1100,
          height: 1500,
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
              'radial-gradient(ellipse at 50% 40%, rgba(245,240,225,0.93) 0%, rgba(245,240,225,0.58) 52%, transparent 80%)',
          }}
        />

        {/* Safe cream margin — keeps border fully on the page */}
        <div className="absolute inset-0 pointer-events-none z-[4]" style={{ border: `22px solid ${C.cream}` }} />

        {/* Double gold border — fully inside */}
        <div className="absolute pointer-events-none z-[5]" style={{ inset: 32, border: `2.5px solid ${C.goldMid}` }} />
        <div className="absolute pointer-events-none z-[5]" style={{ inset: 44, border: `1.5px solid ${C.gold}` }} />

        {[
          { top: 28, left: 28 },
          { top: 28, right: 28 },
          { bottom: 28, left: 28 },
          { bottom: 28, right: 28 },
        ].map((pos, i) => (
          <div
            key={i}
            className="absolute z-[6] w-3.5 h-3.5 rotate-45"
            style={{ ...pos, backgroundColor: C.goldMid }}
          />
        ))}

        <div className="absolute z-[6] w-3 h-3 rotate-45 left-1/2 -translate-x-1/2" style={{ top: 28, backgroundColor: C.goldMid }} />
        <div className="absolute z-[6] w-3 h-3 rotate-45 left-1/2 -translate-x-1/2" style={{ bottom: 28, backgroundColor: C.goldMid }} />
        <div className="absolute z-[6] w-3 h-3 rotate-45 top-1/2 -translate-y-1/2" style={{ left: 28, backgroundColor: C.goldMid }} />
        <div className="absolute z-[6] w-3 h-3 rotate-45 top-1/2 -translate-y-1/2" style={{ right: 28, backgroundColor: C.goldMid }} />

        {/* Fill the full inner area evenly — no hollow gap */}
        <div
          className="absolute z-10 flex flex-col items-center justify-evenly"
          style={{ inset: 60 }}
        >
          {/* Header block */}
          <div className="flex flex-col items-center w-full">
            <p className="text-[16px] tracking-[0.52em] uppercase font-semibold mb-3" style={{ color: C.goldMid }}>
              Original Artwork
            </p>
            <h1
              className={`${baskerville.className} text-[72px] italic font-normal leading-none tracking-wide mb-2`}
              style={{ color: C.charcoal }}
            >
              Muse by Arshia
            </h1>
            <Divider />
            <h2 className="text-[22px] tracking-[0.36em] uppercase font-semibold mt-2" style={{ color: C.charcoal }}>
              Certificate of Authenticity
            </h2>
          </div>

          {/* Body + title */}
          <div className="flex flex-col items-center w-full px-6">
            <p
              className={`${garamond.className} text-center text-[28px] leading-[1.55] max-w-[820px] mb-2`}
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
              className={`${garamond.className} text-center text-[24px] leading-[1.5] max-w-[760px] mb-6`}
              style={{ color: C.charcoal }}
            >
              All copyright and reproduction rights are retained by the artist.
            </p>
            <p
              className={`${baskerville.className} text-[64px] italic text-center leading-snug px-4`}
              style={{ color: C.goldMid }}
            >
              &ldquo;{title}&rdquo;
            </p>
          </div>

          {/* Details */}
          <div className="w-[560px] space-y-6">
            {details.map((item) => (
              <div key={item.label} className="grid grid-cols-[1fr_22px_1.55fr] items-baseline">
                <span className={`${garamond.className} text-[28px] text-right`} style={{ color: C.charcoal }}>
                  {item.label}
                </span>
                <span className="text-center text-[22px]" style={{ color: C.goldMid }}>
                  |
                </span>
                <span className={`${garamond.className} text-[29px] italic`} style={{ color: C.charcoal }}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          {/* Signature + date */}
          <div className="w-full max-w-[700px] flex justify-between items-end px-4">
            <div className="text-center w-[280px]">
              <p className={`${vibes.className} text-[64px] leading-none`} style={{ color: C.goldMid }}>
                Shanzay
              </p>
              <div className="flex items-center gap-2 mt-1 mb-2">
                <div className="flex-1 h-[2.5px]" style={{ backgroundColor: C.goldMid }} />
                <div className="w-[9px] h-[9px] rotate-45 shrink-0" style={{ backgroundColor: C.goldMid }} />
                <div className="flex-1 h-[2.5px]" style={{ backgroundColor: C.goldMid }} />
              </div>
              <p className="text-[14px] tracking-[0.1em] uppercase font-medium" style={{ color: C.goldMid }}>
                Artist Signature / Shanzay Arshia
              </p>
            </div>

            <div className="text-center w-[240px]">
              <p
                className={`${garamond.className} text-[26px] italic h-[64px] flex items-end justify-center`}
                style={{ color: C.charcoal }}
              >
                {issueDate}
              </p>
              <div className="flex items-center gap-2 mt-1 mb-2">
                <div className="flex-1 h-[2.5px]" style={{ backgroundColor: C.goldMid }} />
                <div className="w-[9px] h-[9px] rotate-45 shrink-0" style={{ backgroundColor: C.goldMid }} />
                <div className="flex-1 h-[2.5px]" style={{ backgroundColor: C.goldMid }} />
              </div>
              <p className="text-[14px] tracking-[0.22em] uppercase font-medium" style={{ color: C.goldMid }}>
                Date
              </p>
            </div>
          </div>

          {/* Seal + footer */}
          <div className="flex flex-col items-center">
            <GoldSeal />
            <div className="flex items-center gap-3 w-[420px] mt-5">
              <div className="flex-1 h-[2.5px]" style={{ backgroundColor: C.goldMid }} />
              <div className="w-[9px] h-[9px] rotate-45 shrink-0" style={{ backgroundColor: C.goldMid }} />
              <p className="text-[16px] tracking-[0.12em] whitespace-nowrap font-medium" style={{ color: C.goldDeep }}>
                www.musebyarshia.com
              </p>
              <div className="w-[9px] h-[9px] rotate-45 shrink-0" style={{ backgroundColor: C.goldMid }} />
              <div className="flex-1 h-[2.5px]" style={{ backgroundColor: C.goldMid }} />
            </div>
          </div>
        </div>
      </div>
    )
  }
)
