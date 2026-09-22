import React from 'react';
import { Badge } from '../../components/ui/Badge';
import { useUIStore } from '../../store/uiStore';

const skillTrades = [
  { nameHi: 'वेल्डर (Welder)', nameEn: 'Welder (6G/3G/TIG)', count: '4,500+' },
  { nameHi: 'फ़िटर (Fitter)', nameEn: 'Structural & Pipe Fitter', count: '5,200+' },
  { nameHi: 'गैस कटर (Gas Cutter)', nameEn: 'Gas Cutter', count: '2,800+' },
  { nameHi: 'रिगर (Rigger)', nameEn: 'Heavy Rigger', count: '3,900+' },
  { nameHi: 'इलेक्ट्रिशियन (Electrician)', nameEn: 'Industrial Electrician', count: '4,100+' },
  { nameHi: 'हेल्पर (Helper)', nameEn: 'General Industrial Helper', count: '8,500+' },
  { nameHi: 'सिविल वर्कर (Civil Worker)', nameEn: 'Civil & Mason Worker', count: '3,400+' },
  { nameHi: 'पेंटर (Painter)', nameEn: 'Industrial Painter', count: '1,900+' },
  { nameHi: 'कार्पेंटर (Carpenter)', nameEn: 'Shuttering Carpenter', count: '2,100+' },
  { nameHi: 'स्केफोल्डर (Scaffolder)', nameEn: 'Scaffolder', count: '3,000+' },
  { nameHi: 'फ़ैब्रिकेटर (Fabricator)', nameEn: 'Fabricator', count: '2,700+' },
  { nameHi: 'पाइप फ़िटर (Pipe Fitter)', nameEn: 'Pipe Fitter', count: '3,300+' },
  { nameHi: 'पाइप वेल्डर (Pipe Welder)', nameEn: 'High Pressure Pipe Welder', count: '2,200+' },
  { nameHi: 'सेफ़्टी ऑफिसर (Safety Officer)', nameEn: 'Safety Officer', count: '950+' },
  { nameHi: 'सुपरवाइजर (Supervisor)', nameEn: 'Site Supervisor', count: '1,400+' },
  { nameHi: 'फोरमैन (Foreman)', nameEn: 'Mechanical Foreman', count: '820+' },
  { nameHi: 'क्रेन ऑपरेटर (Crane Operator)', nameEn: 'Heavy Crane Operator', count: '1,100+' },
  { nameHi: 'फोरकलिफ्ट ऑपरेटर', nameEn: 'Forklift Operator', count: '1,300+' },
  { nameHi: 'ड्राइवर (Driver)', nameEn: 'Heavy Vehicle Driver', count: '2,400+' },
  { nameHi: 'हाउसकीपिंग (Housekeeping)', nameEn: 'Industrial Housekeeping', count: '2,900+' },
  { nameHi: 'सिक्योरिटी (Security)', nameEn: 'Security Guard', count: '3,100+' },
];

export const ServicesSection: React.FC = () => {
  const { language } = useUIStore();

  return (
    <section id="services" className="py-20 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-wider font-bold text-industrial-600">
            {language === 'hi' ? 'स्किल ट्रेड्स' : 'SKILL TRADES'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
            {language === 'hi' ? 'उपलब्ध मैनपावर ट्रेड्स (20+ Categories)' : 'Available Manpower Trades (20+ Categories)'}
          </h2>
          <p className="text-slate-600 mt-3 text-base">
            {language === 'hi'
              ? 'हर ट्रेड के प्रमाणित कारीगर, वेल्डर से लेकर साइट सुपरवाइजर तक तुरंत उपलब्ध हैं।'
              : 'Certified technicians and skilled workers from 6G Welders to Site Supervisors.'}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {skillTrades.map((trade, idx) => (
            <div
              key={idx}
              className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 hover:border-industrial-400 hover:bg-industrial-50/50 transition-all cursor-pointer group shadow-sm"
            >
              <span className="text-xs font-semibold text-industrial-600 block mb-1">
                {trade.count} {language === 'hi' ? 'उपलब्ध' : 'Available'}
              </span>
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-industrial-700">
                {language === 'hi' ? trade.nameHi : trade.nameEn}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
