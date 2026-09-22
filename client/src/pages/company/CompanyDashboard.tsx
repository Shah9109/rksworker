import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Users, PlusCircle, Bookmark, ShieldCheck, ChevronRight } from 'lucide-react';
import { CompanyLayout } from '../../components/layout/CompanyLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useUIStore } from '../../store/uiStore';

export const CompanyDashboard: React.FC = () => {
  const { language } = useUIStore();
  const navigate = useNavigate();

  return (
    <CompanyLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-wider text-industrial-400 font-bold">Employer Portal</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">TATA Power Projects Ltd</h1>
            <p className="text-slate-400 text-sm mt-1">Jamshedpur • Power & Thermal Plant Expansion</p>
          </div>
          <Button onClick={() => navigate('/company/jobs/new')} className="gap-2 font-bold">
            <PlusCircle className="w-5 h-5" />
            <span>{language === 'hi' ? 'नई नौकरी पोस्ट करें' : 'Post New Job'}</span>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <Card hoverEffect onClick={() => navigate('/company/jobs')}>
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-industrial-50 text-industrial-600 flex items-center justify-center">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <span className="text-2xl font-bold text-slate-900">4</span>
                <span className="block text-xs text-gray-500 font-medium">Active Jobs</span>
              </div>
            </div>
          </Card>

          <Card hoverEffect onClick={() => navigate('/company/applicants')}>
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-industrial-50 text-industrial-600 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="text-2xl font-bold text-slate-900">38</span>
                <span className="block text-xs text-gray-500 font-medium">Total Applicants</span>
              </div>
            </div>
          </Card>

          <Card hoverEffect onClick={() => navigate('/company/applicants')}>
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-2xl font-bold text-slate-900">12</span>
                <span className="block text-xs text-gray-500 font-medium">Shortlisted</span>
              </div>
            </div>
          </Card>

          <Card hoverEffect onClick={() => navigate('/company/workers')}>
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Bookmark className="w-5 h-5" />
              </div>
              <div>
                <span className="text-2xl font-bold text-slate-900">8</span>
                <span className="block text-xs text-gray-500 font-medium">Bookmarks</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Applications Received */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Recent Worker Applications</h3>
            <button onClick={() => navigate('/company/applicants')} className="text-xs font-bold text-industrial-600 flex items-center gap-1">
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {[
              { name: 'Raj Kumar', trade: '6G / TIG Welder', exp: '5 Yrs', status: 'shortlisted' },
              { name: 'Suresh Verma', trade: 'Structural Fitter', exp: '3 Yrs', status: 'applied' },
            ].map((app, i) => (
              <Card key={i} className="p-4 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{app.name}</h4>
                  <span className="text-xs text-gray-500">{app.trade} • {app.exp} Exp</span>
                </div>
                <Badge variant={app.status === 'shortlisted' ? 'green' : 'blue'}>
                  {app.status.toUpperCase()}
                </Badge>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </CompanyLayout>
  );
};
