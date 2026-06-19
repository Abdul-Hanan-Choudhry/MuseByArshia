'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Pencil, Trash2, Plus, X, Upload } from 'lucide-react'
import { generateSlug } from '@/lib/utils'
import type { Product, Category } from '@/types'

interface ProductForm {
  title: string
  slug: string
  description: string
  price: string
  salePrice: string
  size: string
  medium: string
  year: string
  categoryId: string
  isFeatured: boolean
  isVisible: boolean
  isSoldOut: boolean
  images: string[]
}

const emptyForm: ProductForm = {
  title: '',
  slug: '',
  description: '',
  price: '',
  salePrice: '',
  size: '',
  medium: '',
  year: '',
  categoryId: '',
  isFeatured: false,
  isVisible: true,
  isSoldOut: false,
  images: [],
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState<ProductForm>(emptyForm)
  const [loading, setLoading] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    loadProducts()
    loadCategories()
  }, [])

  const loadProducts = async () => {
    const res = await fetch('/api/products?limit=100')
    const data = await res.json()
    setProducts(data.products ?? [])
  }

  const loadCategories = async () => {
    const res = await fetch('/api/categories')
    const data = await res.json()
    setCategories(data)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      ...(name === 'title' && !editId ? { slug: generateSlug(value) } : {}),
    }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(true)
    const formData = new FormData()
    formData.append('file', file)

    const res = await fetch('/api/upload', { method: 'POST', body: formData })
    const data = await res.json()

    if (data.url) {
      setForm((prev) => ({ ...prev, images: [...prev.images, data.url] }))
    }
    setUploadingImage(false)
    if (fileRef.current) fileRef.current.value = ''
  }

  const removeImage = (index: number) => {
    setForm((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }))
  }

  const openNew = () => {
    setForm(emptyForm)
    setEditId(null)
    setShowForm(true)
  }

  const openEdit = (product: Product) => {
    setForm({
      title: product.title,
      slug: product.slug,
      description: product.description,
      price: String(product.price),
      salePrice: product.salePrice ? String(product.salePrice) : '',
      size: product.size,
      medium: product.medium,
      year: product.year ? String(product.year) : '',
      categoryId: product.categoryId,
      isFeatured: product.isFeatured,
      isVisible: product.isVisible,
      isSoldOut: product.isSoldOut,
      images: product.images,
    })
    setEditId(product.id)
    setShowForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const payload = {
      ...form,
      price: parseInt(form.price),
      salePrice: form.salePrice ? parseInt(form.salePrice) : null,
      year: form.year ? parseInt(form.year) : null,
    }

    const res = editId
      ? await fetch(`/api/products/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      : await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })

    if (res.ok) {
      setShowForm(false)
      loadProducts()
    }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this painting? This cannot be undone.')) return
    const res = await fetch(`/api/products/${id}`, { method: 'DELETE' })
    if (!res.ok) {
      alert(`Failed to delete painting (${res.status}). Please try again.`)
      return
    }
    loadProducts()
  }

  const handleToggleSold = async (product: Product) => {
    await fetch(`/api/products/${product.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...product, isSoldOut: !product.isSoldOut }),
    })
    loadProducts()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-900">Products</h1>
        <button
          onClick={openNew}
          className="flex items-center gap-2 bg-ink text-cream font-sans text-sm px-4 py-2 hover:bg-rust transition-colors"
        >
          <Plus size={16} /> <span className="hidden sm:inline">Add Painting</span><span className="sm:hidden">Add</span>
        </button>
      </div>

      {/* Mobile card list */}
      <div className="md:hidden space-y-3">
        {products.map((product) => (
          <div key={product.id} className="bg-white border border-gray-200 rounded-lg p-4 flex gap-3">
            <div className="relative w-14 h-16 bg-gray-100 flex-shrink-0 overflow-hidden rounded">
              {product.images[0] && (
                <Image src={product.images[0]} alt="" fill className="object-cover" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-1">
                <p className="text-sm font-medium text-gray-900 truncate flex-1">{product.title}</p>
                {product.isFeatured && <span className="text-yellow-500 text-sm flex-shrink-0">★</span>}
              </div>
              <p className="text-xs text-gray-500 truncate">{product.category.name} · {product.size}</p>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <span className="text-sm font-medium text-gray-900">Rs. {product.price.toLocaleString()}</span>
                <button
                  onClick={() => handleToggleSold(product)}
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    product.isSoldOut ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                  }`}
                >
                  {product.isSoldOut ? 'Sold' : 'Available'}
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-3 justify-center flex-shrink-0">
              <button onClick={() => openEdit(product)} className="text-gray-400 hover:text-ink p-1">
                <Pencil size={16} />
              </button>
              <button onClick={() => handleDelete(product.id)} className="text-gray-400 hover:text-red-500 p-1">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {['Image', 'Title', 'Category', 'Price', 'Sale Price', 'Status', 'Featured', 'Actions'].map(
                  (h) => (
                    <th
                      key={h}
                      className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="relative w-12 h-14 bg-gray-100 overflow-hidden flex-shrink-0">
                      {product.images[0] && (
                        <Image src={product.images[0]} alt="" fill className="object-cover" />
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-gray-900 max-w-[200px] truncate">{product.title}</p>
                    <p className="text-xs text-gray-500">{product.size}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{product.category.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">Rs. {product.price.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-sale-red">
                    {product.salePrice ? `Rs. ${product.salePrice.toLocaleString()}` : '—'}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleToggleSold(product)}
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        product.isSoldOut
                          ? 'bg-red-100 text-red-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {product.isSoldOut ? 'Sold' : 'Available'}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {product.isFeatured ? '★' : '—'}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(product)} className="text-gray-400 hover:text-ink">
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => handleDelete(product.id)} className="text-gray-400 hover:text-red-500">
                        <Trash2 size={16} />
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
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center overflow-y-auto py-4 px-4">
          <div className="bg-white rounded-lg w-full max-w-2xl p-5 md:p-6 my-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-gray-900">
                {editId ? 'Edit Painting' : 'Add New Painting'}
              </h2>
              <button onClick={() => setShowForm(false)}>
                <X size={20} className="text-gray-400 hover:text-gray-600" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                  <input name="title" value={form.title} onChange={handleChange} required
                    className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-ink" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                  <input name="slug" value={form.slug} onChange={handleChange}
                    className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-ink bg-gray-50" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                  <textarea name="description" value={form.description} onChange={handleChange} required rows={3}
                    className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-ink" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                  <select name="categoryId" value={form.categoryId} onChange={handleChange} required
                    className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-ink">
                    <option value="">Select category</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (PKR) *</label>
                  <input name="price" type="number" value={form.price} onChange={handleChange} required
                    className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-ink" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sale Price (optional)</label>
                  <input name="salePrice" type="number" value={form.salePrice} onChange={handleChange}
                    className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-ink" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Size *</label>
                  <input name="size" value={form.size} onChange={handleChange} required placeholder="e.g. 24 x 36 inches"
                    className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-ink" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Medium *</label>
                  <input name="medium" value={form.medium} onChange={handleChange} required placeholder="e.g. Oil on canvas"
                    className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-ink" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                  <input name="year" type="number" value={form.year} onChange={handleChange}
                    className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-ink" />
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                {[
                  { name: 'isFeatured', label: 'Featured on homepage' },
                  { name: 'isVisible', label: 'Visible in shop' },
                  { name: 'isSoldOut', label: 'Mark as sold' },
                ].map((field) => (
                  <label key={field.name} className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      name={field.name}
                      checked={(form as unknown as Record<string, boolean>)[field.name]}
                      onChange={handleChange}
                    />
                    {field.label}
                  </label>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
                <div className="flex flex-wrap gap-3 mb-3">
                  {form.images.map((img, i) => (
                    <div key={i} className="relative w-20 h-24 group">
                      <Image src={img} alt="" fill className="object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="absolute top-1 right-1 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100"
                      >
                        <X size={10} />
                      </button>
                    </div>
                  ))}
                </div>
                <label className="flex items-center gap-2 cursor-pointer border border-dashed border-gray-300 px-4 py-3 hover:border-ink text-sm text-gray-500 w-fit">
                  <Upload size={16} />
                  {uploadingImage ? 'Uploading...' : 'Upload Image'}
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="sr-only"
                  />
                </label>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-ink text-cream font-sans text-sm px-6 py-2.5 hover:bg-rust transition-colors disabled:opacity-60"
                >
                  {loading ? 'Saving...' : editId ? 'Save Changes' : 'Add Painting'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="border border-gray-300 font-sans text-sm px-6 py-2.5 text-gray-700 hover:bg-gray-50"
                >
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
