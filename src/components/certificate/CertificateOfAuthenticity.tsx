'use client'
import { forwardRef } from 'react'
import { Libre_Baskerville, EB_Garamond, Great_Vibes, Montserrat } from 'next/font/google'

const C = {
  cream: '#F5F0E1',
  gold: '#C9A227',
  goldDeep: '#8B6914',
  goldLight: '#E8D48B',
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
    <div className="flex items-center gap-3 w-[300px] my-[10px]">
      <div className="flex-1 h-[1.5px]" style={{ backgroundColor: C.gold }} />
      <div className="w-[8px] h-[8px] rotate-45 shrink-0" style={{ backgroundColor: C.gold }} />
      <div className="flex-1 h-[1.5px]" style={{ backgroundColor: C.gold }} />
    </div>
  )
}

function GoldSeal() {
  return (
    <div className="relative w-[180px] h-[180px] flex items-center justify-center">
      <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full drop-shadow-md" aria-hidden>
        <defs>
          <radialGradient id="sealGoldFill" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor={C.goldLight} />
            <stop offset="45%" stopColor={C.gold} />
            <stop offset="100%" stopColor={C.goldDeep} />
          </radialGradient>
          <linearGradient id="sealGoldRing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={C.goldLight} />
            <stop offset="50%" stopColor={C.gold} />
            <stop offset="100%" stopColor={C.goldDeep} />
          </linearGradient>
          <path id="sealTop" d="M 38,102 A 62,62 0 0,1 162,102" fill="none" />
          <path id="sealBottom" d="M 36,105 A 64,64 0 0,0 164,105" fill="none" />
        </defs>

        {/* Solid golden disc */}
        <ellipse cx="100" cy="100" rx="94" ry="94" fill="url(#sealGoldFill)" />
        <ellipse cx="100" cy="100" rx="94" ry="94" fill="none" stroke="url(#sealGoldRing)" strokeWidth="3" />
        <ellipse
          cx="100"
          cy="100"
          rx="86"
          ry="86"
          fill="none"
          stroke={C.goldLight}
          strokeWidth="1.4"
          strokeDasharray="2.4 2.6"
          opacity="0.9"
        />
        <ellipse cx="100" cy="100" rx="78" ry="78" fill="none" stroke={C.goldDeep} strokeWidth="0.8" opacity="0.7" />

        <text
          fill="#F5F0E1"
          fontSize="10"
          letterSpacing="3.2"
          fontFamily="Montserrat, Arial, sans-serif"
          fontWeight="600"
        >
          <textPath href="#sealTop" startOffset="50%" textAnchor="middle">
            AUTHENTICATED
          </textPath>
        </text>
        <text
          fill="#F5F0E1"
          fontSize="8.5"
          letterSpacing="2"
          fontFamily="Montserrat, Arial, sans-serif"
          fontWeight="600"
        >
          <textPath href="#sealBottom" startOffset="50%" textAnchor="middle">
            MUSE BY ARSHIA
          </textPath>
        </text>

        <path d="M60 86 C72 76, 84 74, 92 80" stroke="#F5F0E1" strokeWidth="1" fill="none" opacity="0.85" />
        <path d="M140 86 C128 76, 116 74, 108 80" stroke="#F5F0E1" strokeWidth="1" fill="none" opacity="0.85" />
        <path d="M60 120 C72 130, 84 132, 92 126" stroke="#F5F0E1" strokeWidth="1" fill="none" opacity="0.85" />
        <path d="M140 120 C128 130, 116 132, 108 126" stroke="#F5F0E1" strokeWidth="1" fill="none" opacity="0.85" />
        <circle cx="100" cy="46" r="2" fill="#F5F0E1" />
        <circle cx="100" cy="154" r="2" fill="#F5F0E1" />
      </svg>
      <p
        className={`${baskerville.className} relative z-10 text-[18px] tracking-[0.18em] font-bold`}
        style={{ color: '#F5F0E1', textShadow: '0 1px 2px rgba(60,40,0,0.35)' }}
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
        className={`relative overflow-hidden select-none ${montserrat.className}`}
        style={{
          width: '210mm',
          height: '297mm',
          backgroundColor: C.cream,
          color: C.charcoal,
          boxSizing: 'border-box',
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
              'radial-gradient(ellipse at 50% 42%, rgba(245,240,225,0.88) 0%, rgba(245,240,225,0.5) 52%, transparent 76%)',
          }}
        />

        {/* Guaranteed visible double border — inset so it never clips on A4 */}
        <div
          className="absolute pointer-events-none z-[5]"
          style={{ inset: '8mm', border: `1.25px solid ${C.gold}` }}
        />
        <div
          className="absolute pointer-events-none z-[5]"
          style={{ inset: '10mm', border: `1.5px solid ${C.gold}` }}
        />
        {/* Corner diamonds */}
        {[
          { top: '7mm', left: '7mm' },
          { top: '7mm', right: '7mm' },
          { bottom: '7mm', left: '7mm' },
          { bottom: '7mm', right: '7mm' },
        ].map((pos, i) => (
          <div
            key={i}
            className="absolute z-[6] w-[7px] h-[7px] rotate-45"
            style={{ ...pos, backgroundColor: C.gold }}
          />
        ))}

        {/* Content stays inside the border safe area */}
        <div
          className="relative z-10 h-full flex flex-col items-center justify-between"
          style={{ padding: '16mm 18mm' }}
        >
          <div className="flex flex-col items-center w-full">
            <p
              className="text-[13px] tracking-[0.48em] uppercase font-semibold mb-[14px]"
              style={{ color: C.gold }}
            >
              Original Artwork
            </p>

            <h1
              className={`${baskerville.className} text-[48px] italic font-normal leading-none tracking-wide`}
              style={{ color: C.charcoal }}
            >
              Muse by Arshia
            </h1>

            <Divider />

            <h2
              className="text-[15px] tracking-[0.32em] uppercase font-semibold mt-[2px] mb-[18px]"
              style={{ color: C.charcoal }}
            >
              Certificate of Authenticity
            </h2>

            <p
              className={`${garamond.className} text-center text-[18px] leading-[1.65] max-w-[480px] mb-[6px]`}
              style={{ color: C.charcoal }}
            >
              This is to certify that the artwork described below is an original
              painting created entirely by{' '}
              <span className={`${baskerville.className} italic`} style={{ color: C.gold }}>
                {name}
              </span>
              .
            </p>
            <p
              className={`${garamond.className} text-center text-[16px] leading-[1.55] max-w-[460px] mb-[18px]`}
              style={{ color: C.charcoal }}
            >
              All copyright and reproduction rights are retained by the artist.
            </p>

            <p
              className={`${baskerville.className} text-[38px] italic text-center leading-snug px-2 mb-[20px]`}
              style={{ color: C.gold }}
            >
              &ldquo;{title}&rdquo;
            </p>

            <div className="w-[380px] space-y-[14px]">
              {details.map((item) => (
                <div key={item.label} className="grid grid-cols-[1fr_16px_1.5fr] items-baseline">
                  <span
                    className={`${garamond.className} text-[17px] text-right`}
                    style={{ color: C.charcoal }}
                  >
                    {item.label}
                  </span>
                  <span className="text-center text-[15px]" style={{ color: C.gold }}>
                    |
                  </span>
                  <span
                    className={`${garamond.className} text-[18px] italic`}
                    style={{ color: C.charcoal }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center w-full">
            <div className="w-full max-w-[480px] flex justify-between items-end mb-[16px]">
              <div className="text-center w-[200px]">
                <p
                  className={`${vibes.className} text-[44px] leading-none`}
                  style={{ color: C.gold }}
                >
                  Shanzay
                </p>
                <div className="flex items-center gap-2 mt-[2px] mb-[8px]">
                  <div className="flex-1 h-[1.5px]" style={{ backgroundColor: C.gold }} />
                  <div className="w-[6px] h-[6px] rotate-45 shrink-0" style={{ backgroundColor: C.gold }} />
                  <div className="flex-1 h-[1.5px]" style={{ backgroundColor: C.gold }} />
                </div>
                <p className="text-[10px] tracking-[0.1em] uppercase font-medium" style={{ color: C.gold }}>
                  Artist Signature / Shanzay Arshia
                </p>
              </div>

              <div className="text-center w-[170px]">
                <p
                  className={`${garamond.className} text-[17px] italic h-[44px] flex items-end justify-center`}
                  style={{ color: C.charcoal }}
                >
                  {issueDate}
                </p>
                <div className="flex items-center gap-2 mt-[2px] mb-[8px]">
                  <div className="flex-1 h-[1.5px]" style={{ backgroundColor: C.gold }} />
                  <div className="w-[6px] h-[6px] rotate-45 shrink-0" style={{ backgroundColor: C.gold }} />
                  <div className="flex-1 h-[1.5px]" style={{ backgroundColor: C.gold }} />
                </div>
                <p className="text-[10px] tracking-[0.22em] uppercase font-medium" style={{ color: C.gold }}>
                  Date
                </p>
              </div>
            </div>

            <div className="mb-[12px]">
              <GoldSeal />
            </div>

            <div className="flex items-center gap-3 w-[300px]">
              <div className="flex-1 h-[1.5px]" style={{ backgroundColor: C.gold }} />
              <div className="w-[6px] h-[6px] rotate-45 shrink-0" style={{ backgroundColor: C.gold }} />
              <p className="text-[12px] tracking-[0.12em] whitespace-nowrap font-medium" style={{ color: C.goldDeep }}>
                www.musebyarshia.com
              </p>
              <div className="w-[6px] h-[6px] rotate-45 shrink-0" style={{ backgroundColor: C.gold }} />
              <div className="flex-1 h-[1.5px]" style={{ backgroundColor: C.gold }} />
            </div>
          </div>
        </div>
      </div>
    )
  }
)
