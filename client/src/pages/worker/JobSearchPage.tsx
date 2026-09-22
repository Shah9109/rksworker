import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Briefcase, Filter, Heart, Share2, ShieldCheck, CheckCircle } from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useUIStore } from '../../store/uiStore';
import API from '../../config/api';

export const JobSearchPage: React.FC = () => {
  const { language } = useUIStore();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [skill, setSkill] = useState('');
  const [immediate, setImmediate] = useState(false);
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock initial jobs
  const initialJobs = [
    {
      _id: 'job-101',
      title: '6G / TIG Welder (High Pressure Boiler)',
      company: { companyName: 'TATA Power Ltd', address: { city: 'Jamshedpur', state: 'Jharkhand' } },
      skillRequired: 'Welder',
      experience: { min: 3, max: 5 },
      salary: { min: 22000, max: 28000 },
      immediateJoining: true,
      jobType: 'contract',
      vacancies: 15,
      createdAt: '2026-07-25',
    },
    {
      _id: 'job-102',
      title: 'Structural Fitter & Fabricator',
      company: { companyName: 'L&T Heavy Engineering', address: { city: 'Bokaro', state: 'Jharkhand' } },
      skillRequired: 'Fitter',
      experience: { min: 2, max: 4 },
      salary: { min: 19500, max: 24000 },
      immediateJoining: false,
      jobType: 'permanent',
      vacancies: 20,
      createdAt: '2026-07-26',
    },
    {
      _id: 'job-103',
      title: 'Industrial Electrician — Substation',
      company: { companyName: 'NTPC Power Station', address: { city: 'Korba', state: 'Chhattisgarh' } },
      skillRequired: 'Electrician',
      experience: { min: 4, max: 8 },
      salary: { min: 25000, max: 32000 },
      immediateJoining: true,
      jobType: 'contract',
      vacancies: 10,
      createdAt: '2026-07-27',
    },
  ];

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await API.get('/jobs', {
          params: { search, location, skill, immediate },
        });
        if (res.data.success && res.data.jobs.length > 0) {
          setJobs(res.data.jobs);
        } else {
          setJobs(initialJobs);
        }
      } catch (err) {
        setJobs(initialJobs);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [search, location, skill, immediate]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {language === 'hi' ? 'औद्योगिक नौकरियां खोजें' : 'Industrial Job Search'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {language === 'hi'
              ? 'पावर, स्टील, और रिफाइनरी प्लांट्स की ताज़ा रिक्तियां'
              : 'Browse active vacancies across Power, Steel, and Refinery projects'}
          </p>
        </div>

        {/* Filter Panel */}
        <Card className="p-5 bg-white border border-gray-200 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Input
              placeholder={language === 'hi' ? 'नौकरी पद दर्ज करें...' : 'Job title...'}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={<Search className="w-4 h-4" />}
            />
            <Input
              placeholder={language === 'hi' ? 'शहर या स्थान (उदा. Jamshedpur)...' : 'Location...'}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              icon={<MapPin className="w-4 h-4" />}
            />
            <div>
              <select
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm outline-none"
              >
                <option value="">{language === 'hi' ? 'सभी ट्रेड स्किल' : 'All Trade Skills'}</option>
                <option value="Welder">Welder (वेल्डर)</option>
                <option value="Fitter">Fitter (फ़िटर)</option>
                <option value="Electrician">Electrician (इलेक्ट्रिशियन)</option>
                <option value="Rigger">Rigger (रिगर)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-700">
              <input
                type="checkbox"
                checked={immediate}
                onChange={(e) => setImmediate(e.target.checked)}
                className="w-4 h-4 text-industrial-600 rounded"
              />
              <span>{language === 'hi' ? '🟢 केवल तुरंत जॉइनिंग (Immediate Joining)' : '🟢 Immediate Joining Only'}</span>
            </label>
            <span className="text-xs text-gray-500 font-semibold">{jobs.length} {language === 'hi' ? 'नौकरियां उपलब्ध' : 'Jobs Available'}</span>
          </div>
        </Card>

        {/* Job Cards List */}
        <div className="space-y-4">
          {jobs.map((job) => (
            <Card key={job._id} hoverEffect className="p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div>
                  <h3 className="font-bold text-lg text-slate-900">{job.title}</h3>
                  <p className="text-xs font-semibold text-industrial-600 mt-0.5">
                    {job.company?.companyName || job.companyName}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mt-2">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {job.company?.address?.city || 'Jamshedpur'}, {job.company?.address?.state || 'Jharkhand'}
                    </span>
                    <span>•</span>
                    <span>Exp: {job.experience?.min}–{job.experience?.max} Yrs</span>
                    <span>•</span>
                    <span>Vacancies: {job.vacancies}</span>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-lg font-extrabold text-slate-900 block">
                    ₹{job.salary?.min?.toLocaleString()} – ₹{job.salary?.max?.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-gray-500 block">{language === 'hi' ? 'प्रति माह' : 'per month'}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-100">
                <div className="flex gap-2">
                  <Badge variant="blue">{job.skillRequired}</Badge>
                  {job.immediateJoining && <Badge variant="green">🟢 Immediate</Badge>}
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Button
                    size="sm"
                    onClick={() => navigate(`/worker/jobs/${job._id}`)}
                    className="w-full sm:w-auto font-bold"
                  >
                    {language === 'hi' ? 'आवेदन करें (Apply Now)' : 'Apply Now'}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};
