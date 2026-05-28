export interface Category {
  id: string
  name: string
  slug: string
  description?: string | null
  coverImage?: string | null
  sortOrder: number
  isVisible: boolean
  createdAt: string
}

export interface Product {
  id: string
  title: string
  slug: string
  description: string
  price: number
  salePrice?: number | null
  images: string[]
  size: string
  medium: string
  year?: number | null
  isSoldOut: boolean
  isVisible: boolean
  isFeatured: boolean
  sortOrder: number
  categoryId: string
  category: { name: string; slug: string }
  createdAt: string
  updatedAt: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface DiscountCode {
  id: string
  code: string
  type: 'PERCENTAGE' | 'FIXED'
  value: number
  minimumOrder?: number | null
  maxUses?: number | null
  usedCount: number
  isActive: boolean
  expiresAt?: string | null
  createdAt: string
}

export interface SaleBanner {
  id: string
  message: string
  isActive: boolean
  startDate?: string | null
  endDate?: string | null
  linkUrl?: string | null
  linkText?: string | null
  createdAt: string
}

export interface Order {
  id: string
  orderNumber: string
  customerName: string
  customerEmail: string
  customerPhone: string
  address: string
  city: string
  postalCode?: string | null
  subtotal: number
  discountAmount: number
  shippingCost: number
  total: number
  paymentMethod: 'COD' | 'JAZZCASH' | 'EASYPAISA' | 'BANK_TRANSFER'
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED'
  status: 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'
  notes?: string | null
  trackingNumber?: string | null
  items: OrderItem[]
  discountCode?: DiscountCode | null
  createdAt: string
  updatedAt: string
}

export interface OrderItem {
  id: string
  quantity: number
  price: number
  productId: string
  product: Product
}

export interface PaginatedProducts {
  products: Product[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}
