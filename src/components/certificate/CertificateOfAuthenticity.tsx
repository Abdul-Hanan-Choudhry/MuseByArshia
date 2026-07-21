'use client'
import { forwardRef } from 'react'
import { Libre_Baskerville, EB_Garamond, Great_Vibes, Montserrat } from 'next/font/google'

/** Exact palette from the reference certificate */
const C = {
  cream: '#F5F0E1',
  gold: '#A68966',
  charcoal: '#3C3631',
  muted: '#6B635A',
}

/** Elegant italic serif — brand + artwork title (Baskerville-like) */
const baskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

/** Classic serif — body + values */
const garamond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
})

/** Spaced caps */
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
})

/** Signature script */
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

function DividerLine({ width = 260 }: { width?: number }) {
  return (
    <div className="flex items-center gap-2.5 my-0" style={{ width }}>
      <div className="flex-1 h-px" style={{ backgroundColor: C.gold }} />
      <div className="w-[6px] h-[6px] rotate-45 shrink-0" style={{ backgroundColor: C.gold }} />
      <div className="flex-1 h-px" style={{ backgroundColor: C.gold }} />
    </div>
  )
}

/** Oval stamp matching reference — AUTHENTICATED / ORIGINAL / MUSE BY ARSHIA */
function AuthenticityStamp() {
  return (
    <div className="relative w-[168px] h-[168px] flex items-center justify-center">
      <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" aria-hidden>
        {/* Outer ring */}
        <ellipse cx="100" cy="100" rx="94" ry="94" fill="none" stroke={C.gold} strokeWidth="1.8" />
        {/* Dotted inner ring */}
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
        {/* Inner thin ring */}
        <ellipse cx="100" cy="100" rx="78" ry="78" fill="none" stroke={C.gold} strokeWidth="0.6" />

        {/* Curved top: AUTHENTICATED */}
        <defs>
          <path id="topArc" d="M 40,105 A 60,60 0 0,1 160,105" fill="none" />
          <path id="bottomArc" d="M 38,108 A 62,62 0 0,0 162,108" fill="none" />
        </defs>
        <text
          fill={C.gold}
          fontSize="9.5"
          letterSpacing="3.5"
          fontFamily="Montserrat, Arial, sans-serif"
          fontWeight="500"
        >
          <textPath xlinkHref="#topArc" href="#topArc" startOffset="50%" textAnchor="middle">
            AUTHENTICATED
          </textPath>
        </text>

        {/* Curved bottom: MUSE BY ARSHIA */}
        <text
          fill={C.gold}
          fontSize="8.5"
          letterSpacing="2.2"
          fontFamily="Montserrat, Arial, sans-serif"
          fontWeight="500"
        >
          <textPath xlinkHref="#bottomArc" href="#bottomArc" startOffset="50%" textAnchor="middle">
            MUSE BY ARSHIA
          </textPath>
        </text>

        {/* Flourishes around ORIGINAL */}
        <path d="M62 88 C72 78, 82 76, 90 82" stroke={C.gold} strokeWidth="0.9" fill="none" />
        <path d="M138 88 C128 78, 118 76, 110 82" stroke={C.gold} strokeWidth="0.9" fill="none" />
        <path d="M62 118 C72 128, 82 130, 90 124" stroke={C.gold} strokeWidth="0.9" fill="none" />
        <path d="M138 118 C128 128, 118 130, 110 124" stroke={C.gold} strokeWidth="0.9" fill="none" />
        <circle cx="100" cy="48" r="1.8" fill={C.gold} />
        <circle cx="100" cy="152" r="1.8" fill={C.gold} />
      </svg>

      <p
        className={`${baskerville.className} relative z-10 text-[15px] tracking-[0.12em]`}
        style={{ color: C.gold }}
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
        {/* Exact botanical / parchment background */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/certificate-bg.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          draggable={false}
        />

        {/* Soft cream veil in center so text stays crisp; keep corner botanicals visible */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 42%, rgba(245,240,225,0.78) 0%, rgba(245,240,225,0.4) 48%, transparent 72%)',
          }}
        />

        {/* Content — spacing matched to reference */}
        <div className="relative z-10 h-full flex flex-col items-center px-[88px] pt-[78px] pb-[52px]">
          {/* ORIGINAL ARTWORK */}
          <p
            className="text-[10px] tracking-[0.48em] uppercase font-medium mb-[14px]"
            style={{ color: C.gold }}
          >
            Original Artwork
          </p>

          {/* Muse by Arshia */}
          <h1
            className={`${baskerville.className} text-[44px] font-normal italic leading-none tracking-[0.01em] mb-[18px]`}
            style={{ color: C.charcoal }}
          >
            Muse by Arshia
          </h1>

          <DividerLine width={240} />

          {/* CERTIFICATE OF AUTHENTICITY */}
          <h2
            className="text-[12.5px] tracking-[0.36em] uppercase font-medium mt-[18px] mb-[28px]"
            style={{ color: C.charcoal }}
          >
            Certificate of Authenticity
          </h2>

          {/* Body */}
          <p
            className={`${garamond.className} text-center text-[15.5px] leading-[1.9] max-w-[460px] mb-[6px]`}
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
            className={`${garamond.className} text-center text-[14.5px] leading-[1.75] max-w-[430px] mb-[32px]`}
            style={{ color: C.charcoal }}
          >
            All copyright and reproduction rights are retained by the artist.
          </p>

          {/* Artwork title */}
          <p
            className={`${baskerville.className} text-[34px] italic leading-snug text-center px-2 mb-[36px]`}
            style={{ color: C.gold }}
          >
            &ldquo;{title}&rdquo;
          </p>

          {/* Details — Medium | Dimensions | Year | Certificate No. */}
          <div className="w-[340px] space-y-[13px] mb-auto">
            {details.map((item) => (
              <div
                key={item.label}
                className="grid grid-cols-[1fr_14px_1.5fr] items-baseline"
              >
                <span
                  className={`${garamond.className} text-[14.5px] text-right pr-0.5`}
                  style={{ color: C.charcoal }}
                >
                  {item.label}
                </span>
                <span className="text-center text-[13px] leading-none" style={{ color: C.gold }}>
                  |
                </span>
                <span
                  className={`${garamond.className} text-[15px] italic pl-0.5`}
                  style={{ color: C.charcoal }}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          {/* Signature + Date */}
          <div className="w-full max-w-[480px] flex justify-between items-end mt-[48px] mb-[28px]">
            <div className="text-center w-[200px]">
              <p
                className={`${vibes.className} text-[40px] leading-none`}
                style={{ color: C.charcoal }}
              >
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

          {/* Stamp */}
          <div className="mb-[22px]">
            <AuthenticityStamp />
          </div>

          {/* Footer */}
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
