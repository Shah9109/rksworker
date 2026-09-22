import React, { useState } from 'react';
import { CheckCircle2, Clock, Eye, XCircle, Building2, MapPin } from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { useUIStore } from '../../store/uiStore';

export const AppliedJobsPage: React.FC = () => {
  const { language } = useUIStore();

  const applications = [
    {
      _id: 'app-1',
      jobTitle: '6G / TIG Welder',
      companyName: 'TATA Power Ltd',
      location: 'Jamshedpur',
      appliedAt: '2026-07-26',
      status: 'shortlisted', // applied | viewed | shortlisted | approved | rejected
      history: [
        { label: 'Application Sent', date: '2026-07-26', done: true },
        { label: 'Profile Viewed by HR', date: '2026-07-27', done: true },
        { label: 'Shortlisted for Interview', date: '2026-07-28', done: true },
        { label: 'Final Approval & Work Order', date: 'Pending', done: false },
      ],
    },
    {
      _id: 'app-2',
      jobTitle: 'Structural Fitter & Fabricator',
      companyName: 'L&T Heavy Engineering',
      location: 'Bokaro',
      appliedAt: '2026-07-20',
      status: 'viewed',
      history: [
        { label: 'Application Sent', date: '2026-07-20', done: true },
        { label: 'Profile Viewed by HR', date: '2026-07-22', done: true },
        { label: 'Shortlisted for Interview', date: 'Pending', done: false },
        { label: 'Final Approval & Work Order', date: 'Pending', done: false },
      ],
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {language === 'hi' ? 'आवेदन की स्थिति (Track Applications)' : 'Track Application Status'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {language === 'hi'
              ? 'आपके द्वारा सबमिट किए गए आवेदनों की रियल-टाइम स्थिति'
              : 'Real-time status timeline of your submitted job applications'}
          </p>
        </div>

        <div className="space-y-6">
          {applications.map((app) => (
            <Card key={app._id} className="p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-bold text-lg text-slate-900">{app.jobTitle}</h3>
                  <p className="text-xs font-semibold text-industrial-600 flex items-center gap-2 mt-0.5">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{app.companyName}</span>
                    <span>•</span>
                    <span className="text-gray-500">{app.location}</span>
                  </p>
                </div>
                <div>
                  {app.status === 'shortlisted' && <Badge variant="green">🟢 Shortlisted</Badge>}
                  {app.status === 'viewed' && <Badge variant="yellow">👁 Profile Viewed</Badge>}
                  {app.status === 'applied' && <Badge variant="blue">📩 Applied</Badge>}
                </div>
              </div>

              {/* Status Timeline Bar */}
              <div className="pt-4 border-t border-gray-100">
                <h4 className="text-xs font-bold uppercase text-gray-500 mb-4">Application Progress</h4>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
                  {app.history.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 sm:flex-col sm:items-start">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                          step.done ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-400'
                        }`}
                      >
                        {step.done ? '✓' : idx + 1}
                      </div>
                      <div>
                        <span className={`text-xs font-bold block ${step.done ? 'text-slate-900' : 'text-gray-400'}`}>
                          {step.label}
                        </span>
                        <span className="text-[11px] text-gray-400">{step.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};
