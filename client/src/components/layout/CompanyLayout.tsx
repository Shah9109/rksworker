import React from 'react';
import { PortalSidebar } from './PortalSidebar';

interface CompanyLayoutProps {
  children: React.ReactNode;
}

export const CompanyLayout: React.FC<CompanyLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#faf7f4] flex">
      {/* Left Navigation Sidebar: Full (w-64) on Desktop, Minimized to Icons (w-14 sm:w-16) on Mobile */}
      <PortalSidebar role="company" />

      {/* Main Content Area: Offset by sidebar width on all viewports */}
      <div className="flex-1 min-w-0 ml-14 sm:ml-16 md:ml-64 flex flex-col min-h-screen">
        <main className="flex-1 p-3 sm:p-6 md:p-8">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

