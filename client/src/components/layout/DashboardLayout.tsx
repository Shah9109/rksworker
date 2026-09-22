import React from 'react';
import { Header } from './Header';
import { MobileBottomNav } from './MobileBottomNav';
import { useAuthStore } from '../../store/authStore';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-[#f8f6f2] flex flex-col">
      {/* Top Header with Brand Logo on Left, Language & Profile on Top Right */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-8 pb-24 md:pb-8">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>

      {/* Fixed 4-Tab Bottom Navigation Bar on Mobile */}
      <MobileBottomNav />
    </div>
  );
};
