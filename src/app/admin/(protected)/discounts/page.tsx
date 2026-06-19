'use client'
import { useState, useEffect } from 'react'
import { Plus, X } from 'lucide-react'
import type { DiscountCode } from '@/types'

const emptyForm = {
  code: '',
  type: 'PERCENTAGE' as 'PERCENTAGE' | 'FIXED',
  value: '',
  minimumOrder: '',
  maxUses: '',
  expiresAt: '',
  isActive: true,
}

export default function AdminDiscountsPage() {
  const [codes, setCodes] = useState<DiscountCode[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(false)

  useEffect(() => { loadCodes() }, [])

  const loadCodes = async () => {
    const res = await fetch('/api/discount-codes')
    const data = await res.json()
    setCodes(data)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const payload = {
      code: form.code.toUpperCase(),
      type: form.type,
      value: parseInt(form.value),
      minimumOrder: form.minimumOrder ? parseInt(form.minimumOrder) : null,
      maxUses: form.maxUses ? parseInt(form.maxUses) : null,
      expiresAt: form.expiresAt || null,
      isActive: form.isActive,
    }

    if (editId) {
      await fetch(`/api/discount-codes/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    } else {
      await fetch('/api/discount-codes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    }

    setShowForm(false)
    loadCodes()
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this discount code?')) return
    await fetch(`/api/discount-codes/${id}`, { method: 'DELETE' })
    loadCodes()
  }

  const openEdit = (code: DiscountCode) => {
    setForm({
      code: code.code,
      type: code.type,
      value: String(code.value),
      minimumOrder: code.minimumOrder ? String(code.minimumOrder) : '',
      maxUses: code.maxUses ? String(code.maxUses) : '',
      expiresAt: code.expiresAt ? code.expiresAt.slice(0, 10) : '',
      isActive: code.isActive,
    })
    setEditId(code.id)
    setShowForm(true)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-900">Discount Codes</h1>
        <button
          onClick={() => { setForm(emptyForm); setEditId(null); setShowForm(true) }}
          className="flex items-center gap-2 bg-ink text-cream font-sans text-sm px-4 py-2 hover:bg-rust transition-colors"
        >
          <Plus size={16} /> New Code
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {['Code', 'Type', 'Value', 'Min Order', 'Uses', 'Expires', 'Active', 'Actions'].map((h) => (
                <th key={h} className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {codes.map((code) => (
              <tr key={code.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 font-mono text-sm font-medium text-ink">{code.code}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{code.type}</td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {code.type === 'PERCENTAGE' ? `${code.value}%` : `Rs. ${code.value.toLocaleString()}`}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {code.minimumOrder ? `Rs. ${code.minimumOrder.toLocaleString()}` : '—'}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {code.usedCount}{code.maxUses ? ` / ${code.maxUses}` : ''}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {code.expiresAt ? new Date(code.expiresAt).toLocaleDateString('en-PK') : '—'}
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    code.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {code.isActive ? 'Active' : 'Off'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-3">
                    <button onClick={() => openEdit(code)} className="text-xs text-gray-500 hover:text-ink underline">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(code.id)} className="text-xs text-red-400 hover:text-red-600 underline">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold">{editId ? 'Edit Code' : 'Create Discount Code'}</h2>
              <button onClick={() => setShowForm(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Code *</label>
                  <input name="code" value={form.code} onChange={handleChange} required
                    placeholder="EID30"
                    className="w-full border border-gray-300 px-3 py-2 text-sm font-mono uppercase focus:outline-none focus:border-ink" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                  <select name="type" value={form.type} onChange={handleChange}
                    className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-ink">
                    <option value="PERCENTAGE">Percentage (%)</option>
                    <option value="FIXED">Fixed (Rs.)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Value * ({form.type === 'PERCENTAGE' ? '%' : 'Rs.'})
                  </label>
                  <input name="value" type="number" value={form.value} onChange={handleChange} required
                    className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-ink" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Order (Rs.)</label>
                  <input name="minimumOrder" type="number" value={form.minimumOrder} onChange={handleChange}
                    className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-ink" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Uses</label>
                  <input name="maxUses" type="number" value={form.maxUses} onChange={handleChange}
                    placeholder="Leave blank for unlimited"
                    className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-ink" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expires At</label>
                  <input type="date" name="expiresAt" value={form.expiresAt} onChange={handleChange}
                    className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-ink" />
                </div>
              </div>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} />
                Active
              </label>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={loading}
                  className="bg-ink text-cream text-sm px-6 py-2.5 hover:bg-rust transition-colors disabled:opacity-60">
                  {loading ? 'Saving...' : 'Save Code'}
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
