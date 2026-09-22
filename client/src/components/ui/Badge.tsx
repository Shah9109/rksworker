import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'blue' | 'green' | 'yellow' | 'red' | 'gray' | 'theme';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'theme',
  size = 'md',
  className = '',
}) => {
  const variants = {
    theme: 'text-industrial-600 font-extrabold bg-industrial-50/80 border border-industrial-200/80',
    blue: 'text-industrial-600 font-extrabold bg-industrial-50/80 border border-industrial-200/80',
    green: 'text-emerald-700 font-bold',
    yellow: 'text-amber-700 font-bold',
    red: 'text-rose-700 font-bold',
    gray: 'text-slate-700 font-bold',
  };

  const sizes = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3.5 py-1 text-xs tracking-wide',
  };

  return (
    <span className={`inline-flex items-center clay-badge ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
};
