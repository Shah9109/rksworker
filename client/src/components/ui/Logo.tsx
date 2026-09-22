import React from 'react';
import { useUIStore } from '../../store/uiStore';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  variant?: 'light' | 'dark';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showText = true,
  variant = 'light',
  className = '',
}) => {
  const { language } = useUIStore();

  const iconSizes = {
    sm: 'w-8 h-8 rounded-xl',
    md: 'w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl',
    lg: 'w-12 h-12 rounded-2xl',
    xl: 'w-16 h-16 rounded-3xl',
  };

  const titleSizes = {
    sm: 'text-base',
    md: 'text-base sm:text-xl',
    lg: 'text-xl sm:text-2xl',
    xl: 'text-3xl sm:text-4xl',
  };

  const subtitleSizes = {
    sm: 'text-[8px]',
    md: 'text-[8px] sm:text-[10px]',
    lg: 'text-[10px] sm:text-xs',
    xl: 'text-xs sm:text-sm',
  };

  const isDark = variant === 'dark';

  return (
    <div className={`flex items-center gap-2 sm:gap-2.5 select-none ${className}`}>
      {/* App Icon Image */}
      <div
        className={`${iconSizes[size]} relative overflow-hidden shrink-0 shadow-[0_4px_14px_rgba(240,134,101,0.35)] transition-transform duration-200 hover:scale-105`}
      >
        <img
          src="/workpower-logo.png"
          alt="WorkPower App Logo"
          className="w-full h-full object-cover rounded-inherit"
          loading="eager"
        />
      </div>

      {/* Typography */}
      {showText && (
        <div className="leading-tight">
          <span
            className={`${titleSizes[size]} font-extrabold tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            } font-sans`}
          >
            Work
            <span className="text-industrial-600">Power</span>
          </span>
          <span
            className={`block ${subtitleSizes[size]} uppercase tracking-wider font-extrabold text-industrial-600 -mt-0.5`}
          >
            {language === 'hi' ? 'औद्योगिक मैनपावर' : 'Industrial Manpower'}
          </span>
        </div>
      )}
    </div>
  );
};
