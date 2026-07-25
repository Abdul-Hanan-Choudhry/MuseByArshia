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

/** Design canvas sizes (px). Letter = 8.5×11 at 150 dpi for crisp print/PNG. */
export const CERT_PAPER = {
  standard: { width: 1100, height: 1500, label: 'Filled (1100 × 1500)' },
  letter: { width: 1275, height: 1650, label: 'US Letter (8.5″ × 11″)' },
} as const

export type CertificatePaperSize = keyof typeof CERT_PAPER

const BASE_W = CERT_PAPER.standard.width

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
  paperSize?: CertificatePaperSize
}

function Divider({ scale }: { scale: number }) {
  return (
    <div className="flex items-center gap-3" style={{ width: 380 * scale }}>
      <div className="flex-1" style={{ height: 2.5 * scale, backgroundColor: C.goldMid }} />
      <div
        className="rotate-45 shrink-0"
        style={{ width: 11 * scale, height: 11 * scale, backgroundColor: C.goldMid }}
      />
      <div className="flex-1" style={{ height: 2.5 * scale, backgroundColor: C.goldMid }} />
    </div>
  )
}

function GoldSeal({ scale }: { scale: number }) {
  const size = 240 * scale
  return (
    <div
      className="relative flex items-center justify-center shrink-0"
      style={{ width: size, height: size }}
    >
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
        className={`${baskerville.className} relative z-10 font-bold`}
        style={{
          color: '#FDF8EC',
          textShadow: '0 1px 3px rgba(80,50,0,0.4)',
          fontSize: 22 * scale,
          letterSpacing: '0.2em',
        }}
      >
        ORIGINAL
      </p>
    </div>
  )
}

export const CertificateOfAuthenticity = forwardRef<HTMLDivElement, Props>(
  function CertificateOfAuthenticity({ data, paperSize = 'standard' }, ref) {
    const { width, height } = CERT_PAPER[paperSize]
    const s = width / BASE_W

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

    const creamInset = 22 * s
    const borderOuter = 32 * s
    const borderInner = 44 * s
    const diamond = 28 * s
    const contentInset = 60 * s

    return (
      <div
        ref={ref}
        data-paper-size={paperSize}
        className={`relative select-none ${montserrat.className}`}
        style={{
          width,
          height,
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
        <div
          className="absolute inset-0 pointer-events-none z-[4]"
          style={{ border: `${creamInset}px solid ${C.cream}` }}
        />

        {/* Double gold border — fully inside */}
        <div
          className="absolute pointer-events-none z-[5]"
          style={{ inset: borderOuter, border: `${2.5 * s}px solid ${C.goldMid}` }}
        />
        <div
          className="absolute pointer-events-none z-[5]"
          style={{ inset: borderInner, border: `${1.5 * s}px solid ${C.gold}` }}
        />

        {[
          { top: diamond, left: diamond },
          { top: diamond, right: diamond },
          { bottom: diamond, left: diamond },
          { bottom: diamond, right: diamond },
        ].map((pos, i) => (
          <div
            key={i}
            className="absolute z-[6] rotate-45"
            style={{
              ...pos,
              width: 14 * s,
              height: 14 * s,
              backgroundColor: C.goldMid,
            }}
          />
        ))}

        <div
          className="absolute z-[6] rotate-45 left-1/2 -translate-x-1/2"
          style={{ top: diamond, width: 12 * s, height: 12 * s, backgroundColor: C.goldMid }}
        />
        <div
          className="absolute z-[6] rotate-45 left-1/2 -translate-x-1/2"
          style={{ bottom: diamond, width: 12 * s, height: 12 * s, backgroundColor: C.goldMid }}
        />
        <div
          className="absolute z-[6] rotate-45 top-1/2 -translate-y-1/2"
          style={{ left: diamond, width: 12 * s, height: 12 * s, backgroundColor: C.goldMid }}
        />
        <div
          className="absolute z-[6] rotate-45 top-1/2 -translate-y-1/2"
          style={{ right: diamond, width: 12 * s, height: 12 * s, backgroundColor: C.goldMid }}
        />

        <div
          className="absolute z-10 flex flex-col items-center justify-evenly"
          style={{ inset: contentInset }}
        >
          <div className="flex flex-col items-center w-full">
            <p
              className="uppercase font-semibold"
              style={{
                color: C.goldMid,
                fontSize: 16 * s,
                letterSpacing: '0.52em',
                marginBottom: 12 * s,
              }}
            >
              Original Artwork
            </p>
            <h1
              className={`${baskerville.className} italic font-normal leading-none tracking-wide`}
              style={{ color: C.charcoal, fontSize: 72 * s, marginBottom: 8 * s }}
            >
              Muse by Arshia
            </h1>
            <Divider scale={s} />
            <h2
              className="uppercase font-semibold"
              style={{
                color: C.charcoal,
                fontSize: 22 * s,
                letterSpacing: '0.36em',
                marginTop: 8 * s,
              }}
            >
              Certificate of Authenticity
            </h2>
          </div>

          <div className="flex flex-col items-center w-full" style={{ paddingLeft: 24 * s, paddingRight: 24 * s }}>
            <p
              className={`${garamond.className} text-center`}
              style={{
                color: C.charcoal,
                fontSize: 28 * s,
                lineHeight: 1.55,
                maxWidth: 820 * s,
                marginBottom: 8 * s,
              }}
            >
              This is to certify that the artwork described below is an original
              painting created entirely by{' '}
              <span className={`${baskerville.className} italic`} style={{ color: C.goldMid }}>
                {name}
              </span>
              .
            </p>
            <p
              className={`${garamond.className} text-center`}
              style={{
                color: C.charcoal,
                fontSize: 24 * s,
                lineHeight: 1.5,
                maxWidth: 760 * s,
                marginBottom: 24 * s,
              }}
            >
              All copyright and reproduction rights are retained by the artist.
            </p>
            <p
              className={`${baskerville.className} italic text-center leading-snug`}
              style={{ color: C.goldMid, fontSize: 64 * s, paddingLeft: 16 * s, paddingRight: 16 * s }}
            >
              &ldquo;{title}&rdquo;
            </p>
          </div>

          <div className="space-y-6" style={{ width: 560 * s }}>
            {details.map((item) => (
              <div key={item.label} className="grid grid-cols-[1fr_22px_1.55fr] items-baseline">
                <span
                  className={`${garamond.className} text-right`}
                  style={{ color: C.charcoal, fontSize: 28 * s }}
                >
                  {item.label}
                </span>
                <span className="text-center" style={{ color: C.goldMid, fontSize: 22 * s }}>
                  |
                </span>
                <span
                  className={`${garamond.className} italic`}
                  style={{ color: C.charcoal, fontSize: 29 * s }}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          <div
            className="w-full flex justify-between items-end"
            style={{ maxWidth: 700 * s, paddingLeft: 16 * s, paddingRight: 16 * s }}
          >
            <div className="text-center" style={{ width: 280 * s }}>
              <p
                className={`${vibes.className} leading-none`}
                style={{ color: C.goldMid, fontSize: 64 * s }}
              >
                Shanzay
              </p>
              <div className="flex items-center gap-2" style={{ marginTop: 4 * s, marginBottom: 8 * s }}>
                <div className="flex-1" style={{ height: 2.5 * s, backgroundColor: C.goldMid }} />
                <div
                  className="rotate-45 shrink-0"
                  style={{ width: 9 * s, height: 9 * s, backgroundColor: C.goldMid }}
                />
                <div className="flex-1" style={{ height: 2.5 * s, backgroundColor: C.goldMid }} />
              </div>
              <p
                className="uppercase font-medium"
                style={{ color: C.goldMid, fontSize: 14 * s, letterSpacing: '0.1em' }}
              >
                Artist Signature / Shanzay Arshia
              </p>
            </div>

            <div className="text-center" style={{ width: 240 * s }}>
              <p
                className={`${garamond.className} italic flex items-end justify-center`}
                style={{ color: C.charcoal, fontSize: 26 * s, height: 64 * s }}
              >
                {issueDate}
              </p>
              <div className="flex items-center gap-2" style={{ marginTop: 4 * s, marginBottom: 8 * s }}>
                <div className="flex-1" style={{ height: 2.5 * s, backgroundColor: C.goldMid }} />
                <div
                  className="rotate-45 shrink-0"
                  style={{ width: 9 * s, height: 9 * s, backgroundColor: C.goldMid }}
                />
                <div className="flex-1" style={{ height: 2.5 * s, backgroundColor: C.goldMid }} />
              </div>
              <p
                className="uppercase font-medium"
                style={{ color: C.goldMid, fontSize: 14 * s, letterSpacing: '0.22em' }}
              >
                Date
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <GoldSeal scale={s} />
            <div className="flex items-center gap-3" style={{ width: 420 * s, marginTop: 20 * s }}>
              <div className="flex-1" style={{ height: 2.5 * s, backgroundColor: C.goldMid }} />
              <div
                className="rotate-45 shrink-0"
                style={{ width: 9 * s, height: 9 * s, backgroundColor: C.goldMid }}
              />
              <p
                className="whitespace-nowrap font-medium"
                style={{ color: C.goldDeep, fontSize: 16 * s, letterSpacing: '0.12em' }}
              >
                www.musebyarshia.com
              </p>
              <div
                className="rotate-45 shrink-0"
                style={{ width: 9 * s, height: 9 * s, backgroundColor: C.goldMid }}
              />
              <div className="flex-1" style={{ height: 2.5 * s, backgroundColor: C.goldMid }} />
            </div>
          </div>
        </div>
      </div>
    )
  }
)
