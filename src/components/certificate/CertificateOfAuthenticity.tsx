'use client'
import { forwardRef } from 'react'
import { Libre_Baskerville, EB_Garamond, Great_Vibes, Montserrat } from 'next/font/google'

const C = {
  cream: '#F5F0E1',
  gold: '#A68966',
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
  certificateNumber: string
  issueDate: string
}

interface Props {
  data: CertificateData
}

function Divider() {
  return (
    <div className="flex items-center gap-2.5 w-[240px] my-[16px]">
      <div className="flex-1 h-px" style={{ backgroundColor: C.gold }} />
      <div className="w-[6px] h-[6px] rotate-45 shrink-0" style={{ backgroundColor: C.gold }} />
      <div className="flex-1 h-px" style={{ backgroundColor: C.gold }} />
    </div>
  )
}

function GoldSeal() {
  return (
    <div className="relative w-[170px] h-[170px] flex items-center justify-center">
      <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" aria-hidden>
        <ellipse cx="100" cy="100" rx="94" ry="94" fill="none" stroke={C.gold} strokeWidth="1.8" />
        <ellipse
          cx="100"
          cy="100"
          rx="86"
          ry="86"
          fill="none"
          stroke={C.gold}
          strokeWidth="1.1"
          strokeDasharray="2.2 2.4"
        />
        <ellipse cx="100" cy="100" rx="78" ry="78" fill="none" stroke={C.gold} strokeWidth="0.55" />

        <defs>
          <path id="sealTop" d="M 38,102 A 62,62 0 0,1 162,102" fill="none" />
          <path id="sealBottom" d="M 36,105 A 64,64 0 0,0 164,105" fill="none" />
        </defs>

        <text fill={C.gold} fontSize="9.5" letterSpacing="3.2" fontFamily="Montserrat, Arial, sans-serif" fontWeight="500">
          <textPath href="#sealTop" startOffset="50%" textAnchor="middle">
            AUTHENTICATED
          </textPath>
        </text>
        <text fill={C.gold} fontSize="8.2" letterSpacing="2" fontFamily="Montserrat, Arial, sans-serif" fontWeight="500">
          <textPath href="#sealBottom" startOffset="50%" textAnchor="middle">
            MUSE BY ARSHIA
          </textPath>
        </text>

        <path d="M60 86 C72 76, 84 74, 92 80" stroke={C.gold} strokeWidth="0.9" fill="none" />
        <path d="M140 86 C128 76, 116 74, 108 80" stroke={C.gold} strokeWidth="0.9" fill="none" />
        <path d="M60 120 C72 130, 84 132, 92 126" stroke={C.gold} strokeWidth="0.9" fill="none" />
        <path d="M140 120 C128 130, 116 132, 108 126" stroke={C.gold} strokeWidth="0.9" fill="none" />
        <circle cx="100" cy="46" r="1.8" fill={C.gold} />
        <circle cx="100" cy="154" r="1.8" fill={C.gold} />
      </svg>
      <p className={`${baskerville.className} relative z-10 text-[15px] tracking-[0.14em]`} style={{ color: C.gold }}>
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
    const certNo = data.certificateNumber.trim() || '—'
    const issueDate = data.issueDate.trim() || '—'

    const details = [
      { label: 'Medium', value: medium },
      { label: 'Dimensions', value: size },
      { label: 'Year', value: year },
      { label: 'Certificate No.', value: certNo },
    ]

    return (
      <div
        ref={ref}
        className={`relative w-[794px] h-[1123px] overflow-hidden select-none ${montserrat.className}`}
        style={{ backgroundColor: C.cream, color: C.charcoal }}
      >
        {/* Exact botanical parchment background */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/certificate-bg.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          draggable={false}
        />

        {/* Center veil for readable text — keep corner florals */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 42%, rgba(245,240,225,0.82) 0%, rgba(245,240,225,0.42) 50%, transparent 74%)',
          }}
        />

        <div className="relative z-10 h-full flex flex-col items-center px-[90px] pt-[80px] pb-[50px]">
          <p className="text-[10px] tracking-[0.5em] uppercase font-medium mb-[12px]" style={{ color: C.gold }}>
            Original Artwork
          </p>

          <h1
            className={`${baskerville.className} text-[44px] italic font-normal leading-none tracking-wide`}
            style={{ color: C.charcoal }}
          >
            Muse by Arshia
          </h1>

          <Divider />

          <h2
            className="text-[12.5px] tracking-[0.36em] uppercase font-medium mb-[26px]"
            style={{ color: C.charcoal }}
          >
            Certificate of Authenticity
          </h2>

          <p
            className={`${garamond.className} text-center text-[15.5px] leading-[1.9] max-w-[470px] mb-[4px]`}
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
            className={`${garamond.className} text-center text-[14.5px] leading-[1.75] max-w-[440px] mb-[30px]`}
            style={{ color: C.charcoal }}
          >
            All copyright and reproduction rights are retained by the artist.
          </p>

          <p
            className={`${baskerville.className} text-[34px] italic text-center leading-snug px-2 mb-[34px]`}
            style={{ color: C.gold }}
          >
            &ldquo;{title}&rdquo;
          </p>

          <div className="w-[340px] space-y-[13px] mb-auto">
            {details.map((item) => (
              <div key={item.label} className="grid grid-cols-[1fr_14px_1.5fr] items-baseline">
                <span className={`${garamond.className} text-[14.5px] text-right`} style={{ color: C.charcoal }}>
                  {item.label}
                </span>
                <span className="text-center text-[13px]" style={{ color: C.gold }}>
                  |
                </span>
                <span className={`${garamond.className} text-[15px] italic`} style={{ color: C.charcoal }}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          <div className="w-full max-w-[480px] flex justify-between items-end mt-[44px] mb-[26px]">
            <div className="text-center w-[200px]">
              <p className={`${vibes.className} text-[40px] leading-none`} style={{ color: C.charcoal }}>
                Shanzay
              </p>
              <div className="flex items-center gap-2 mt-[2px] mb-[8px]">
                <div className="flex-1 h-px" style={{ backgroundColor: C.gold }} />
                <div className="w-[5px] h-[5px] rotate-45 shrink-0" style={{ backgroundColor: C.gold }} />
                <div className="flex-1 h-px" style={{ backgroundColor: C.gold }} />
              </div>
              <p className="text-[8.5px] tracking-[0.08em] uppercase" style={{ color: C.gold }}>
                Artist Signature / Shanzay Arshia
              </p>
            </div>

            <div className="text-center w-[170px]">
              <p
                className={`${garamond.className} text-[15.5px] italic h-[40px] flex items-end justify-center`}
                style={{ color: C.charcoal }}
              >
                {issueDate}
              </p>
              <div className="flex items-center gap-2 mt-[2px] mb-[8px]">
                <div className="flex-1 h-px" style={{ backgroundColor: C.gold }} />
                <div className="w-[5px] h-[5px] rotate-45 shrink-0" style={{ backgroundColor: C.gold }} />
                <div className="flex-1 h-px" style={{ backgroundColor: C.gold }} />
              </div>
              <p className="text-[8.5px] tracking-[0.22em] uppercase" style={{ color: C.gold }}>
                Date
              </p>
            </div>
          </div>

          <div className="mb-[20px]">
            <GoldSeal />
          </div>

          <div className="flex items-center gap-2.5 w-[280px]">
            <div className="flex-1 h-px" style={{ backgroundColor: C.gold }} />
            <div className="w-[5px] h-[5px] rotate-45 shrink-0" style={{ backgroundColor: C.gold }} />
            <p className="text-[10.5px] tracking-[0.1em] whitespace-nowrap" style={{ color: C.muted }}>
              www.musebyarshia.com
            </p>
            <div className="w-[5px] h-[5px] rotate-45 shrink-0" style={{ backgroundColor: C.gold }} />
            <div className="flex-1 h-px" style={{ backgroundColor: C.gold }} />
          </div>
        </div>
      </div>
    )
  }
)
