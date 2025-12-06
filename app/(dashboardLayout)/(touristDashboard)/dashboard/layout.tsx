
import Sidebar from '@/components/dashboard/sidebar';
import Topbar from '@/components/dashboard/topbar';
import type { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen  flex">
      <Sidebar />
      <div className="flex-1 lg:ml-64">
        <Topbar />
        <main className="p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
