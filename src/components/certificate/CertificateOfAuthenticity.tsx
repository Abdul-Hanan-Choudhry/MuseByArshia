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

/** Soft watercolor botanical — bottom-left / top-right corners */
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
      <ellipse cx="50" cy="230" rx="120" ry="90" fill="#E8C4B0" fillOpacity="0.55" />
      <ellipse cx="90" cy="200" rx="70" ry="55" fill="#D4A574" fillOpacity="0.28" />
      <ellipse cx="40" cy="200" rx="40" ry="50" fill="#C4A882" fillOpacity="0.2" />

      {/* stems */}
      <path d="M45 250 C70 180 110 150 155 95" stroke="#A8845A" strokeWidth="1.4" strokeOpacity="0.55" />
      <path d="M70 245 C95 190 130 170 165 130" stroke="#A8845A" strokeWidth="1.1" strokeOpacity="0.4" />
      <path d="M55 240 C80 200 100 180 125 155" stroke="#A8845A" strokeWidth="1" strokeOpacity="0.35" />

      {/* leaves */}
      <ellipse cx="152" cy="92" rx="18" ry="28" transform="rotate(-40 152 92)" fill="#B8956A" fillOpacity="0.45" />
      <ellipse cx="130" cy="125" rx="14" ry="24" transform="rotate(-25 130 125)" fill="#B8956A" fillOpacity="0.38" />
      <ellipse cx="108" cy="155" rx="12" ry="20" transform="rotate(-15 108 155)" fill="#A8845A" fillOpacity="0.35" />
      <ellipse cx="168" cy="128" rx="13" ry="22" transform="rotate(15 168 128)" fill="#C4A070" fillOpacity="0.32" />
      <ellipse cx="88" cy="185" rx="11" ry="18" transform="rotate(-8 88 185)" fill="#A8845A" fillOpacity="0.3" />

      {/* flower buds */}
      <circle cx="62" cy="210" r="7" fill="#D4917A" fillOpacity="0.5" />
      <circle cx="78" cy="195" r="5" fill="#D4917A" fillOpacity="0.4" />
      <circle cx="95" cy="175" r="4" fill="#C4A882" fillOpacity="0.45" />
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
        className="relative w-[794px] h-[1123px] overflow-hidden select-none"
        style={{ backgroundColor: '#F5F0E8', color: '#2C2926' }}
      >
        {/* Paper texture wash */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 10% 90%, rgba(232,196,176,0.5) 0%, transparent 40%), radial-gradient(ellipse at 92% 6%, rgba(196,168,130,0.35) 0%, transparent 36%)',
          }}
        />

        <BotanicalCorner />
        <BotanicalCorner flip />

        {/* Double gold border */}
        <div className="absolute inset-[24px] border-[1.5px] border-[#B8A070]" />
        <div className="absolute inset-[32px] border border-[#B8A070]" />

        {/* Corner diamonds */}
        {[
          'top-[18px] left-[18px]',
          'top-[18px] right-[18px]',
          'bottom-[18px] left-[18px]',
          'bottom-[18px] right-[18px]',
        ].map((pos) => (
          <div key={pos} className={`absolute ${pos} w-3 h-3 rotate-45 bg-[#B8A070]`} />
        ))}

        <div className="relative z-10 h-full flex flex-col items-center px-[80px] pt-[68px] pb-[48px]">
          {/* Header */}
          <p
            className="text-[11px] tracking-[0.45em] uppercase text-[#B8A070] mb-3"
            style={{ fontFamily: 'var(--font-sans), Arial, sans-serif' }}
          >
            Original Artwork
          </p>

          <h1
            className="text-[46px] font-light italic leading-none tracking-wide text-[#2C2926]"
            style={{ fontFamily: 'var(--font-display), Georgia, serif' }}
          >
            Muse by Arshia
          </h1>

          <div className="flex items-center gap-3 my-5 w-[280px]">
            <div className="flex-1 h-px bg-[#B8A070]" />
            <div className="w-[7px] h-[7px] rotate-45 bg-[#B8A070]" />
            <div className="flex-1 h-px bg-[#B8A070]" />
          </div>

          <h2
            className="text-[14px] tracking-[0.35em] uppercase text-[#B8A070] font-medium mb-9"
            style={{ fontFamily: 'var(--font-sans), Arial, sans-serif' }}
          >
            Certificate of Authenticity
          </h2>

          {/* Body copy — matches reference tone + editable name in gold */}
          <p
            className="text-center text-[15.5px] leading-[1.85] text-[#3D3935] max-w-[470px] mb-3"
            style={{ fontFamily: 'var(--font-display), Georgia, serif' }}
          >
            This is to certify that the artwork described below is an original
            painting created entirely by{' '}
            <span className="italic text-[#B8A070] font-semibold">{name}</span>.
          </p>
          <p
            className="text-center text-[14px] leading-[1.7] text-[#3D3935] max-w-[440px] mb-9"
            style={{ fontFamily: 'var(--font-display), Georgia, serif' }}
          >
            All copyright and reproduction rights are retained by the artist.
          </p>

          {/* Title — large gold italic in quotes */}
          <p
            className="text-[36px] italic text-[#B8A070] leading-snug text-center px-2 mb-10"
            style={{ fontFamily: 'var(--font-accent), Georgia, serif' }}
          >
            &ldquo;{title}&rdquo;
          </p>

          {/* Details: Label | Value  (reference layout) */}
          <div className="w-[360px] space-y-3.5 mb-auto">
            {details.map((item) => (
              <div
                key={item.label}
                className="grid grid-cols-[1fr_16px_1.4fr] items-center"
              >
                <span
                  className="text-[13px] text-right text-[#2C2926] pr-1"
                  style={{ fontFamily: 'var(--font-sans), Arial, sans-serif' }}
                >
                  {item.label}
                </span>
                <span className="text-center text-[#B8A070] text-[14px]">|</span>
                <span
                  className="text-[15px] italic text-[#2C2926] pl-1"
                  style={{ fontFamily: 'var(--font-display), Georgia, serif' }}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          {/* Signature left + Date right */}
          <div className="w-full max-w-[500px] flex justify-between items-end mt-12 mb-9">
            <div className="text-center w-[210px]">
              <p
                className="text-[40px] text-[#2C2926] leading-none mb-0"
                style={{ fontFamily: 'var(--font-script), cursive' }}
              >
                Shanzay
              </p>
              <div className="flex items-center gap-2 mb-2 mt-0.5">
                <div className="flex-1 h-px bg-[#B8A070]" />
                <div className="w-[6px] h-[6px] rotate-45 bg-[#B8A070]" />
                <div className="flex-1 h-px bg-[#B8A070]" />
              </div>
              <p
                className="text-[10px] tracking-[0.08em] text-[#6B6560]"
                style={{ fontFamily: 'var(--font-sans), Arial, sans-serif' }}
              >
                Artist Signature / Shanzay Arshia
              </p>
            </div>

            <div className="text-center w-[180px]">
              <p
                className="text-[16px] italic text-[#2C2926] h-10 flex items-end justify-center mb-0"
                style={{ fontFamily: 'var(--font-display), Georgia, serif' }}
              >
                {issueDate}
              </p>
              <div className="flex items-center gap-2 mb-2 mt-0.5">
                <div className="flex-1 h-px bg-[#B8A070]" />
                <div className="w-[6px] h-[6px] rotate-45 bg-[#B8A070]" />
                <div className="flex-1 h-px bg-[#B8A070]" />
              </div>
              <p
                className="text-[10px] tracking-[0.22em] uppercase text-[#6B6560]"
                style={{ fontFamily: 'var(--font-sans), Arial, sans-serif' }}
              >
                Date
              </p>
            </div>
          </div>

          {/* Oval seal */}
          <div className="relative w-[148px] h-[148px] mb-5 flex items-center justify-center">
            <svg viewBox="0 0 160 160" className="absolute inset-0 w-full h-full" aria-hidden>
              <ellipse cx="80" cy="80" rx="76" ry="76" fill="none" stroke="#B8A070" strokeWidth="1.6" />
              <ellipse cx="80" cy="80" rx="70" ry="70" fill="none" stroke="#B8A070" strokeWidth="0.7" />
              {/* flourishes */}
              <path d="M38 48 C52 36, 68 34, 78 42" stroke="#B8A070" strokeWidth="0.9" fill="none" />
              <path d="M122 48 C108 36, 92 34, 82 42" stroke="#B8A070" strokeWidth="0.9" fill="none" />
              <path d="M38 112 C52 124, 68 126, 78 118" stroke="#B8A070" strokeWidth="0.9" fill="none" />
              <path d="M122 112 C108 124, 92 126, 82 118" stroke="#B8A070" strokeWidth="0.9" fill="none" />
              <circle cx="80" cy="28" r="2" fill="#B8A070" />
              <circle cx="80" cy="132" r="2" fill="#B8A070" />
            </svg>
            <div className="relative text-center px-3 z-10">
              <p
                className="text-[9px] tracking-[0.2em] uppercase text-[#B8A070] leading-snug"
                style={{ fontFamily: 'var(--font-sans), Arial, sans-serif' }}
              >
                Authenticated
                <br />
                Original
              </p>
              <div className="w-9 h-px bg-[#B8A070] mx-auto my-2" />
              <p
                className="text-[12px] italic text-[#B8A070]"
                style={{ fontFamily: 'var(--font-display), Georgia, serif' }}
              >
                Muse by Arshia
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center gap-3 w-[300px]">
            <div className="flex-1 h-px bg-[#B8A070]" />
            <div className="w-[6px] h-[6px] rotate-45 bg-[#B8A070]" />
            <p
              className="text-[11px] tracking-[0.12em] text-[#6B6560] whitespace-nowrap"
              style={{ fontFamily: 'var(--font-sans), Arial, sans-serif' }}
            >
              www.musebyarshia.com
            </p>
            <div className="w-[6px] h-[6px] rotate-45 bg-[#B8A070]" />
            <div className="flex-1 h-px bg-[#B8A070]" />
          </div>
        </div>
      </div>
    )
  }
)
