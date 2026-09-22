import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Phone, Calendar, HardHat, ArrowRight, ShieldCheck, UserCheck, Building2, ShieldAlert } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useUIStore } from '../../store/uiStore';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import API from '../../config/api';

export const LoginPage: React.FC = () => {
  const { language } = useUIStore();
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!phone || phone.length < 10) {
      setError(language === 'hi' ? 'कृपया 10 अंकों का मान्य मोबाइल नंबर दर्ज करें' : 'Please enter valid 10-digit mobile number');
      return;
    }

    if (!dob) {
      setError(language === 'hi' ? 'कृपया जन्म तिथि दर्ज करें' : 'Please select Date of Birth');
      return;
    }

    setLoading(true);
    try {
      const res = await API.post('/auth/login', { phone, dob });
      if (res.data.success) {
        setAuth(res.data.token, res.data.user, res.data.profile);
        if (res.data.user.role === 'admin') {
          navigate('/admin/dashboard');
        } else if (res.data.user.role === 'company') {
          navigate('/company/dashboard');
        } else {
          navigate('/worker/dashboard');
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.message || (language === 'hi' ? 'लॉगिन विफल रहा। कृपया विवरण जांचें।' : 'Login failed. Check details.'));
    } finally {
      setLoading(false);
    }
  };

  // Instant 1-Click Demo Login Handler
  const handleDemoLogin = (role: 'worker' | 'company' | 'admin') => {
    const demoToken = 'demo_jwt_token_2026';
    if (role === 'worker') {
      const demoUser = {
        _id: 'demo-worker-1',
        name: 'राज कुमार (Raj Kumar)',
        phone: '9876543210',
        role: 'worker' as const,
        photo: '',
        gender: 'male',
        isVerified: true,
      };
      setAuth(demoToken, demoUser, { primarySkill: 'Welder (6G TIG)' });
      navigate('/worker/dashboard');
    } else if (role === 'company') {
      const demoUser = {
        _id: 'demo-company-1',
        name: 'TATA Power Ltd',
        phone: '9812345678',
        role: 'company' as const,
        photo: '',
        isVerified: true,
      };
      setAuth(demoToken, demoUser, { companyName: 'TATA Power Projects Ltd' });
      navigate('/company/dashboard');
    } else if (role === 'admin') {
      const demoUser = {
        _id: 'demo-admin-1',
        name: 'Super Admin',
        phone: '9900000000',
        role: 'admin' as const,
        isVerified: true,
      };
      setAuth(demoToken, demoUser, {});
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f6f2] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2.5 justify-center mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-industrial-600 via-industrial-500 to-amber-500 flex items-center justify-center text-white shadow-[6px_6px_14px_rgba(235,109,72,0.35)]">
            <HardHat className="w-7 h-7" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-slate-900">Work<span className="text-industrial-600">Power</span></span>
        </Link>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          {language === 'hi' ? 'खाते में लॉगिन करें' : 'Sign in to WorkPower'}
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 font-medium">
          {language === 'hi'
            ? 'मोबाइल नंबर एवं जन्म तिथि से लॉगिन करें या 1-क्लिक डेमो यूज़ करें'
            : 'Login with Phone & DOB or use 1-Click Demo Accounts below'}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        {/* 🚀 1-CLICK DEMO LOGIN BUTTONS */}
        <div className="clay-card p-5 mb-6 space-y-3 bg-gradient-to-br from-industrial-50 to-amber-50/50 border border-industrial-200/60">
          <span className="text-xs uppercase font-extrabold text-industrial-700 tracking-wider block text-center">
            ⚡ Instant 1-Click Demo Accounts (फौरन टेस्ट करें)
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              onClick={() => handleDemoLogin('worker')}
              className="clay-btn-primary py-2.5 px-3 text-xs font-extrabold flex items-center justify-center gap-1.5"
            >
              <UserCheck className="w-4 h-4" />
              <span>Worker Demo</span>
            </button>

            <button
              onClick={() => handleDemoLogin('company')}
              className="clay-btn-secondary py-2.5 px-3 text-xs font-extrabold text-industrial-700 flex items-center justify-center gap-1.5"
            >
              <Building2 className="w-4 h-4 text-industrial-600" />
              <span>Company Demo</span>
            </button>

            <button
              onClick={() => handleDemoLogin('admin')}
              className="py-2.5 px-3 text-xs font-extrabold bg-gradient-to-r from-rose-600 to-rose-700 text-white rounded-2xl shadow-md flex items-center justify-center gap-1.5"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Admin Demo</span>
            </button>
          </div>
        </div>

        {/* Regular Login Form */}
        <div className="clay-card py-8 px-6 sm:px-10">
          {error && (
            <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-2xl flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <Input
              label={language === 'hi' ? '📱 मोबाइल नंबर' : 'Phone Number'}
              type="tel"
              placeholder="9876543210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              icon={<Phone className="w-4 h-4" />}
              required
            />

            <Input
              label={language === 'hi' ? '🎂 जन्म तिथि (Date of Birth)' : 'Date of Birth'}
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              icon={<Calendar className="w-4 h-4" />}
              required
            />

            <Button
              type="submit"
              size="lg"
              isLoading={loading}
              className="w-full font-extrabold text-base mt-2 gap-2"
            >
              <span>{language === 'hi' ? 'लॉगिन करें' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-200/60 text-center space-y-3">
            <p className="text-xs text-slate-500 font-medium">
              {language === 'hi' ? 'अभी तक खाता नहीं है?' : "Don't have an account yet?"}
            </p>
            <Link
              to="/register"
              className="w-full inline-flex justify-center py-2.5 px-4 clay-btn-secondary text-industrial-600 text-sm font-extrabold"
            >
              {language === 'hi' ? 'वर्कर (कारीगर) पंजीकरण करें' : 'Register as Worker'}
            </Link>
          </div>

          <p className="mt-6 text-center text-xs text-slate-400">
            Platform by{' '}
            <a
              href="https://www.catcatchcodes.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-industrial-600 font-extrabold hover:underline"
            >
              CatCatchCode
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
