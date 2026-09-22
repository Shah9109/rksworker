import React, { useState } from 'react';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { MobileBottomNav } from '../../components/layout/MobileBottomNav';
import { useUIStore } from '../../store/uiStore';
import { Link } from 'react-router-dom';
import {
  Wrench,
  Search,
  CheckCircle2,
  Users,
  ArrowRight,
  ShieldCheck,
  Flame,
  Zap,
  HardHat,
  Cpu,
  Layers,
  Award,
} from 'lucide-react';

interface Trade {
  id: string;
  nameHi: string;
  nameEn: string;
  category: string;
  categoryHi: string;
  availableCount: string;
  avgWage: string;
  certifications: string[];
  descriptionHi: string;
  descriptionEn: string;
}

const allTrades: Trade[] = [
  {
    id: 't-1',
    nameHi: '6G / 3G वेल्डर (Welder)',
    nameEn: '6G / 3G / TIG Welder',
    category: 'Welding',
    categoryHi: 'वेल्डिंग एवं कटिंग',
    availableCount: '4,500+ Available',
    avgWage: '₹22,000 – ₹35,000 / mo',
    certifications: ['IBR Certified', 'ASME Section IX', 'X-Ray Clear 98%'],
    descriptionHi: 'हाई-प्रेशर बॉयलर्स, पाइपलाइन्स और हेवी स्ट्रक्चरल फैब्रिकेशन के विशेषज्ञ।',
    descriptionEn: 'High-pressure boiler, alloy piping, and cryogenic structure specialists.',
  },
  {
    id: 't-2',
    nameHi: 'स्ट्रक्चरल एवं पाइप फ़िटर (Fitter)',
    nameEn: 'Structural & Pipe Fitter',
    category: 'Fitting',
    categoryHi: 'फ़िटिंग एवं अलाइनमेंट',
    availableCount: '5,200+ Available',
    avgWage: '₹18,000 – ₹28,000 / mo',
    certifications: ['Isometric Drawing Expert', 'Hydro-Test Certified'],
    descriptionHi: 'ब्लूप्रिंट और आइसोमेट्रिक ड्राइंग के अनुसार सटीक पाइपलाइन और गर्डर फ़िटिंग।',
    descriptionEn: 'Precision isometric spool assembly, flange alignment, and hydro-testing.',
  },
  {
    id: 't-3',
    nameHi: 'हेवी रिगर (Heavy Rigger)',
    nameEn: 'Heavy Industrial Rigger',
    category: 'Rigging',
    categoryHi: 'रिगिंग एवं इरेक्शन',
    availableCount: '3,900+ Available',
    avgWage: '₹18,000 – ₹26,000 / mo',
    certifications: ['Load Chart Calculation', 'Sling & D-Shackle Certified'],
    descriptionHi: '100+ टन हेवी इक्विपमेंट, कॉलम और टरबाइन की सुरक्षित लिफ्टिंग और इरेक्शन।',
    descriptionEn: 'Safe rigging, tandem lifts, crane signaling, and heavy equipment alignment.',
  },
  {
    id: 't-4',
    nameHi: 'इंडस्ट्रियल इलेक्ट्रिशियन (Electrician)',
    nameEn: 'Industrial Electrician',
    category: 'Electrical',
    categoryHi: 'इलेक्ट्रिकल एवं पावर',
    availableCount: '4,100+ Available',
    avgWage: '₹20,000 – ₹32,000 / mo',
    certifications: ['Supervisory License B/C', 'HT/LT Switchgear Certified'],
    descriptionHi: 'मोटर कंट्रोल सेंटर (MCC), सबस्टेशन, ट्रांसफॉर्मर और केबल ट्रे टर्मिनेशन।',
    descriptionEn: 'MCC panels, VFD drives, high-tension termination, and PLC wiring.',
  },
  {
    id: 't-5',
    nameHi: 'गैस कटर (Gas Cutter)',
    nameEn: 'Precision Gas & Plasma Cutter',
    category: 'Welding',
    categoryHi: 'वेल्डिंग एवं कटिंग',
    availableCount: '2,800+ Available',
    avgWage: '₹16,000 – ₹24,000 / mo',
    certifications: ['Flashback Arrestor Trained', 'Beveling Expert'],
    descriptionHi: 'ऑक्सी-एसिटिलीन और सीएनसी प्लाज्मा से सटीक प्लेट एवं पाइप कटिंग और बेवेलिंग।',
    descriptionEn: 'Oxy-fuel, pug machine, and CNC plasma beveling for structural joints.',
  },
  {
    id: 't-6',
    nameHi: 'सर्टिफाइड स्केफोल्डर (Scaffolder)',
    nameEn: 'Certified Cuplock Scaffolder',
    category: 'Civil',
    categoryHi: 'सिविल एवं इंफ्रा',
    availableCount: '3,000+ Available',
    avgWage: '₹16,000 – ₹24,000 / mo',
    certifications: ['Working At Height (WAH)', 'Green Tag Erection Certified'],
    descriptionHi: 'किल्न, चिमनी और ऊंचे स्ट्रक्चर्स पर कप-लॉक एवं ट्यूबलर पाड़ निर्माण।',
    descriptionEn: 'Cuplock, heavy suspended scaffolding, and high-altitude chimney staging.',
  },
  {
    id: 't-7',
    nameHi: 'क्रेन ऑपरेटर (Crane Operator)',
    nameEn: 'Hydra & Heavy Crane Operator',
    category: 'Machinery',
    categoryHi: 'भारी मशीनरी ऑपरेटर',
    availableCount: '1,100+ Available',
    avgWage: '₹26,000 – ₹42,000 / mo',
    certifications: ['Heavy Commercial DL', 'Third-Party Competency Card'],
    descriptionHi: 'हाइड्रा, क्रॉलर, और ईओटी क्रेन से शून्य दुर्घटना रिकॉर्ड के साथ संचालन।',
    descriptionEn: 'Crawler cranes, Hydra pick-n-carry, and cabin EOT crane operations.',
  },
  {
    id: 't-8',
    nameHi: 'सेफ़्टी ऑफिसर (Safety Officer)',
    nameEn: 'EHS Site Safety Officer',
    category: 'Safety',
    categoryHi: 'सुरक्षा एवं सुपरविजन',
    availableCount: '950+ Available',
    avgWage: '₹30,000 – ₹55,000 / mo',
    certifications: ['NEBOSH / IOSH Qualified', 'First Aid Certified'],
    descriptionHi: 'वर्क परमिट (PTW), टूलबॉक्स टॉक (TBT) और शून्य क्षति पर्यावरण प्रबंधन।',
    descriptionEn: 'Daily TBT, work permits, hazard identification, and OSHA audits.',
  },
  {
    id: 't-9',
    nameHi: 'फोरमैन एवं सुपरवाइजर (Supervisor)',
    nameEn: 'Mechanical Site Supervisor',
    category: 'Safety',
    categoryHi: 'सुरक्षा एवं सुपरविजन',
    availableCount: '1,400+ Available',
    avgWage: '₹35,000 – ₹60,000 / mo',
    certifications: ['Diploma Mechanical', 'Project Execution Track Record'],
    descriptionHi: 'साइट प्लानिंग, मैनपावर प्रबंधन, दैनिक प्रगति रिपोर्ट (DPR) और गुणवत्ता नियंत्रण।',
    descriptionEn: 'DPR management, daily job allocation, productivity, and client coordination.',
  },
];

const categories = [
  { id: 'all', labelHi: 'सभी ट्रेड्स (All)', labelEn: 'All Trades' },
  { id: 'Welding', labelHi: 'वेल्डिंग एवं कटिंग', labelEn: 'Welding & Cutting' },
  { id: 'Fitting', labelHi: 'फ़िटिंग एवं अलाइनमेंट', labelEn: 'Fitting' },
  { id: 'Rigging', labelHi: 'रिगिंग एवं इरेक्शन', labelEn: 'Rigging' },
  { id: 'Electrical', labelHi: 'इलेक्ट्रिकल एवं पावर', labelEn: 'Electrical' },
  { id: 'Machinery', labelHi: 'भारी मशीनरी ऑपरेटर', labelEn: 'Machinery' },
  { id: 'Safety', labelHi: 'सुरक्षा एवं सुपरविजन', labelEn: 'Safety & Supervision' },
];

export const ServicesPage: React.FC = () => {
  const { language } = useUIStore();
  const [selectedCat, setSelectedCat] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = allTrades.filter((t) => {
    const matchesCat = selectedCat === 'all' || t.category === selectedCat;
    const matchesQuery =
      t.nameEn.toLowerCase().includes(search.toLowerCase()) ||
      t.nameHi.includes(search) ||
      t.certifications.some((c) => c.toLowerCase().includes(search.toLowerCase()));
    return matchesCat && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-[#faf7f4] text-slate-900 flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#fbf9f6] to-[#faf7f4] pt-12 pb-14 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full clay-badge text-industrial-600 text-xs font-extrabold mb-4">
            <Layers className="w-4 h-4 text-industrial-600" />
            <span>{language === 'hi' ? '20+ प्रमाणित कारीगर श्रेणियां' : '20+ Certified Skill Trades'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 max-w-3xl mx-auto leading-tight">
            {language === 'hi' ? (
              <>
                औद्योगिक मैनपावर <span className="text-industrial-600">सेवाएं एवं ट्रेड्स</span>
              </>
            ) : (
              <>
                Industrial Manpower <span className="text-industrial-600">Services & Trades</span>
              </>
            )}
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto font-medium">
            {language === 'hi'
              ? 'अनुभवी, आधार-सत्यापित और टेस्टेड कारीगर तुरंत उपलब्ध। पारदर्शी वेज चार्ट और सीधी तैनाती।'
              : 'Direct deployment of tested 6G welders, riggers, fitters, and electricians across India with verified skill compliance.'}
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-industrial-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={
                language === 'hi'
                  ? 'ट्रेड या स्किल खोजें (उदा. Welder, Fitter, Crane)...'
                  : 'Search trade or certification (e.g. Welder, Fitter, IBR)...'
              }
              className="w-full pl-12 pr-4 py-3.5 clay-input text-slate-900 placeholder-slate-400 font-bold text-sm outline-none"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="mt-6 flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCat(c.id)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                  selectedCat === c.id
                    ? 'clay-btn-primary shadow-md'
                    : 'clay-btn-secondary text-slate-600'
                }`}
              >
                {language === 'hi' ? c.labelHi : c.labelEn}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Trades Grid */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((t) => (
            <div
              key={t.id}
              className="clay-card p-6 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-200 border border-slate-200/90 group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-industrial-600">
                      {language === 'hi' ? t.categoryHi : t.category}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-industrial-600 transition-colors mt-0.5">
                      {language === 'hi' ? t.nameHi : t.nameEn}
                    </h3>
                  </div>
                  <span className="px-3 py-1 text-xs font-extrabold rounded-full bg-industrial-50 text-industrial-600 border border-industrial-200/80 shrink-0">
                    {t.availableCount}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-medium mb-4">
                  {language === 'hi' ? t.descriptionHi : t.descriptionEn}
                </p>

                {/* Benchmark Rate & Certifications */}
                <div className="p-3 bg-[#faf7f4] rounded-2xl border border-slate-200/80 space-y-2 mb-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-bold">{language === 'hi' ? 'मानक वेतन' : 'Wage Benchmark'}</span>
                    <span className="font-extrabold text-industrial-700">{t.avgWage}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 pt-1 border-t border-slate-200/60">
                    {t.certifications.map((cert, cIdx) => (
                      <span
                        key={cIdx}
                        className="px-2 py-0.5 text-[10px] font-bold bg-white text-slate-700 rounded-md border border-slate-200 flex items-center gap-1"
                      >
                        <ShieldCheck className="w-3 h-3 text-industrial-600" />
                        <span>{cert}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <Link
                  to="/company/jobs/new"
                  className="flex-1 text-center py-2.5 px-4 rounded-xl clay-btn-primary text-xs font-extrabold shadow-md flex items-center justify-center gap-1.5"
                >
                  <span>{language === 'hi' ? 'हायर करें' : 'Hire Workers'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  to="/worker/jobs"
                  className="py-2.5 px-3 rounded-xl clay-btn-secondary text-xs font-extrabold text-slate-700 hover:text-industrial-600 transition-colors"
                >
                  {language === 'hi' ? 'जॉब्स देखें' : 'View Jobs'}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};
