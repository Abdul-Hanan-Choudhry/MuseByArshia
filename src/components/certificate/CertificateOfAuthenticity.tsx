'use client'
import { forwardRef } from 'react'

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

function BotanicalCorner({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 220 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <ellipse cx="40" cy="180" rx="90" ry="70" fill="#E8C4B0" opacity="0.35" />
      <ellipse cx="70" cy="160" rx="50" ry="40" fill="#D4A574" opacity="0.18" />
      <path
        d="M30 190 C50 140, 90 120, 120 90"
        stroke="#C4A070"
        strokeWidth="1.2"
        opacity="0.55"
      />
      <path
        d="M55 185 C70 155, 100 145, 130 125"
        stroke="#C4A070"
        strokeWidth="1"
        opacity="0.4"
      />
      <ellipse cx="118" cy="88" rx="14" ry="22" transform="rotate(-35 118 88)" fill="#C4A070" opacity="0.35" />
      <ellipse cx="95" cy="115" rx="11" ry="18" transform="rotate(-20 95 115)" fill="#C4A070" opacity="0.28" />
      <ellipse cx="75" cy="145" rx="10" ry="16" transform="rotate(-10 75 145)" fill="#B8906A" opacity="0.25" />
      <circle cx="48" cy="168" r="5" fill="#D4917A" opacity="0.45" />
      <circle cx="62" cy="155" r="3.5" fill="#D4917A" opacity="0.35" />
    </svg>
  )
}

export const CertificateOfAuthenticity = forwardRef<HTMLDivElement, Props>(
  function CertificateOfAuthenticity({ data }, ref) {
    const title = data.title.trim() || 'Untitled'
    const name = data.name.trim() || '—'
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
        className="relative w-[794px] h-[1123px] bg-[#F7F2EA] text-[#2C2926] overflow-hidden select-none"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 12% 88%, rgba(232,196,176,0.45) 0%, transparent 42%), radial-gradient(ellipse at 90% 8%, rgba(212,165,116,0.28) 0%, transparent 38%), radial-gradient(ellipse at 50% 50%, rgba(245,240,232,0.9) 0%, transparent 70%)',
          }}
        />

        <BotanicalCorner className="absolute -left-2 bottom-8 w-[240px] h-[240px] opacity-90" />
        <BotanicalCorner className="absolute -right-2 top-6 w-[220px] h-[220px] opacity-80 rotate-180" />

        <div className="absolute inset-[26px] border border-[#B8A070]" />
        <div className="absolute inset-[34px] border border-[#B8A070]" />

        {[
          'top-[20px] left-[20px]',
          'top-[20px] right-[20px]',
          'bottom-[20px] left-[20px]',
          'bottom-[20px] right-[20px]',
        ].map((pos) => (
          <div key={pos} className={`absolute ${pos} w-2.5 h-2.5 rotate-45 bg-[#B8A070]`} />
        ))}

        <div className="relative h-full flex flex-col items-center px-[72px] pt-16 pb-12">
          <p className="font-sans text-[11px] tracking-[0.42em] uppercase text-[#B8A070] mb-3">
            Original Artwork
          </p>

          <h1 className="font-display text-[44px] font-light italic text-[#2C2926] leading-none tracking-wide">
            Muse by Arshia
          </h1>

          <div className="flex items-center gap-3 my-5 w-full max-w-sm">
            <div className="flex-1 h-px bg-[#B8A070]" />
            <div className="w-1.5 h-1.5 rotate-45 bg-[#B8A070]" />
            <div className="flex-1 h-px bg-[#B8A070]" />
          </div>

          <h2 className="font-sans text-[15px] tracking-[0.32em] uppercase text-[#B8A070] font-medium mb-8">
            Certificate of Authenticity
          </h2>

          <p className="font-sans italic text-center text-[15px] leading-[1.8] text-[#3D3935] max-w-[480px] mb-10">
            This certificate confirms that the artwork identified in this document
            is a genuine and unique creation. It bears the artist&apos;s hand-signed
            signature. The artist retains complete control over the copyright and
            reproduction rights of the piece.
          </p>

          <p className="font-accent text-[34px] italic text-[#B8A070] leading-snug text-center px-4 mb-10">
            &ldquo;{title}&rdquo;
          </p>

          <div className="w-full max-w-[380px] space-y-3.5 mb-auto">
            {details.map((item) => (
              <div
                key={item.label}
                className="grid grid-cols-[1fr_auto_1.35fr] items-center gap-3"
              >
                <p className="font-sans text-[13px] text-[#2C2926] text-right tracking-wide">
                  {item.label}
                </p>
                <span className="text-[#B8A070] text-[13px] leading-none">|</span>
                <p className="font-display text-[15px] italic text-[#2C2926]">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div className="w-full max-w-[480px] flex justify-between items-end mt-14 mb-10">
            <div className="text-center w-[200px]">
              <p className="font-script text-[38px] text-[#2C2926] leading-none mb-0.5">
                Shanzay
              </p>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex-1 h-px bg-[#B8A070]" />
                <div className="w-1.5 h-1.5 rotate-45 bg-[#B8A070]" />
                <div className="flex-1 h-px bg-[#B8A070]" />
              </div>
              <p className="font-sans text-[10px] tracking-[0.12em] text-[#6B6560]">
                Artist Signature / Shanzay Arshia
              </p>
            </div>

            <div className="text-center w-[180px]">
              <p className="font-display text-[16px] italic text-[#2C2926] mb-0.5 h-9 flex items-end justify-center">
                {issueDate}
              </p>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex-1 h-px bg-[#B8A070]" />
                <div className="w-1.5 h-1.5 rotate-45 bg-[#B8A070]" />
                <div className="flex-1 h-px bg-[#B8A070]" />
              </div>
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#6B6560]">
                Date
              </p>
            </div>
          </div>

          <div className="relative w-[150px] h-[150px] mb-6 flex items-center justify-center">
            <svg viewBox="0 0 160 160" className="absolute inset-0 w-full h-full" aria-hidden>
              <ellipse cx="80" cy="80" rx="74" ry="74" fill="none" stroke="#B8A070" strokeWidth="1.4" />
              <ellipse cx="80" cy="80" rx="68" ry="68" fill="none" stroke="#B8A070" strokeWidth="0.6" />
              <path d="M40 52 C50 42, 60 40, 70 44" stroke="#B8A070" strokeWidth="0.8" fill="none" opacity="0.7" />
              <path d="M120 52 C110 42, 100 40, 90 44" stroke="#B8A070" strokeWidth="0.8" fill="none" opacity="0.7" />
              <path d="M40 108 C50 118, 60 120, 70 116" stroke="#B8A070" strokeWidth="0.8" fill="none" opacity="0.7" />
              <path d="M120 108 C110 118, 100 120, 90 116" stroke="#B8A070" strokeWidth="0.8" fill="none" opacity="0.7" />
            </svg>
            <div className="relative text-center px-4">
              <p className="font-sans text-[9px] tracking-[0.18em] uppercase text-[#B8A070] leading-snug">
                Authenticated
                <br />
                Original
              </p>
              <div className="w-8 h-px bg-[#B8A070] mx-auto my-2" />
              <p className="font-display text-[11px] italic text-[#B8A070] tracking-wide">
                Muse by Arshia
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full max-w-xs">
            <div className="flex-1 h-px bg-[#B8A070]" />
            <div className="w-1.5 h-1.5 rotate-45 bg-[#B8A070]" />
            <p className="font-sans text-[11px] tracking-[0.14em] text-[#6B6560] whitespace-nowrap">
              www.musebyarshia.com
            </p>
            <div className="w-1.5 h-1.5 rotate-45 bg-[#B8A070]" />
            <div className="flex-1 h-px bg-[#B8A070]" />
          </div>
        </div>
      </div>
    )
  }
)
