import { redirect } from 'next/navigation'

interface PageProps {
  params: { category: string }
}

export default function CategoryPage({ params }: PageProps) {
  redirect(`/shop?category=${params.category}`)
}
