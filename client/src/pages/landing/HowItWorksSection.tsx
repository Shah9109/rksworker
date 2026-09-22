import React from 'react';
import { UserCheck, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';

export const HowItWorksSection: React.FC = () => {
  const { language } = useUIStore();

  const steps = [
    {
      icon: UserCheck,
      step: '01',
      titleHi: 'निःशुल्क पंजीकरण',
      titleEn: 'Free Registration',
      descHi: 'मोबाइल नंबर और जन्म तिथि का उपयोग करके 1 मिनट में अपना अकाउंट बनाएं।',
      descEn: 'Register your account in under 1 minute using your Phone number & Date of Birth.',
    },
    {
      icon: ShieldCheck,
      step: '02',
      titleHi: 'स्किल एवं आधार वेरीफिकेशन',
      titleEn: 'Skill & Aadhaar Verification',
      descHi: 'अपना आधार कार्ड, ट्रेड स्किल और अनुभव पत्र अपलोड करके प्रोफाइल वेरीफाई कराएं।',
      descEn: 'Upload your Aadhaar, trade skills, and certificates to get verified badge.',
    },
    {
      icon: CheckCircle2,
      step: '03',
      titleHi: 'नौकरी या वर्कर प्राप्त करें',
      titleEn: 'Get Hired / Source Workforce',
      descHi: 'कंपनियां सीधे आपसे संपर्क करेंगी, बिना किसी बिचौलिए या एजेंट के।',
      descEn: 'Connect directly with industrial employers with zero middleman commission.',
    },
  ];

  return (
    <section id="howitworks" className="py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-wider font-bold text-industrial-400">
            {language === 'hi' ? 'प्रक्रिया' : 'WORKFLOW'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
            {language === 'hi' ? 'यह कैसे काम करता है?' : 'How It Works'}
          </h2>
          <p className="text-slate-400 mt-3 text-base">
            {language === 'hi'
              ? '3 आसान चरणों में अपनी ड्रीम नौकरी या भरोसेमंद औद्योगिक कारीगर पाएं'
              : 'Simple 3-step process to connect workers with heavy industrial plants'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 relative hover:bg-white/10 transition-all duration-300"
              >
                <span className="text-4xl font-extrabold text-industrial-500/30 absolute right-6 top-6">
                  {item.step}
                </span>
                <div className="w-14 h-14 rounded-2xl bg-industrial-600 flex items-center justify-center text-white mb-6 shadow-lg shadow-industrial-600/30">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {language === 'hi' ? item.titleHi : item.titleEn}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {language === 'hi' ? item.descHi : item.descEn}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
