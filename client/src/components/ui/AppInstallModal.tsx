import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowDown, X, Share, PlusSquare, CheckCircle2 } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';

export const AppInstallModal: React.FC = () => {
  const location = useLocation();
  const { language } = useUIStore();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [showIOSGuide, setShowIOSGuide] = useState<boolean>(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  const isPortal =
    location.pathname.startsWith('/company') ||
    location.pathname.startsWith('/admin');

  useEffect(() => {
    // 1. Check if already installed / running in standalone PWA mode
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;

    if (isStandalone) {
      return;
    }

    // 2. Check localStorage if user already downloaded or installed
    const hasInstalled = localStorage.getItem('workpower_app_installed');
    if (hasInstalled === 'true') {
      return;
    }

    // Check if dismissed in this session
    const isDismissed = sessionStorage.getItem('workpower_install_card_dismissed');
    if (isDismissed === 'true') {
      return;
    }

    // 3. Capture PWA beforeinstallprompt if available
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // 4. Reveal bottom-left pill card smoothly after 1.5s
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleClick = async () => {
    const isIOSDevice =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

    if (isIOSDevice) {
      setShowIOSGuide(true);
      return;
    }

    // Trigger PWA install if available
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        setDeferredPrompt(null);
      } catch (err) {
        console.log('PWA prompt skipped:', err);
      }
    }

    // Direct download trigger for APK
    const link = document.createElement('a');
    link.href = '/workpower-app.apk';
    link.download = 'WorkPower-v1.0.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Mark as installed so it never appears again
    localStorage.setItem('workpower_app_installed', 'true');
    setIsVisible(false);
  };

  const handleIOSDone = (e: React.MouseEvent) => {
    e.stopPropagation();
    localStorage.setItem('workpower_app_installed', 'true');
    setIsVisible(false);
    setShowIOSGuide(false);
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    sessionStorage.setItem('workpower_install_card_dismissed', 'true');
    setIsVisible(false);
    setShowIOSGuide(false);
  };

  if (!isVisible || isPortal) return null;

  return (
    <aside
      aria-label="Download WorkPower App"
      className="fixed bottom-20 left-3 sm:bottom-5 sm:left-5 z-40 select-none pointer-events-auto animate-in slide-in-from-bottom-3 fade-in duration-200"
    >
      {/* Optional iOS Safari Guide Popover */}
      {showIOSGuide && (
        <div className="mb-2 w-64 bg-white rounded-2xl p-3 shadow-xl border border-emerald-200 text-xs text-slate-700 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-extrabold text-slate-900 text-[11px]">
              {language === 'hi' ? 'iPhone पर इंस्टॉल करें' : 'Install on iPhone'}
            </span>
            <button
              onClick={() => setShowIOSGuide(false)}
              className="text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-1 mb-2 text-[10px]">
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-[9px]">
                1
              </span>
              <span>
                {language === 'hi' ? 'सफारी में Share (शेयर) दबाएं' : 'Tap Share in Safari'}
              </span>
              <Share className="w-3 h-3 text-sky-600 ml-auto" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-[9px]">
                2
              </span>
              <span>
                {language === 'hi' ? '"Add to Home Screen" चुनें' : 'Tap "Add to Home Screen"'}
              </span>
              <PlusSquare className="w-3 h-3 text-emerald-600 ml-auto" />
            </div>
          </div>
          <button
            onClick={handleIOSDone}
            className="w-full py-1 px-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-[10px] flex items-center justify-center gap-1 transition-colors cursor-pointer"
          >
            <CheckCircle2 className="w-3 h-3" />
            <span>{language === 'hi' ? 'हो गया (Done)' : 'Done'}</span>
          </button>
        </div>
      )}

      {/* Main Compact Capsule Pill matching user reference mockup */}
      <div
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleClick()}
        className="relative group bg-white hover:bg-slate-50 border-[1.5px] border-emerald-300 rounded-full py-1.5 px-3 sm:py-1.5 sm:px-3.5 flex items-center gap-2.5 shadow-[0_4px_14px_rgba(16,185,129,0.14)] transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
      >
        {/* Dismiss 'x' button */}
        <button
          onClick={handleDismiss}
          aria-label="Close"
          className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center shadow-xs text-[9px] opacity-75 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity cursor-pointer z-10"
        >
          <X className="w-2.5 h-2.5" />
        </button>

        {/* Left App Icon with Green Halo Dot */}
        <div className="relative w-8 h-8 sm:w-9 sm:h-9 shrink-0">
          <div className="w-full h-full rounded-xl overflow-hidden bg-slate-900 shadow-xs border border-slate-100">
            <img
              src="/workpower-logo.png"
              alt="WorkPower App"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>

          {/* Green Status / Notification Halo Dot */}
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 ring-2 ring-emerald-100" />
          </span>
        </div>

        {/* Right Typography & Download Arrow */}
        <div className="pr-1 sm:pr-2 text-left">
          <div className="flex items-center gap-1 text-slate-900 font-extrabold text-xs sm:text-sm tracking-tight leading-none">
            <span>Get App</span>
            <ArrowDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600 stroke-[2.5]" />
          </div>
          <div className="text-[10px] sm:text-[11px] text-slate-500 font-semibold tracking-normal mt-0.5 leading-none">
            Direct APK / PC
          </div>
        </div>
      </div>
    </aside>
  );
};

export const AppInstallCard = AppInstallModal;
