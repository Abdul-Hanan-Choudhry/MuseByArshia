'use client'
import { forwardRef } from 'react'

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

/**
 * Original Muse by Arshia website-branded certificate
 * (cream / ink / gold · Cormorant · Great Vibes)
 */
export const CertificateOfAuthenticity = forwardRef<HTMLDivElement, Props>(
  function CertificateOfAuthenticity({ data }, ref) {
    return (
      <div
        ref={ref}
        className="relative w-[794px] h-[1123px] bg-[#F5F0E8] text-[#1A1714] overflow-hidden select-none font-sans"
      >
        {/* Outer frame */}
        <div className="absolute inset-[28px] border border-[#B8A070]" />
        <div className="absolute inset-[36px] border border-[#B8A070]" />

        {/* Corner diamonds */}
        {[
          'top-[22px] left-[22px]',
          'top-[22px] right-[22px]',
          'bottom-[22px] left-[22px]',
          'bottom-[22px] right-[22px]',
        ].map((pos) => (
          <div
            key={pos}
            className={`absolute ${pos} w-3 h-3 rotate-45 bg-[#B8A070]`}
          />
        ))}

        {/* Soft blush wash */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 20%, rgba(232,196,176,0.28) 0%, transparent 55%), radial-gradient(ellipse at 50% 100%, rgba(184,160,112,0.12) 0%, transparent 45%)',
          }}
        />

        <div className="relative h-full flex flex-col items-center px-16 py-14">
          {/* Header */}
          <p className="font-sans text-[11px] tracking-[0.45em] uppercase text-[#B8A070] mb-3">
            Original Artwork
          </p>

          <h1 className="font-display text-[42px] font-light italic text-[#1A1714] leading-none tracking-wide">
            Muse by Arshia
          </h1>

          <div className="flex items-center gap-3 my-5 w-full max-w-md">
            <div className="flex-1 h-px bg-[#B8A070]" />
            <div className="w-2 h-2 rotate-45 bg-[#B8A070]" />
            <div className="flex-1 h-px bg-[#B8A070]" />
          </div>

          <h2 className="font-sans text-[22px] tracking-[0.28em] uppercase text-[#1A1714] font-normal mb-10">
            Certificate of Authenticity
          </h2>

          {/* Body */}
          <p className="font-sans text-center text-[15px] leading-relaxed text-[#4A4540] max-w-lg mb-8">
            This certifies that the artwork described below is an
            <span className="text-[#1A1714] font-medium"> original, handcrafted painting </span>
            created by the artist
            <span className="text-[#1A1714] font-medium"> {data.name.trim() || 'Shanzay Arshia'}</span>,
            and is hereby authenticated as a one-of-a-kind work from Muse by Arshia.
          </p>

          {/* Artwork title */}
          <div className="text-center mb-10 w-full">
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#9B7B5A] mb-2">
              Title of Work
            </p>
            <p className="font-accent text-[32px] italic text-[#1A1714] leading-snug px-4">
              {data.title.trim() || 'Untitled'}
            </p>
          </div>

          {/* Details grid */}
          <div className="font-sans w-full max-w-md grid grid-cols-2 gap-x-10 gap-y-5 mb-10">
            {[
              { label: 'Name', value: data.name.trim() || '—' },
              { label: 'Medium', value: data.medium.trim() || '—' },
              { label: 'Dimension', value: data.size.trim() || '—' },
              { label: 'Year', value: data.year.trim() || '—' },
              { label: 'Certificate No.', value: data.certificateNumber.trim() || '—' },
              { label: 'Date', value: data.issueDate.trim() || '—' },
            ].map((item) => (
              <div key={item.label} className="border-b border-[#E0DAD0] pb-2">
                <p className="text-[10px] tracking-[0.22em] uppercase text-[#9B7B5A] mb-1">
                  {item.label}
                </p>
                <p className="text-[14px] text-[#1A1714]">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="flex-1" />

          {/* Signature block */}
          <div className="w-full max-w-md flex justify-between items-end mb-6">
            <div className="text-center w-44">
              <p className="font-script text-[40px] text-[#1A1714] leading-none mb-1">
                Shanzay
              </p>
              <div className="h-px bg-[#B8A070] mb-2" />
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#9B7B5A]">
                Artist Signature
              </p>
              <p className="font-sans text-[12px] text-[#1A1714] mt-1">
                Shanzay Arshia
              </p>
            </div>

            <div className="text-center w-44">
              <p className="font-sans text-[15px] text-[#1A1714] mb-1 h-9 flex items-end justify-center">
                {data.issueDate.trim() || '—'}
              </p>
              <div className="h-px bg-[#B8A070] mb-2" />
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#9B7B5A]">
                Date of Issue
              </p>
            </div>
          </div>

          {/* Footer seal */}
          <div className="text-center">
            <div className="inline-flex flex-col items-center border border-[#B8A070] rounded-full px-6 py-3 mb-3">
              <p className="font-sans text-[9px] tracking-[0.35em] uppercase text-[#B8A070]">
                Authenticated Original
              </p>
              <p className="font-display text-[13px] italic text-[#1A1714] mt-0.5">
                Muse by Arshia
              </p>
            </div>
            <p className="font-sans text-[11px] tracking-[0.18em] text-[#9B7B5A]">
              www.musebyarshia.com
            </p>
          </div>
        </div>
      </div>
    )
  }
)
