import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Search,
  Rss,
  Globe,
  ShieldCheck,
  Layers,
  LogOut,
  Building2,
  ShieldAlert,
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useUIStore } from '../../store/uiStore';
import { Logo } from '../ui/Logo';

interface PortalSidebarProps {
  role: 'company' | 'admin';
}

export const PortalSidebar: React.FC<PortalSidebarProps> = ({ role }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { language, setLanguage } = useUIStore();

  const isCompany = role === 'company';

  const companyNav = [
    {
      labelHi: 'डैशबोर्ड',
      labelEn: 'Dashboard',
      path: '/company/dashboard',
      icon: LayoutDashboard,
    },
    {
      labelHi: 'नई नौकरी पोस्ट करें',
      labelEn: 'Post Job',
      path: '/company/jobs/new',
      icon: Briefcase,
    },
    {
      labelHi: 'प्राप्त आवेदन',
      labelEn: 'Applicants',
      path: '/company/applicants',
      icon: Users,
    },
    {
      labelHi: 'कारीगर खोजें',
      labelEn: 'Search Workers',
      path: '/company/workers',
      icon: Search,
    },
    {
      labelHi: 'इंडस्ट्रियल फीड',
      labelEn: 'Feed & Stories',
      path: '/feed',
      icon: Rss,
    },
    {
      labelHi: 'मुख्य वेबसाइट',
      labelEn: 'Public Site',
      path: '/',
      icon: Globe,
    },
  ];

  const adminNav = [
    {
      labelHi: 'एडमिन डैशबोर्ड',
      labelEn: 'Dashboard',
      path: '/admin/dashboard',
      icon: LayoutDashboard,
    },
    {
      labelHi: 'वर्कर वेरिफिकेशन',
      labelEn: 'Worker Verification',
      path: '/admin/workers/verify',
      icon: ShieldCheck,
    },
    {
      labelHi: 'ट्रेड व श्रेणियां',
      labelEn: 'Categories',
      path: '/admin/categories',
      icon: Layers,
    },
    {
      labelHi: 'सभी नौकरियां',
      labelEn: 'All Job Postings',
      path: '/worker/jobs',
      icon: Briefcase,
    },
    {
      labelHi: 'कम्युनिटी फीड',
      labelEn: 'Feed & Posts',
      path: '/feed',
      icon: Rss,
    },
    {
      labelHi: 'मुख्य वेबसाइट',
      labelEn: 'Public Site',
      path: '/',
      icon: Globe,
    },
  ];

  const navItems = isCompany ? companyNav : adminNav;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside
      aria-label={`${role === 'company' ? 'Company' : 'Admin'} Navigation Sidebar`}
      className="fixed inset-y-0 left-0 z-40 w-14 sm:w-16 md:w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between shadow-xs transition-all duration-200 select-none"
    >
      {/* Top Header & Brand */}
      <div>
        {/* Brand Logo Container */}
        <div className="h-16 px-2 sm:px-3 md:px-5 flex items-center justify-center md:justify-start border-b border-slate-100">
          <Link to="/" className="flex items-center gap-2">
            {/* On mobile: show icon only. On desktop: full logo with text */}
            <div className="md:hidden">
              <Logo size="sm" showText={false} />
            </div>
            <div className="hidden md:block">
              <Logo size="md" showText={true} />
            </div>
          </Link>
        </div>

        {/* Portal Role Badge (Desktop Only) */}
        <div className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-industrial-50/70 border-b border-industrial-100/60 text-industrial-800 text-xs font-extrabold uppercase tracking-wider">
          {isCompany ? (
            <>
              <Building2 className="w-3.5 h-3.5 text-industrial-600" />
              <span>{language === 'hi' ? 'कंपनी पोर्टल' : 'Employer Portal'}</span>
            </>
          ) : (
            <>
              <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
              <span>{language === 'hi' ? 'सुपर एडमिन पैनल' : 'Super Admin Panel'}</span>
            </>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="p-1 sm:p-2 md:p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                title={language === 'hi' ? item.labelHi : item.labelEn}
                className={`group relative flex items-center justify-center md:justify-start gap-3 py-2.5 px-2 md:px-3.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-150 ${
                  isActive
                    ? 'bg-industrial-50 text-industrial-600 font-black shadow-xs md:border-r-4 md:border-industrial-600'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {/* Active Indicator Bar on Mobile */}
                {isActive && (
                  <span className="md:hidden absolute left-0 top-1.5 bottom-1.5 w-1 bg-industrial-600 rounded-r-full" />
                )}

                <Icon
                  className={`w-5 h-5 shrink-0 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-industrial-600 stroke-[2.5]' : 'text-slate-500'
                  }`}
                />

                {/* Text Label on Desktop */}
                <span className="hidden md:inline truncate">
                  {language === 'hi' ? item.labelHi : item.labelEn}
                </span>

                {/* Floating Tooltip on Mobile */}
                <span className="md:hidden absolute left-full ml-2 whitespace-nowrap bg-slate-900 text-white text-[11px] font-bold py-1 px-2.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 shadow-md">
                  {language === 'hi' ? item.labelHi : item.labelEn}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile, Language Switcher & Logout */}
      <div className="p-2 sm:p-2.5 md:p-3 border-t border-slate-100 space-y-1.5 bg-[#fdfbf9]">
        {/* User Card on Desktop */}
        <div className="hidden md:flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white border border-slate-200/70 shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-industrial-100 text-industrial-700 font-extrabold flex items-center justify-center text-xs shrink-0">
            {user?.name ? user.name.charAt(0).toUpperCase() : isCompany ? 'C' : 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <span className="block text-xs font-extrabold text-slate-900 truncate">
              {user?.name || (isCompany ? 'Company User' : 'Admin User')}
            </span>
            <span className="block text-[10px] text-slate-500 uppercase tracking-wider font-semibold truncate">
              {user?.role || role}
            </span>
          </div>
        </div>

        {/* Language Switcher */}
        <button
          onClick={() => setLanguage(language === 'hi' ? 'en' : 'hi')}
          title="Switch Language"
          className="group relative w-full flex items-center justify-center md:justify-between py-2.5 px-2 md:px-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/70 text-slate-700 text-xs font-extrabold transition-colors cursor-pointer"
        >
          {/* Mobile: Globe Icon + Short Badge */}
          <div className="flex md:hidden items-center justify-center">
            <Globe className="w-4 h-4 text-industrial-600 stroke-[2.2]" />
          </div>

          {/* Desktop: Full Labels */}
          <span className="hidden md:inline text-[11px] text-slate-500 uppercase font-bold">
            {language === 'hi' ? 'भाषा' : 'Language'}
          </span>
          <span className="hidden md:inline text-industrial-600 font-extrabold">
            {language === 'hi' ? 'हिन्दी' : 'English'}
          </span>

          {/* Mobile Tooltip */}
          <span className="md:hidden absolute left-full ml-2 whitespace-nowrap bg-slate-900 text-white text-[11px] font-bold py-1 px-2.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 shadow-md">
            {language === 'hi' ? 'English में देखें' : 'हिन्दी में देखें'}
          </span>
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          title="Logout"
          className="group relative w-full flex items-center justify-center md:justify-start gap-2.5 py-2.5 px-2 md:px-3 rounded-xl text-rose-600 hover:bg-rose-50 text-xs font-bold transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
          <span className="hidden md:inline">
            {language === 'hi' ? 'लॉगआउट करें' : 'Sign Out'}
          </span>

          {/* Mobile Tooltip */}
          <span className="md:hidden absolute left-full ml-2 whitespace-nowrap bg-rose-950 text-white text-[11px] font-bold py-1 px-2.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 shadow-md">
            {language === 'hi' ? 'लॉगआउट करें' : 'Sign Out'}
          </span>
        </button>
      </div>
    </aside>
  );
};
