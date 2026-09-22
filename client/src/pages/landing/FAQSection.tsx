import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';

const faqs = [
  {
    qHi: 'क्या वर्कर के लिए खाता बनाना पूरी तरह से निःशुल्क है?',
    qEn: 'Is registration 100% free for industrial workers?',
    aHi: 'हाँ, वर्कपावर प्लेटफॉर्म पर किसी भी वर्कर या कारीगर से पंजीकरण का कोई शुल्क नहीं लिया जाता है।',
    aEn: 'Yes, registration and job application on WorkPower is completely free for all industrial workers.',
  },
  {
    qHi: 'लॉगिन करने के लिए किस जानकारी की आवश्यकता होती है?',
    qEn: 'What details are needed to login?',
    aHi: 'आप अपने पंजीकृत मोबाइल नंबर और जन्म तिथि (DOB) का उपयोग करके आसानी से लॉगिन कर सकते हैं।',
    aEn: 'You can easily login using your registered Phone Number and Date of Birth (DOB).',
  },
  {
    qHi: 'क्या कंपनियों के लिए वर्कर की प्रोफाइल वेरीफाइड होती है?',
    qEn: 'Are worker profiles background verified for companies?',
    aHi: 'हाँ, हमारी एडमिन टीम वर्कर द्वारा अपलोड किए गए आधार कार्ड और स्किल डॉक्यूमेंट्स की गहन जांच के बाद वेरीफाइड बैच प्रदान करती है।',
    aEn: 'Yes, our verification team validates worker Aadhaar and trade certificates before issuing verified badges.',
  },
  {
    qHi: 'क्या मैं मोबाइल पर यह ऐप इस्तेमाल कर सकता हूँ?',
    qEn: 'Can I use this application on mobile?',
    aHi: 'हाँ, वर्कपावर एक पूर्ण मोबाइल-फर्स्ट और PWA-रेडी प्लेटफॉर्म है जिसे आप बिना डाउनलोड किए भी फोन ब्राउज़र पर आसानी से चला सकते हैं।',
    aEn: 'Yes! WorkPower is PWA-ready and fully responsive for seamless operation on mobile smartphones.',
  },
];

export const FAQSection: React.FC = () => {
  const { language } = useUIStore();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-20 bg-slate-50 border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-wider font-bold text-industrial-600">
            {language === 'hi' ? 'अक्सर पूछे जाने वाले प्रश्न' : 'FREQUENTLY ASKED QUESTIONS'}
          </span>
          <h2 className="text-3xl font-bold text-slate-900 mt-2">
            {language === 'hi' ? 'सवाल एवं जवाब (FAQ)' : 'Frequently Asked Questions'}
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm transition-all"
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full px-6 py-4 text-left flex items-center justify-between font-bold text-slate-900 hover:text-industrial-600 gap-4"
              >
                <span className="text-base sm:text-lg flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-industrial-500 shrink-0" />
                  {language === 'hi' ? faq.qHi : faq.qEn}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform duration-200 shrink-0 ${
                    openIdx === idx ? 'rotate-180 text-industrial-600' : ''
                  }`}
                />
              </button>

              {openIdx === idx && (
                <div className="px-6 pb-5 pt-1 text-slate-600 text-sm border-t border-gray-100 leading-relaxed">
                  {language === 'hi' ? faq.aHi : faq.aEn}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
