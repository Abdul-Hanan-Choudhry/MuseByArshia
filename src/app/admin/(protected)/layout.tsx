import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { AdminSidebar } from '@/components/admin/AdminSidebar'

export default async function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')
  const role = (session.user as { role?: string })?.role
  if (role !== 'ADMIN' && role !== 'SUPERADMIN') redirect('/admin/login')

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <main className="ml-64 flex-1 p-8 min-h-screen overflow-auto">{children}</main>
    </div>
  )
}
