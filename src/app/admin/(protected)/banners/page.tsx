'use client'
import { useState, useEffect } from 'react'
import { Plus, X } from 'lucide-react'

interface Banner {
  id: string
  message: string
  isActive: boolean
  startDate?: string | null
  endDate?: string | null
  linkUrl?: string | null
  linkText?: string | null
  createdAt: string
}

const emptyForm = {
  message: '',
  isActive: false,
  startDate: '',
  endDate: '',
  linkUrl: '',
  linkText: '',
}

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<Banner[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadBanners()
  }, [])

  const loadBanners = async () => {
    const res = await fetch('/api/banners/all')
    const data = await res.json()
    setBanners(data)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const payload = {
      ...form,
      startDate: form.startDate || null,
      endDate: form.endDate || null,
      linkUrl: form.linkUrl || null,
      linkText: form.linkText || null,
    }

    if (editId) {
      await fetch(`/api/banners/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    } else {
      await fetch('/api/banners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    }

    setShowForm(false)
    loadBanners()
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this banner?')) return
    await fetch(`/api/banners/${id}`, { method: 'DELETE' })
    loadBanners()
  }

  const handleToggle = async (banner: Banner) => {
    await fetch(`/api/banners/${banner.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...banner, isActive: !banner.isActive }),
    })
    loadBanners()
  }

  const openNew = () => {
    setForm(emptyForm)
    setEditId(null)
    setShowForm(true)
  }

  const openEdit = (banner: Banner) => {
    setForm({
      message: banner.message,
      isActive: banner.isActive,
      startDate: banner.startDate ? banner.startDate.slice(0, 10) : '',
      endDate: banner.endDate ? banner.endDate.slice(0, 10) : '',
      linkUrl: banner.linkUrl ?? '',
      linkText: banner.linkText ?? '',
    })
    setEditId(banner.id)
    setShowForm(true)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-900">Sale Banners</h1>
        <button
          onClick={openNew}
          className="flex items-center gap-2 bg-ink text-cream font-sans text-sm px-4 py-2 hover:bg-rust transition-colors"
        >
          <Plus size={16} /> New Banner
        </button>
      </div>

      <p className="text-sm text-gray-500 mb-6">Only one banner can be active at a time. Activating one deactivates all others.</p>

      <div className="space-y-4">
        {banners.map((banner) => (
          <div key={banner.id} className="bg-white border border-gray-200 rounded-lg p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <p className="font-medium text-gray-900 mb-1">{banner.message}</p>
                {banner.linkUrl && (
                  <p className="text-xs text-gray-500">
                    Link: {banner.linkUrl} ({banner.linkText})
                  </p>
                )}
                {(banner.startDate || banner.endDate) && (
                  <p className="text-xs text-gray-500">
                    {banner.startDate && `From: ${new Date(banner.startDate).toLocaleDateString()}`}
                    {banner.endDate && ` To: ${new Date(banner.endDate).toLocaleDateString()}`}
                  </p>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => handleToggle(banner)}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${
                    banner.isActive
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {banner.isActive ? '● Active' : '○ Inactive'}
                </button>
                <button onClick={() => openEdit(banner)} className="text-xs text-gray-500 hover:text-ink underline">
                  Edit
                </button>
                <button onClick={() => handleDelete(banner.id)} className="text-xs text-red-400 hover:text-red-600 underline">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-lg w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold">{editId ? 'Edit Banner' : 'Create Banner'}</h2>
              <button onClick={() => setShowForm(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                <input name="message" value={form.message} onChange={handleChange} required
                  placeholder="e.g. 🎉 Eid Sale — 30% off all originals! Use code EID30"
                  className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-ink" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Link URL (optional)</label>
                  <input name="linkUrl" value={form.linkUrl} onChange={handleChange} placeholder="/shop"
                    className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-ink" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Link Text</label>
                  <input name="linkText" value={form.linkText} onChange={handleChange} placeholder="Shop Now"
                    className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-ink" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input type="date" name="startDate" value={form.startDate} onChange={handleChange}
                    className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-ink" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input type="date" name="endDate" value={form.endDate} onChange={handleChange}
                    className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-ink" />
                </div>
              </div>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" name="isActive" checked={form.isActive}
                  onChange={handleChange} />
                Activate now
              </label>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={loading}
                  className="bg-ink text-cream text-sm px-6 py-2.5 hover:bg-rust transition-colors disabled:opacity-60">
                  {loading ? 'Saving...' : 'Save Banner'}
                </button>
                <button type="button" onClick={() => setShowForm(false)}
                  className="border border-gray-300 text-sm px-6 py-2.5 text-gray-700 hover:bg-gray-50">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
