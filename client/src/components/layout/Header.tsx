import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  HardHat,
  Home,
  Briefcase,
  Globe,
  User,
  LayoutDashboard,
  Search,
  CheckCircle,
  LogOut,
  Rss,
  Layers,
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useUIStore } from '../../store/uiStore';
import { Button } from '../ui/Button';
import { Logo } from '../ui/Logo';
import { MobileBottomNav } from './MobileBottomNav';

export const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const { language, setLanguage } = useUIStore();
  const navigate = useNavigate();
  const location = useLocation();

  const isWorker = isAuthenticated && user?.role === 'worker';
  const isCompany = isAuthenticated && user?.role === 'company';
  const isAdmin = isAuthenticated && user?.role === 'admin';

  const toggleLanguage = () => {
    setLanguage(language === 'hi' ? 'en' : 'hi');
  };

  const getDashboardPath = () => {
    if (!user) return '/login';
    if (user.role === 'admin') return '/admin/dashboard';
    if (user.role === 'company') return '/company/dashboard';
    return '/worker/dashboard';
  };

  return (
    <>
      {/* FIXED TOP NAVIGATION BAR WRAPPER (Pinned to Top across Mobile & Web Views) */}
      <div className="fixed top-0 left-0 right-0 z-50 w-full bg-white/98 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        {/* Top micro-banner: Visible on desktop (sm: and up), hidden on mobile to keep mobile header compact */}
        <div className="hidden sm:flex bg-[#fdfbf9] border-b border-slate-200/60 py-1.5 px-4 text-xs font-bold text-slate-600 items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-industrial-500 animate-pulse"></span>
            <span>{language === 'hi' ? 'सत्यापित एवं प्रमाणित मैनपावर' : 'Certified & Verified Industrial Manpower'}</span>
            <span className="text-industrial-600 font-extrabold">{language === 'hi' ? '• 24/7 तत्काल सहायता' : '• 24/7 Instant Support'}</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-bold text-slate-500">
            <span>{language === 'hi' ? 'हेल्पलाइन: +91 98765 43210' : 'Helpline: +91 98765 43210'}</span>
            <span className="hidden md:inline text-industrial-600 font-extrabold">{language === 'hi' ? 'विशेष: 0% कमीशन' : 'SPECIAL: 0% PLATFORM FEE'}</span>
            <a
              href="https://www.catcatchcodes.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1 text-slate-500 hover:text-industrial-600 transition-colors"
            >
              <span>Dev by</span>
              <span className="text-industrial-600 font-extrabold">CatCatchCode</span>
            </a>
          </div>
        </div>

        {/* MAIN TOP NAVIGATION APPBAR */}
        <header className="w-full">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14 sm:h-16">
              {/* Brand Logo (Top Left) */}
              <Link to="/" className="flex items-center shrink-0">
                <Logo size="md" />
              </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-7 text-sm font-extrabold text-slate-700">
              <Link
                to="/"
                className={`transition-colors ${
                  location.pathname === '/' ? 'text-industrial-600 font-black' : 'hover:text-industrial-600'
                }`}
              >
                {language === 'hi' ? 'होम' : 'Home'}
              </Link>
              <Link
                to="/industries"
                className={`transition-colors ${
                  location.pathname === '/industries' ? 'text-industrial-600 font-black' : 'hover:text-industrial-600'
                }`}
              >
                {language === 'hi' ? 'उद्योग' : 'Industries'}
              </Link>
              <Link
                to="/services"
                className={`transition-colors ${
                  location.pathname === '/services' ? 'text-industrial-600 font-black' : 'hover:text-industrial-600'
                }`}
              >
                {language === 'hi' ? 'सेवाएं' : 'Services'}
              </Link>
              <Link
                to="/jobs"
                className={`transition-colors ${
                  location.pathname === '/jobs' || location.pathname.startsWith('/worker/jobs')
                    ? 'text-industrial-600 font-black'
                    : 'hover:text-industrial-600'
                }`}
              >
                {language === 'hi' ? 'नौकरियां' : 'Jobs'}
              </Link>
              <Link
                to="/feed"
                className={`transition-colors ${
                  location.pathname === '/feed' ? 'text-industrial-600 font-black' : 'hover:text-industrial-600'
                }`}
              >
                {language === 'hi' ? 'फीड' : 'Feed'}
              </Link>
            </nav>

            {/* TOP RIGHT AREA: Profile & Language Switcher */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Language Switcher Button */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1 px-2 py-1 sm:px-2.5 sm:py-1.5 text-[11px] sm:text-xs font-extrabold rounded-xl clay-badge text-industrial-700 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                title="Switch Language"
              >
                <Globe className="w-3.5 h-3.5 text-industrial-600" />
                <span>{language === 'hi' ? 'EN' : 'हिंदी'}</span>
              </button>

              {/* Profile / Auth Buttons */}
              {isAuthenticated ? (
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <button
                    onClick={() => navigate(getDashboardPath())}
                    className="flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl clay-btn-primary text-xs font-extrabold shadow-xs hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span className="max-w-[70px] sm:max-w-none truncate">
                      {user?.name ? user.name.split(' ')[0] : 'Profile'}
                    </span>
                  </button>

                  <button
                    onClick={logout}
                    className="p-1 sm:p-1.5 text-slate-500 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => navigate('/login')}
                    className="text-xs px-2 sm:px-2.5 py-1 rounded-xl text-slate-700 hover:text-industrial-600 hover:bg-industrial-50 font-extrabold transition-colors cursor-pointer"
                  >
                    {language === 'hi' ? 'लॉगिन' : 'Login'}
                  </button>
                  <button
                    onClick={() => navigate('/register')}
                    className="text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl clay-btn-primary font-black shadow-xs hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                  >
                    {language === 'hi' ? 'रजिस्टर' : 'Register'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      </div>

      {/* Layout Spacer to preserve document flow and prevent content from hiding underneath the fixed header */}
      <div className="h-14 sm:h-[95px] w-full shrink-0 pointer-events-none" aria-hidden="true" />

      {/* FIXED MOBILE BOTTOM NAVIGATION BAR (Desktop Header Navigation Links come to Bottom in Mobile View) */}
      <MobileBottomNav />
    </>
  );
};
