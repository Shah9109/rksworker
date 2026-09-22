import React, { useState } from 'react';
import { UserCheck, ShieldCheck, CheckCircle, XCircle, FileText, Phone, MapPin } from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useUIStore } from '../../store/uiStore';

export const WorkerVerification: React.FC = () => {
  const { language } = useUIStore();

  const [unverified, setUnverified] = useState([
    {
      _id: 'w-1',
      name: 'मनोज सिंह (Manoj Singh)',
      phone: '9876543210',
      trade: '6G Pipe Welder',
      experience: '4 Years',
      aadhaar: '8910 2345 6789',
      district: 'Bokaro',
      isVerified: false,
    },
    {
      _id: 'w-2',
      name: 'अमित शर्मा (Amit Sharma)',
      phone: '9812345678',
      trade: 'Industrial Electrician',
      experience: '6 Years',
      aadhaar: '3456 7890 1234',
      district: 'Korba',
      isVerified: false,
    },
  ]);

  const handleVerify = (id: string, status: boolean) => {
    setUnverified((prev) => prev.map((w) => (w._id === id ? { ...w, isVerified: status } : w)));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {language === 'hi' ? 'वर्कर प्रोफाइल वेरीफिकेशन (Worker Verification)' : 'Worker Profile Verification Queue'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {language === 'hi'
              ? 'आधार एवं ट्रेड प्रमाण पत्रों की जांच करके वेरीफाइड बैज प्रदान करें'
              : 'Validate worker identity documents and grant green verified badge'}
          </p>
        </div>

        <div className="space-y-4">
          {unverified.map((worker) => (
            <Card key={worker._id} className="p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg text-slate-900">{worker.name}</h3>
                    <Badge variant="blue">{worker.trade}</Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                    <span className="flex items-center gap-1 font-medium text-slate-700">
                      <Phone className="w-3.5 h-3.5 text-rose-500" /> {worker.phone}
                    </span>
                    <span>•</span>
                    <span>Aadhaar: {worker.aadhaar}</span>
                    <span>•</span>
                    <span>Exp: {worker.experience}</span>
                    <span>•</span>
                    <span>Loc: {worker.district}</span>
                  </div>
                </div>

                <div>
                  {worker.isVerified ? (
                    <Badge variant="green">✅ Profile Verified</Badge>
                  ) : (
                    <Badge variant="yellow">⏳ Pending Admin Action</Badge>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleVerify(worker._id, false)}
                  className="border-red-400 text-red-600 hover:bg-red-50"
                >
                  ✕ Reject / Re-upload Needed
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleVerify(worker._id, true)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                >
                  ✓ Grant Verified Badge
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};
