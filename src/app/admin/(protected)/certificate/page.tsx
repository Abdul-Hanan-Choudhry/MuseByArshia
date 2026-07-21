'use client'
import { useRef, useState } from 'react'
import { Download, Printer } from 'lucide-react'
import {
  CertificateOfAuthenticity,
  type CertificateData,
} from '@/components/certificate/CertificateOfAuthenticity'

function todayFormatted() {
  return new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function makeCertNumber() {
  const year = new Date().getFullYear()
  const random = Math.floor(Math.random() * 9000) + 1000
  return `MBA-${year}-${random}`
}

const emptyForm: CertificateData = {
  title: '',
  name: 'Shanzay Arshia',
  year: String(new Date().getFullYear()),
  size: '',
  medium: '',
  certificateNumber: makeCertNumber(),
  issueDate: todayFormatted(),
}

export default function AdminCertificatePage() {
  const certRef = useRef<HTMLDivElement>(null)
  const [form, setForm] = useState<CertificateData>(emptyForm)
  const [downloading, setDownloading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleDownload = async () => {
    if (!certRef.current) return
    if (!form.title.trim()) {
      setError('Please enter the artwork title before downloading.')
      return
    }

    setDownloading(true)
    setError('')

    try {
      // Wait for fonts + background image so PNG matches on-screen preview
      await document.fonts.ready
      const bg = certRef.current.querySelector('img')
      if (bg && !bg.complete) {
        await new Promise<void>((resolve) => {
          bg.onload = () => resolve()
          bg.onerror = () => resolve()
        })
      }

      const { toPng } = await import('html-to-image')
      const dataUrl = await toPng(certRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: '#F5F0E1',
      })

      const link = document.createElement('a')
      const safeTitle = form.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      link.download = `certificate-${safeTitle || 'artwork'}-${form.certificateNumber}.png`
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error('[certificate] download failed:', err)
      setError('Download failed. Please try again or use Print instead.')
    } finally {
      setDownloading(false)
    }
  }

  const handlePrint = () => {
    if (!form.title.trim()) {
      setError('Please enter the artwork title before printing.')
      return
    }
    setError('')
    window.print()
  }

  const fields: Array<{ name: keyof CertificateData; label: string; placeholder: string }> = [
    { name: 'title', label: 'Title *', placeholder: 'e.g. Golden Hour' },
    { name: 'name', label: 'Artist Name', placeholder: 'e.g. Shanzay Arshia' },
    { name: 'medium', label: 'Medium', placeholder: 'e.g. Acrylic on canvas' },
    { name: 'size', label: 'Dimensions', placeholder: 'e.g. 24 x 36 inches' },
    { name: 'year', label: 'Year', placeholder: 'e.g. 2026' },
    { name: 'certificateNumber', label: 'Certificate No.', placeholder: 'MBA-2026-1234' },
    { name: 'issueDate', label: 'Date', placeholder: todayFormatted() },
  ]

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 print:hidden">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">Certificate of Authenticity</h1>
          <p className="text-sm text-gray-500 mt-1">
            Fill in the fields, then download a PNG matching the official certificate design.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-2 border border-gray-300 text-gray-700 font-sans text-sm px-4 py-2 hover:bg-gray-50"
          >
            <Printer size={16} /> Print
          </button>
          <button
            type="button"
            onClick={handleDownload}
            disabled={downloading}
            className="flex items-center gap-2 bg-ink text-cream font-sans text-sm px-4 py-2 hover:bg-rust transition-colors disabled:opacity-60"
          >
            <Download size={16} />
            {downloading ? 'Preparing...' : 'Download PNG'}
          </button>
        </div>
      </div>

      {error && (
        <p className="print:hidden text-sm text-red-600 mb-4" role="alert">
          {error}
        </p>
      )}

      <div className="grid lg:grid-cols-[320px_1fr] gap-6 items-start">
        <div className="print:hidden bg-white border border-gray-200 rounded-lg p-5 space-y-3 sticky top-4">
          <h2 className="font-semibold text-gray-900 text-sm mb-1">Editable Fields</h2>
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-xs text-gray-500 mb-1">{field.label}</label>
              <input
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-ink"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setForm({
                ...emptyForm,
                certificateNumber: makeCertNumber(),
                issueDate: todayFormatted(),
                year: String(new Date().getFullYear()),
              })
            }
            className="w-full border border-gray-300 text-gray-600 text-sm py-2 mt-2 hover:bg-gray-50"
          >
            Reset &amp; New Certificate No.
          </button>
        </div>

        <div className="print:p-0 overflow-auto">
          <div className="print:hidden mb-3 text-xs text-gray-400 uppercase tracking-wider">
            Live Preview — A4 size
          </div>
          <div className="admin-print-cert inline-block shadow-lg print:shadow-none origin-top-left scale-[0.48] sm:scale-[0.55] md:scale-[0.65] lg:scale-[0.72] print:scale-100 print:origin-top-left">
            <CertificateOfAuthenticity ref={certRef} data={form} />
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          .admin-print-cert,
          .admin-print-cert * {
            visibility: visible !important;
          }
          .admin-print-cert {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            transform: none !important;
            box-shadow: none !important;
          }
          @page {
            size: A4 portrait;
            margin: 0;
          }
        }
      `}</style>
    </div>
  )
}
