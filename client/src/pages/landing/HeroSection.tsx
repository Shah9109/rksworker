import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Zap, ShieldCheck, HardHat, Building2, Users } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import { Button } from '../../components/ui/Button';

export const HeroSection: React.FC = () => {
  const { language } = useUIStore();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'workers' | 'jobs'>('workers');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchType === 'workers') {
      navigate(`/company/workers?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate(`/worker/jobs?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#ffffff] via-[#fbf9f6] to-[#f8f6f2] pt-16 pb-24 border-b border-slate-200/60">
      {/* Warm Ambient Lights */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-amber-300/20 rounded-full blur-3xl -z-10"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Clay Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full clay-badge text-industrial-700 text-xs sm:text-sm font-extrabold mb-6">
          <Zap className="w-4 h-4 text-industrial-600 animate-bounce" />
          <span>{language === 'hi' ? 'भारत का भरोसेमंद औद्योगिक नेटवर्क' : 'India’s Most Trusted Industrial Network'}</span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.15]">
          {language === 'hi' ? (
            <>
              भारी उद्योगों के लिए <span className="text-transparent bg-clip-text bg-gradient-to-r from-industrial-600 via-industrial-500 to-amber-500">कुशल एवं प्रमाणित</span> मैनपावर
            </>
          ) : (
            <>
              Certified Skilled Manpower for <span className="text-transparent bg-clip-text bg-gradient-to-r from-industrial-600 via-industrial-500 to-amber-500">Heavy Industries</span>
            </>
          )}
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
          {language === 'hi'
            ? 'पावर प्लांट, स्टील प्लांट, सीमेंट, रिफाइनरी, कोल माइन और भारी मैकेनिकल कंस्ट्रक्शन के लिए 6G वेल्डर, फ़िटर, रिगर और इलेक्ट्रिशियन तुरंत पाएं।'
            : 'Instantly source 6G Welders, Fitters, Riggers, and Electricians for Power, Steel, Cement, Coal Mines, and Refinery Projects.'}
        </p>

        {/* Tactile Clay Search Container */}
        <div className="mt-10 max-w-3xl mx-auto clay-card p-4 sm:p-5">
          <div className="flex justify-center gap-3 mb-4">
            <button
              onClick={() => setSearchType('workers')}
              className={`px-5 py-2 text-xs sm:text-sm font-extrabold rounded-2xl transition-all ${
                searchType === 'workers'
                  ? 'clay-btn-primary'
                  : 'clay-btn-secondary'
              }`}
            >
              {language === 'hi' ? '🔍 वर्कर / कारीगर खोजें' : '🔍 Find Workers'}
            </button>
            <button
              onClick={() => setSearchType('jobs')}
              className={`px-5 py-2 text-xs sm:text-sm font-extrabold rounded-2xl transition-all ${
                searchType === 'jobs'
                  ? 'clay-btn-primary'
                  : 'clay-btn-secondary'
              }`}
            >
              {language === 'hi' ? '💼 नौकरियां खोजें' : '💼 Find Jobs'}
            </button>
          </div>

          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-industrial-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  searchType === 'workers'
                    ? language === 'hi'
                      ? 'ट्रेड दर्ज करें (उदा. Welder, Fitter, Rigger)...'
                      : 'Enter skill (e.g. Welder, Fitter, Rigger)...'
                    : language === 'hi'
                    ? 'नौकरी पद या शहर दर्ज करें...'
                    : 'Enter job title or city...'
                }
                className="w-full pl-12 pr-4 py-3.5 clay-input text-slate-900 placeholder-slate-400 font-bold text-sm outline-none"
              />
            </div>
            <Button type="submit" size="lg" className="w-full sm:w-auto font-extrabold px-8">
              {language === 'hi' ? 'खोजें' : 'Search'}
            </Button>
          </form>
        </div>

        {/* Tactile Clay Stats Cards */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="clay-card p-5 group hover:border-industrial-200 transition-all">
            <div className="w-10 h-10 rounded-2xl bg-industrial-50 text-industrial-600 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform shadow-sm">
              <Users className="w-5 h-5" />
            </div>
            <span className="block text-2xl sm:text-3xl font-extrabold text-industrial-600">50,000+</span>
            <span className="text-xs sm:text-sm text-slate-600 font-bold mt-1 block">
              {language === 'hi' ? 'प्रमाणित कारीगर' : 'Certified Workers'}
            </span>
          </div>
          <div className="clay-card p-5 group hover:border-industrial-200 transition-all">
            <div className="w-10 h-10 rounded-2xl bg-industrial-50 text-industrial-600 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform shadow-sm">
              <Building2 className="w-5 h-5" />
            </div>
            <span className="block text-2xl sm:text-3xl font-extrabold text-industrial-600">1,200+</span>
            <span className="text-xs sm:text-sm text-slate-600 font-bold mt-1 block">
              {language === 'hi' ? 'औद्योगिक कंपनियां' : 'Industrial Companies'}
            </span>
          </div>
          <div className="col-span-2 md:col-span-1 clay-card p-5 group hover:border-industrial-200 transition-all">
            <div className="w-10 h-10 rounded-2xl bg-industrial-50 text-industrial-600 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="block text-2xl sm:text-3xl font-extrabold text-industrial-600">100%</span>
            <span className="text-xs sm:text-sm text-slate-600 font-bold mt-1 block">
              {language === 'hi' ? 'आधार एवं डॉक्युमेंट वेरीफाइड' : 'Aadhaar Verified'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
