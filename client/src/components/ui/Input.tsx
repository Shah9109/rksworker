import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = '', ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && <label className="text-xs font-bold uppercase tracking-wider text-slate-600 ml-1">{label}</label>}
        <div className="relative flex items-center">
          {icon && <div className="absolute left-4 text-industrial-500">{icon}</div>}
          <input
            ref={ref}
            className={`w-full clay-input px-4 py-3 text-sm text-slate-900 placeholder-slate-400 font-medium ${
              error ? 'border-rose-500' : ''
            } ${icon ? 'pl-11' : ''} ${className}`}
            {...props}
          />
        </div>
        {error && <span className="text-xs text-rose-500 font-bold ml-1">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
