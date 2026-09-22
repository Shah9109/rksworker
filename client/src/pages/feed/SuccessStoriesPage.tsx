import React from 'react';
import { Award, Star, Quote, MapPin } from 'lucide-react';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { useUIStore } from '../../store/uiStore';

export const SuccessStoriesPage: React.FC = () => {
  const { language } = useUIStore();

  const stories = [
    {
      id: 's-1',
      name: 'रमेश यादव (Ramesh Yadav)',
      trade: '6G IBR Welder',
      from: 'Bokaro, Jharkhand',
      salaryGrowth: '₹12,000 → ₹28,000 / माह',
      storyHi: 'वर्कपावर पर अपनी प्रोफाइल वेरीफाई कराने के बाद मुझे सीधे TATA Power प्रोजेक्ट में 6G वेल्डर के रूप में जॉइनिंग मिली। बिना किसी बिचौलिए के सही समय पर सैलरी मिल रही है।',
      storyEn: 'After getting my profile verified on WorkPower, I got directly selected as 6G Welder at TATA Power. No middleman commission and timely salary payments.',
    },
    {
      id: 's-2',
      name: 'सुनील महतो (Sunil Mahato)',
      trade: 'Structural Fitter Foreman',
      from: 'Korba, Chhattisgarh',
      salaryGrowth: '₹15,000 → ₹35,000 / माह',
      storyHi: 'मैंने वर्कपावर पर अपने 8 साल के अनुभव के दस्तावेज अपलोड किए। 2 हफ्तों के भीतर L&T साइट पर फोरमैन का पद मिला।',
      storyEn: 'Uploaded my 8-year structural fitting experience certificates. Got hired as Site Foreman at L&T within 2 weeks.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <Header />
      <main className="flex-grow max-w-4xl mx-auto w-full px-4 py-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <Badge variant="green" size="md">🌟 REAL WORKER STORIES</Badge>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-3">
            {language === 'hi' ? 'वर्कर सफलता की कहानियां (Success Stories)' : 'Worker Success Stories & Growth'}
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            {language === 'hi'
              ? 'देखिए कैसे हमारे कारीगरों ने वर्कपावर से जुड़कर अपने करियर में सफलता पाई'
              : 'See how skilled technicians transformed their earnings with WorkPower'}
          </p>
        </div>

        <div className="space-y-6">
          {stories.map((story) => (
            <Card key={story.id} className="p-6 space-y-4 bg-white border border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-industrial-600 text-white font-bold flex items-center justify-center text-base">
                    {story.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">{story.name}</h3>
                    <span className="text-xs font-semibold text-industrial-600 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> {story.from}
                    </span>
                  </div>
                </div>
                <Badge variant="green">{story.salaryGrowth}</Badge>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 italic text-slate-700 text-sm leading-relaxed">
                "{language === 'hi' ? story.storyHi : story.storyEn}"
              </div>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};
