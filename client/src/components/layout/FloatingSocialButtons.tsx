import React, { useState } from 'react';
import { Instagram } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';

export const FloatingSocialButtons: React.FC = () => {
  const { language } = useUIStore();
  const [hovered, setHovered] = useState<'whatsapp' | 'instagram' | null>(null);

  const whatsappNumber = '919876543210';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    language === 'hi'
      ? 'नमस्ते वर्कपावर टीम, मुझे औद्योगिक मैनपावर / जॉब के बारे में जानकारी चाहिए।'
      : 'Hello WorkPower Team, I would like to inquire about industrial manpower / jobs.'
  )}`;

  const instagramUrl = 'https://www.instagram.com/workpower_india';

  return (
    <aside
      aria-label="Contact and Social Links"
      className="fixed bottom-[4.5rem] sm:bottom-6 right-3 sm:right-5 z-40 flex flex-col items-end gap-2 sm:gap-2.5 select-none pointer-events-auto"
    >
      {/* Instagram Floating Button */}
      <div className="relative flex items-center group">
        {/* Tooltip */}
        <span
          className={`hidden sm:inline-block absolute right-12 whitespace-nowrap bg-industrial-950/90 text-white text-[11px] font-bold py-1 px-2.5 rounded-xl shadow-md border border-industrial-800/80 backdrop-blur-sm transition-all duration-200 pointer-events-none ${
            hovered === 'instagram'
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 translate-x-1.5'
          }`}
        >
          {language === 'hi' ? 'इंस्टाग्राम' : 'Instagram'}
        </span>

        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow WorkPower on Instagram"
          onMouseEnter={() => setHovered('instagram')}
          onMouseLeave={() => setHovered(null)}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-industrial-600 via-industrial-500 to-amber-500 text-white flex items-center justify-center shadow-[0_3px_12px_rgba(240,134,101,0.35)] border border-white/30 transition-all duration-200 hover:scale-108 active:scale-95 hover:shadow-[0_5px_16px_rgba(240,134,101,0.5)] cursor-pointer"
        >
          <Instagram className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[2.2]" />
        </a>
      </div>

      {/* WhatsApp Floating Button */}
      <div className="relative flex items-center group">
        {/* Tooltip */}
        <span
          className={`hidden sm:inline-block absolute right-12 whitespace-nowrap bg-industrial-950/90 text-white text-[11px] font-bold py-1 px-2.5 rounded-xl shadow-md border border-industrial-800/80 backdrop-blur-sm transition-all duration-200 pointer-events-none ${
            hovered === 'whatsapp'
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 translate-x-1.5'
          }`}
        >
          {language === 'hi' ? 'व्हाट्सएप 24/7' : 'WhatsApp 24/7'}
        </span>

        {/* Live Active Status Pip */}
        <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-white pointer-events-none z-10" />

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with WorkPower on WhatsApp"
          onMouseEnter={() => setHovered('whatsapp')}
          onMouseLeave={() => setHovered(null)}
          className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-industrial-600 via-industrial-500 to-amber-500 text-white flex items-center justify-center shadow-[0_3px_12px_rgba(240,134,101,0.35)] border border-white/30 transition-all duration-200 hover:scale-108 active:scale-95 hover:shadow-[0_5px_16px_rgba(240,134,101,0.5)] cursor-pointer"
        >
          {/* Authentic WhatsApp Vector Icon */}
          <svg
            className="w-4.5 h-4.5 sm:w-5 sm:h-5 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413Z" />
          </svg>
        </a>
      </div>
    </aside>
  );
};
