import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Briefcase,
  Layers,
  User,
  LayoutDashboard,
  Search,
  CheckCircle,
  Building2,
  Rss,
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useUIStore } from '../../store/uiStore';

export const MobileBottomNav: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated, user } = useAuthStore();
  const { language } = useUIStore();

  const isWorker = isAuthenticated && user?.role === 'worker';
  const isCompany = isAuthenticated && user?.role === 'company';
  const isAdmin = isAuthenticated && user?.role === 'admin';

  const navItems = isAuthenticated
    ? isWorker
      ? [
          { labelHi: 'होम', labelEn: 'Home', path: '/worker/dashboard', icon: LayoutDashboard },
          { labelHi: 'नौकरियां', labelEn: 'Jobs', path: '/worker/jobs', icon: Search },
          { labelHi: 'आवेदन', labelEn: 'Track', path: '/worker/applied', icon: CheckCircle },
          { labelHi: 'फीड', labelEn: 'Feed', path: '/feed', icon: Rss },
          { labelHi: 'प्रोफाइल', labelEn: 'Profile', path: '/worker/profile', icon: User },
        ]
      : isCompany
      ? [
          { labelHi: 'होम', labelEn: 'Home', path: '/company/dashboard', icon: LayoutDashboard },
          { labelHi: 'पोस्ट जॉब', labelEn: 'Post Job', path: '/company/jobs/new', icon: Briefcase },
          { labelHi: 'आवेदक', labelEn: 'Applicants', path: '/company/applicants', icon: CheckCircle },
          { labelHi: 'वर्कर', labelEn: 'Workers', path: '/company/workers', icon: Search },
          { labelHi: 'फीड', labelEn: 'Feed', path: '/feed', icon: Rss },
        ]
      : [
          { labelHi: 'होम', labelEn: 'Home', path: '/admin/dashboard', icon: LayoutDashboard },
          { labelHi: 'वेरीफाई', labelEn: 'Verify', path: '/admin/workers/verify', icon: CheckCircle },
          { labelHi: 'कैटेगरी', labelEn: 'Categories', path: '/admin/categories', icon: Layers },
          { labelHi: 'नौकरियां', labelEn: 'Jobs', path: '/worker/jobs', icon: Briefcase },
          { labelHi: 'फीड', labelEn: 'Feed', path: '/feed', icon: Rss },
        ]
    : [
        { labelHi: 'होम', labelEn: 'Home', path: '/', icon: Home },
        { labelHi: 'उद्योग', labelEn: 'Industries', path: '/industries', icon: Building2 },
        { labelHi: 'सेवाएं', labelEn: 'Services', path: '/services', icon: Layers },
        { labelHi: 'नौकरियां', labelEn: 'Jobs', path: '/jobs', icon: Briefcase },
        { labelHi: 'फीड', labelEn: 'Feed', path: '/feed', icon: Rss },
      ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 w-full z-50 bg-white/98 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-0 py-0 pb-[env(safe-area-inset-bottom)] select-none">
      <div className="flex items-center w-full justify-between">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.path === '/'
              ? location.pathname === '/'
              : item.path === '/jobs'
              ? location.pathname === '/jobs' || location.pathname.startsWith('/worker/jobs')
              : location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex-1 flex flex-col items-center justify-center pt-2.5 pb-2 relative transition-all duration-150 ${
                isActive
                  ? 'text-industrial-600 font-extrabold'
                  : 'text-slate-500 hover:text-slate-800 font-medium'
              }`}
            >
              {/* Active Top Bar Indicator */}
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 sm:w-10 h-1 bg-industrial-600 rounded-b-full shadow-sm"></span>
              )}
              <Icon
                className={`w-5 h-5 mb-1 transition-transform ${
                  isActive ? 'scale-110 text-industrial-600' : 'text-slate-500'
                }`}
              />
              <span className="text-[11px] leading-tight tracking-tight">
                {language === 'hi' ? item.labelHi : item.labelEn}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
