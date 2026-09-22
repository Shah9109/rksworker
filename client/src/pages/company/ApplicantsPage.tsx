import React, { useState } from 'react';
import { Users, ShieldCheck, Download, CheckCircle, XCircle, Eye, Phone } from 'lucide-react';
import { CompanyLayout } from '../../components/layout/CompanyLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { useUIStore } from '../../store/uiStore';

export const ApplicantsPage: React.FC = () => {
  const { language } = useUIStore();
  const [filter, setFilter] = useState<'all' | 'applied' | 'shortlisted' | 'approved' | 'rejected'>('all');

  const [applicants, setApplicants] = useState([
    {
      _id: 'app-1',
      name: 'राज कुमार (Raj Kumar)',
      phone: '9876543210',
      trade: '6G / TIG Welder',
      experience: '5 Years',
      expectedSalary: 22000,
      district: 'Jamshedpur',
      status: 'applied',
      resumeUrl: '/sample-resume.pdf',
    },
    {
      _id: 'app-2',
      name: 'सुरेश वर्मा (Suresh Verma)',
      phone: '9812345678',
      trade: 'Structural Fitter',
      experience: '3 Years',
      expectedSalary: 19500,
      district: 'Bokaro',
      status: 'shortlisted',
      resumeUrl: '/sample-resume.pdf',
    },
  ]);

  const updateStatus = (id: string, newStatus: string) => {
    setApplicants((prev) =>
      prev.map((a) => (a._id === id ? { ...a, status: newStatus } : a))
    );
  };

  const filtered = filter === 'all' ? applicants : applicants.filter((a) => a.status === filter);

  return (
    <CompanyLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {language === 'hi' ? 'आवेदक प्रबंधन (Manage Applicants)' : 'Applicant Pipeline Review'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {language === 'hi'
              ? 'आवेदनों की समीक्षा करें, शॉर्टलिस्ट या अप्रूव करें'
              : 'Review candidate profiles, shortlist for trade test, or grant work order'}
          </p>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap gap-2">
          {['all', 'applied', 'shortlisted', 'approved', 'rejected'].map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st as any)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold uppercase transition-all ${
                filter === st
                  ? 'bg-industrial-600 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Applicants List */}
        <div className="space-y-4">
          {filtered.map((app) => (
            <Card key={app._id} className="p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg text-slate-900">{app.name}</h3>
                    <Badge variant="blue">{app.trade}</Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                    <span className="flex items-center gap-1 font-medium text-slate-700">
                      <Phone className="w-3.5 h-3.5 text-industrial-500" /> {app.phone}
                    </span>
                    <span>•</span>
                    <span>Exp: {app.experience}</span>
                    <span>•</span>
                    <span>Loc: {app.district}</span>
                    <span>•</span>
                    <span className="font-bold text-emerald-600">Expected: ₹{app.expectedSalary}/mo</span>
                  </div>
                </div>

                <div>
                  {app.status === 'approved' && <Badge variant="green">✅ Approved / Hiring Order</Badge>}
                  {app.status === 'shortlisted' && <Badge variant="yellow">⭐ Shortlisted for Trade Test</Badge>}
                  {app.status === 'rejected' && <Badge variant="red">❌ Rejected</Badge>}
                  {app.status === 'applied' && <Badge variant="gray">📩 New Application</Badge>}
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-100">
                <a
                  href={app.resumeUrl}
                  download
                  className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Resume PDF</span>
                </a>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateStatus(app._id, 'shortlisted')}
                    className="border-amber-500 text-amber-600 hover:bg-amber-50"
                  >
                    ⭐ Shortlist
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => updateStatus(app._id, 'approved')}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    ✓ Approve Hiring
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => updateStatus(app._id, 'rejected')}
                  >
                    ✕ Reject
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </CompanyLayout>
  );
};
