import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Building2, Briefcase, FileCheck, ShieldAlert, DollarSign, ChevronRight, PlusCircle, Video } from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { CreatePostModal } from '../../components/admin/CreatePostModal';
import { useUIStore } from '../../store/uiStore';

export const AdminDashboard: React.FC = () => {
  const { language } = useUIStore();
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handlePostCreated = (post: any) => {
    alert(`Post Published: "${post.content.slice(0, 30)}..."`);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-wider text-rose-400 font-bold">System Control Center</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">Admin Dashboard</h1>
            <p className="text-slate-400 text-sm mt-1">Real-time platform metrics, user verifications & post management</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => setShowCreateModal(true)}
              className="bg-rose-600 hover:bg-rose-700 text-white font-extrabold gap-2 shadow-lg"
            >
              <PlusCircle className="w-5 h-5" />
              <span>+ Create Feed Reel / Notice</span>
            </Button>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <Card hoverEffect onClick={() => navigate('/admin/workers/verify')} className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-industrial-50 text-industrial-600 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-bold text-slate-900">2,450</span>
                <span className="block text-[11px] text-gray-500 font-semibold">Total Workers</span>
              </div>
            </div>
          </Card>

          <Card hoverEffect className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-industrial-50 text-industrial-600 flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-bold text-slate-900">120</span>
                <span className="block text-[11px] text-gray-500 font-semibold">Companies</span>
              </div>
            </div>
          </Card>

          <Card hoverEffect className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-bold text-slate-900">380</span>
                <span className="block text-[11px] text-gray-500 font-semibold">Posted Jobs</span>
              </div>
            </div>
          </Card>

          <Card hoverEffect onClick={() => navigate('/admin/workers/verify')} className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-bold text-slate-900">14</span>
                <span className="block text-[11px] text-gray-500 font-semibold">Pending Verify</span>
              </div>
            </div>
          </Card>

          <Card hoverEffect className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-bold text-slate-900">₹1.45L</span>
                <span className="block text-[11px] text-gray-500 font-semibold">Revenue</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Pending Verification Tasks */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Worker Verification Queue</h3>
            <button onClick={() => navigate('/admin/workers/verify')} className="text-xs font-bold text-rose-600 flex items-center gap-1">
              <span>Review All Queue</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {[
              { name: 'मनोज सिंह (Manoj Singh)', trade: '6G Pipe Welder', aadhaar: '8910 2345 6789', status: 'pending' },
              { name: 'अमित शर्मा (Amit Sharma)', trade: 'Industrial Electrician', aadhaar: '3456 7890 1234', status: 'pending' },
            ].map((worker, i) => (
              <Card key={i} className="p-4 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{worker.name}</h4>
                  <span className="text-xs text-gray-500">{worker.trade} • Aadhaar: {worker.aadhaar}</span>
                </div>
                <Button size="sm" onClick={() => navigate('/admin/workers/verify')} className="bg-rose-600 hover:bg-rose-700 text-white font-bold">
                  Verify Profile
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Create Post Modal */}
        {showCreateModal && (
          <CreatePostModal
            onClose={() => setShowCreateModal(false)}
            onPostCreated={handlePostCreated}
          />
        )}
      </div>
    </AdminLayout>
  );
};
