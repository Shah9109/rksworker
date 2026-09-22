import React from 'react';
import { Factory, Flame, Building2, Pickaxe, HardHat, Droplets, Wrench } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';

const industriesList = [
  { id: 'power', icon: ZapIcon, nameHi: 'पावर प्लांट (Power Plant)', nameEn: 'Power Plant Industry', count: '12,500+ Workers' },
  { id: 'steel', icon: Flame, nameHi: 'स्टील प्लांट (Steel Plant)', nameEn: 'Steel Plant Industry', count: '15,000+ Workers' },
  { id: 'cement', icon: Factory, nameHi: 'सीमेंट प्लांट (Cement Plant)', nameEn: 'Cement Industry', count: '8,200+ Workers' },
  { id: 'coal', icon: Pickaxe, nameHi: 'कोल माइंस (Coal Mines)', nameEn: 'Coal Mining & Minerals', count: '6,400+ Workers' },
  { id: 'construction', icon: Building2, nameHi: 'कंस्ट्रक्शन एवं इंफ्रा', nameEn: 'Heavy Construction', count: '18,000+ Workers' },
  { id: 'refinery', icon: Droplets, nameHi: 'तेल एवं रिफाइनरी (Refinery)', nameEn: 'Oil & Gas Refinery', count: '9,100+ Workers' },
  { id: 'mechanical', icon: Wrench, nameHi: 'मेकेनिक इंडस्ट्रीज', nameEn: 'Mechanical Industries', count: '14,300+ Workers' },
];

function ZapIcon(props: any) {
  return <Factory {...props} />;
}

export const IndustriesSection: React.FC = () => {
  const { language } = useUIStore();

  return (
    <section id="industries" className="py-20 bg-slate-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-wider font-bold text-industrial-600">
            {language === 'hi' ? 'सेक्टर नेटवर्क' : 'SECTOR NETWORK'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
            {language === 'hi' ? 'प्रमुख औद्योगिक क्षेत्र' : 'Industries We Serve'}
          </h2>
          <p className="text-slate-600 mt-3 text-base">
            {language === 'hi'
              ? 'हम भारत के सभी प्रमुख भारी विनिर्माण एवं ऊर्जा संयंत्रों के लिए कुशल और प्रशिक्षित कारीगर प्रदान करते हैं।'
              : 'Providing high-skill workforce across top heavy industries and infrastructure sectors in India.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {industriesList.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 group"
              >
                <div className="w-12 h-12 rounded-xl bg-industrial-50 text-industrial-600 flex items-center justify-center mb-4 group-hover:bg-industrial-600 group-hover:text-white transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-industrial-600 transition-colors">
                  {language === 'hi' ? item.nameHi : item.nameEn}
                </h3>
                <span className="inline-block mt-2 text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                  {item.count}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
