import React from 'react';
import { Users, ShieldCheck, MessageCircle, UserPlus } from 'lucide-react';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useUIStore } from '../../store/uiStore';

export const CommunityPage: React.FC = () => {
  const { language } = useUIStore();

  const groups = [
    {
      id: 'g-1',
      name: 'Jharkhand Welders Club (झारखंड वेल्डर ग्रुप)',
      members: '12,400 Members',
      trade: 'Welder',
      desc: 'High pressure boiler pipe welders discussing TIG/ARC trade secrets and job openings across TATA & Jindal plants.',
    },
    {
      id: 'g-2',
      name: 'Steel Plant Mechanical Technicians',
      members: '8,900 Members',
      trade: 'Fitter & Rigger',
      desc: 'Structural fitters and heavy riggers sharing blast furnace erection experiences and safety guidelines.',
    },
    {
      id: 'g-3',
      name: 'Power Plant Electricians Forum',
      members: '6,100 Members',
      trade: 'Electrician',
      desc: 'Substation maintenance, cable laying, and industrial automation technicians.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <Header />
      <main className="flex-grow max-w-5xl mx-auto w-full px-4 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {language === 'hi' ? 'वर्कर कम्युनिटी ग्रुप्स (Community Groups)' : 'Industrial Worker Community Groups'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {language === 'hi'
              ? 'अपने ट्रेड के साथी कारीगरों से जुड़ें, सलाह लें और अनुभव साझा करें'
              : 'Connect with fellow technicians in your trade, share project tips, and discuss plant vacancies'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {groups.map((group) => (
            <Card key={group.id} className="p-6 space-y-4 bg-white border border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-industrial-600 text-white flex items-center justify-center font-bold text-lg">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900">{group.name}</h3>
                    <span className="text-xs font-semibold text-gray-500">{group.members}</span>
                  </div>
                </div>
                <Badge variant="blue">{group.trade}</Badge>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed">{group.desc}</p>

              <div className="pt-2 flex justify-end">
                <Button size="sm" className="gap-1.5 font-bold">
                  <UserPlus className="w-4 h-4" />
                  <span>Join Community Group</span>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};
