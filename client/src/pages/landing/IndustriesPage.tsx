import React, { useState } from 'react';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { MobileBottomNav } from '../../components/layout/MobileBottomNav';
import { useUIStore } from '../../store/uiStore';
import { Link } from 'react-router-dom';
import {
  Factory,
  Flame,
  Building2,
  Pickaxe,
  Droplets,
  Wrench,
  Zap,
  ShieldCheck,
  Users,
  Search,
  ArrowRight,
  CheckCircle2,
  HardHat,
} from 'lucide-react';

interface Industry {
  id: string;
  icon: any;
  nameHi: string;
  nameEn: string;
  taglineHi: string;
  taglineEn: string;
  workerCount: string;
  keyTrades: string[];
  specs: string[];
  bgAccent: string;
}

const detailedIndustries: Industry[] = [
  {
    id: 'power',
    icon: Zap,
    nameHi: 'पावर प्लांट एवं ऊर्जा संयंत्र',
    nameEn: 'Power Plants & Energy Utilities',
    taglineHi: 'थर्मल, हाइड्रो, सोलर और न्यूक्लियर पावर प्रोजेक्ट्स',
    taglineEn: 'Thermal, Hydro, Solar & Nuclear Power Projects',
    workerCount: '12,500+ Workers',
    keyTrades: ['IBR Certified 6G Welders', 'High-Voltage Cable Jointers', 'Switchyard Fitters', 'Boiler Technicians'],
    specs: ['99.4% Compliance Rate', 'Mandatory Safety Induction', 'Shutdown Overhaul Teams'],
    bgAccent: 'border-industrial-300 hover:border-industrial-500',
  },
  {
    id: 'steel',
    icon: Flame,
    nameHi: 'स्टील प्लांट एवं धातु उद्योग',
    nameEn: 'Steel Plants & Metallurgy',
    taglineHi: 'ब्लास्ट फर्नेस, एसएमएस, और रोलिंग मिल्स',
    taglineEn: 'Blast Furnace, SMS, Rolling Mills & Sinter Plants',
    workerCount: '15,000+ Workers',
    keyTrades: ['6G TIG/MIG Welders', 'Structural Heavy Fitters', 'Gas Cutters', 'EOT Crane Operators'],
    specs: ['Hot Zone Certified', 'Emergency Breakdown Crews', 'Heavy Duty Shuttering'],
    bgAccent: 'border-industrial-300 hover:border-industrial-500',
  },
  {
    id: 'cement',
    icon: Factory,
    nameHi: 'सीमेंट संयंत्र एवं खनिज उद्योग',
    nameEn: 'Cement Plants & Mineral Processing',
    taglineHi: 'क्लिंकर किल्न, प्री-हीटर, और क्रशर सिस्टम',
    taglineEn: 'Clinker Kilns, Preheaters, Crushers & Silos',
    workerCount: '8,200+ Workers',
    keyTrades: ['Millwright Fitters', 'Conveyor Belt Technicians', 'Heavy Riggers', 'Refractory Masons'],
    specs: ['Dust & Confined Space Training', 'Preventive Maintenance Teams', 'High Altitude Certified'],
    bgAccent: 'border-industrial-300 hover:border-industrial-500',
  },
  {
    id: 'coal',
    icon: Pickaxe,
    nameHi: 'कोल माइंस एवं उत्खनन',
    nameEn: 'Coal Mines & Mineral Extraction',
    taglineHi: 'ओपनकास्ट माइंस, सीएचपी, और कोल वाशरी',
    taglineEn: 'Opencast Mining, CHPs, Dumper & Dozer Ops',
    workerCount: '6,400+ Workers',
    keyTrades: ['HEMM Heavy Operators', 'Heavy Equipment Mechanics', 'Dumper Drivers', 'Blasting Assistants'],
    specs: ['DGMS Compliant', 'Vocational Training Certified', 'Mine Safety Badge Holders'],
    bgAccent: 'border-industrial-300 hover:border-industrial-500',
  },
  {
    id: 'construction',
    icon: Building2,
    nameHi: 'भारी कंस्ट्रक्शन एवं इन्फ्रास्ट्रक्चर',
    nameEn: 'Heavy Construction & Infrastructure',
    taglineHi: 'हाईवे, मेट्रो, ब्रिज, और औद्योगिक शेड्स',
    taglineEn: 'Highways, Metros, Bridges & Industrial Sheds',
    workerCount: '18,000+ Workers',
    keyTrades: ['Certified Scaffolders', 'Bar Benders', 'Tower Crane Drivers', 'Structural Fabricators'],
    specs: ['Working at Height (WAH) Passed', 'Strict PPE Audits', 'Immediate Large-Batch Mobilization'],
    bgAccent: 'border-industrial-300 hover:border-industrial-500',
  },
  {
    id: 'refinery',
    icon: Droplets,
    nameHi: 'तेल, गैस एवं पेट्रोकेमिकल रिफाइनरी',
    nameEn: 'Oil, Gas & Petrochemical Refineries',
    taglineHi: 'क्रैकिंग यूनिट्स, स्टोरेज फार्म्स, और पाइपलाइन्स',
    taglineEn: 'Hydrocracker, Piping Loops, Storage Tanks',
    workerCount: '9,100+ Workers',
    keyTrades: ['Stainless Steel & Alloy Welders', 'Pipe Fabricators', 'Instrumentation Techs', 'Safety Stewards'],
    specs: ['Hydrocarbon Safety Certified', 'Zero Hot-Work Incidents', 'IBR & ASME Code Verified'],
    bgAccent: 'border-industrial-300 hover:border-industrial-500',
  },
  {
    id: 'mechanical',
    icon: Wrench,
    nameHi: 'मैकेनिकल फैब्रिकेशन एवं भारी वर्कशॉप',
    nameEn: 'Mechanical Fabrication & EPC Workshops',
    taglineHi: 'प्रेशर वेसल, बॉयलर्स, और हेवी स्ट्रक्चरल यार्ड',
    taglineEn: 'Pressure Vessels, Heat Exchangers, Gantry Cranes',
    workerCount: '14,300+ Workers',
    keyTrades: ['Plate Rolling Machine Ops', 'CNC Plasma Cutters', 'Hydro-Test Technicians', 'Lathe Machinists'],
    specs: ['Sub-Millimeter Tolerances', 'Full Traceability Records', 'NDT / X-Ray Clear Rate 98%+'],
    bgAccent: 'border-industrial-300 hover:border-industrial-500',
  },
];

export const IndustriesPage: React.FC = () => {
  const { language } = useUIStore();
  const [search, setSearch] = useState('');

  const filtered = detailedIndustries.filter(
    (i) =>
      i.nameEn.toLowerCase().includes(search.toLowerCase()) ||
      i.nameHi.includes(search) ||
      i.keyTrades.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#faf7f4] text-slate-900 flex flex-col">
      <Header />

      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#fbf9f6] to-[#faf7f4] pt-12 pb-16 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full clay-badge text-industrial-600 text-xs font-extrabold mb-4">
            <Factory className="w-4 h-4 text-industrial-600" />
            <span>{language === 'hi' ? 'विशेषज्ञ औद्योगिक क्षेत्र' : 'Specialized Industrial Sectors'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 max-w-3xl mx-auto leading-tight">
            {language === 'hi' ? (
              <>
                भारत के प्रमुख <span className="text-industrial-600">औद्योगिक सेक्टर्स</span> हेतु प्रमाणित कार्यबल
              </>
            ) : (
              <>
                Certified Workforce for India’s <span className="text-industrial-600">Heavy Industries</span>
              </>
            )}
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto font-medium">
            {language === 'hi'
              ? 'पावर, स्टील, सीमेंट, कोल माइंस और रिफाइनरी प्रोजेक्ट्स में शून्य डाउनटाइम और सुरक्षा मानकों के साथ तैनात जनशक्ति।'
              : 'Direct workforce deployment with 100% compliance, trade certifications, and zero delay across heavy manufacturing zones.'}
          </p>

          {/* Quick Search */}
          <div className="mt-8 max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-industrial-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={
                language === 'hi'
                  ? 'उद्योग या ट्रेड खोजें (उदा. Steel, Welder, Power)...'
                  : 'Filter by industry or trade (e.g. Steel, Welder, Power)...'
              }
              className="w-full pl-12 pr-4 py-3.5 clay-input text-slate-900 placeholder-slate-400 font-bold text-sm outline-none"
            />
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="clay-card p-6 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-200 border border-slate-200/90 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-industrial-50 text-industrial-600 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 text-xs font-extrabold rounded-full bg-industrial-50 text-industrial-600 border border-industrial-200/80">
                      {item.workerCount}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-industrial-600 transition-colors">
                    {language === 'hi' ? item.nameHi : item.nameEn}
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold mt-1 mb-4">
                    {language === 'hi' ? item.taglineHi : item.taglineEn}
                  </p>

                  <div className="space-y-3 pt-3 border-t border-slate-100">
                    <span className="text-[11px] uppercase tracking-wider font-extrabold text-slate-500 block">
                      {language === 'hi' ? 'प्रमुख कुशल ट्रेड्स' : 'Key Deployed Trades'}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.keyTrades.map((trade, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 text-[11px] font-bold bg-[#faf7f4] text-slate-700 rounded-xl border border-slate-200"
                        >
                          {trade}
                        </span>
                      ))}
                    </div>

                    <span className="text-[11px] uppercase tracking-wider font-extrabold text-slate-500 block pt-2">
                      {language === 'hi' ? 'मानक एवं ऑडिट' : 'Quality Standards'}
                    </span>
                    <ul className="space-y-1.5">
                      {item.specs.map((spec, sIdx) => (
                        <li key={sIdx} className="text-xs font-semibold text-slate-600 flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-industrial-600 shrink-0" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between gap-3">
                  <Link
                    to="/company/jobs/new"
                    className="flex-1 text-center py-2.5 px-4 rounded-xl clay-btn-primary text-xs font-extrabold shadow-md flex items-center justify-center gap-1.5"
                  >
                    <span>{language === 'hi' ? 'मैनपावर तैनात करें' : 'Deploy Workforce'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    to="/worker/jobs"
                    className="py-2.5 px-3 rounded-xl clay-btn-secondary text-xs font-extrabold text-slate-700 hover:text-industrial-600 transition-colors"
                  >
                    {language === 'hi' ? 'नौकरियां' : 'Jobs'}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
      <MobileBottomNav />
    </div>
  );
};
