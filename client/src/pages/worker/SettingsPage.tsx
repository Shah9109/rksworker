import React from 'react';
import { Settings, Globe, Moon, ShieldCheck, HelpCircle, PhoneCall } from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { useUIStore } from '../../store/uiStore';

export const SettingsPage: React.FC = () => {
  const { language, setLanguage, darkMode, toggleDarkMode } = useUIStore();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {language === 'hi' ? 'सेटिंग्स एवं सहायता (Settings & Support)' : 'Settings & Support'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {language === 'hi'
              ? 'इंटरफेस भाषा, प्राइवेसी एवं सहायता नंबर'
              : 'Preferences, language selection, and toll-free helpline'}
          </p>
        </div>

        <div className="space-y-4">
          <Card className="p-6 space-y-4">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Globe className="w-5 h-5 text-industrial-600" />
              <span>{language === 'hi' ? 'भाषा (Language Preference)' : 'Language Preference'}</span>
            </h3>

            <div className="flex gap-3">
              <button
                onClick={() => setLanguage('hi')}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold border transition-all ${
                  language === 'hi'
                    ? 'bg-industrial-600 text-white border-industrial-600 shadow-md'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                हिंदी (Hindi)
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold border transition-all ${
                  language === 'en'
                    ? 'bg-industrial-600 text-white border-industrial-600 shadow-md'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                English
              </button>
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <PhoneCall className="w-5 h-5 text-industrial-600" />
              <span>{language === 'hi' ? '24/7 सहायता हेल्पलाइन' : 'Toll Free Support Helpline'}</span>
            </h3>
            <p className="text-sm text-gray-600">
              {language === 'hi'
                ? 'यदि आपको नौकरी या दस्तावेज सत्यापन में कोई समस्या आती है, तो हमारे टोल-फ्री नंबर पर कॉल करें:'
                : 'For any issues regarding documents verification or job application, call our support line:'}
            </p>
            <div className="p-4 bg-industrial-50 border border-industrial-200 rounded-2xl inline-block font-extrabold text-industrial-700 text-lg">
              📞 1800-123-WORK (1800-123-9675)
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};
