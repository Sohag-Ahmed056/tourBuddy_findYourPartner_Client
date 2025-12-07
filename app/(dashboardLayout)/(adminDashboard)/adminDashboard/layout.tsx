
import AdminSidebar from '@/components/dashboard/adminSidebar';
import Sidebar from '@/components/dashboard/sidebar';
import Topbar from '@/components/dashboard/topbar';
import type { ReactNode } from 'react';

export default function AdminDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen  flex">
     <AdminSidebar />
      <div className="flex-1 lg:ml-64">
        <Topbar />
        <main className="p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
