import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { HardHat, Check, ArrowRight, ArrowLeft, Upload, ShieldCheck } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useUIStore } from '../../store/uiStore';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import API from '../../config/api';

export const RegisterPage: React.FC = () => {
  const { language } = useUIStore();
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    dob: '',
    gender: 'male',
    aadhaar: '',
    address: '',
    district: '',
    state: 'Jharkhand',
    pinCode: '',
    primarySkill: 'Welder (वेल्डर)',
    secondarySkill: 'Fitter (फ़िटर)',
    experienceYears: '3',
    currentCompany: '',
    expectedSalary: '18000',
    availability: 'immediate',
    photoUrl: '',
    aadhaarUrl: '',
    termsAccepted: false,
  });

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    setError('');
    if (step === 1) {
      if (!formData.name || !formData.phone || !formData.dob) {
        setError(language === 'hi' ? 'कृपया नाम, फोन नंबर और जन्म तिथि भरें' : 'Please fill Name, Phone, and DOB');
        return;
      }
    }
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const handlePrev = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      setError(language === 'hi' ? 'कृपया नियम और शर्तें स्वीकार करें' : 'Please accept terms & conditions');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await API.post('/auth/register-worker', formData);
      if (res.data.success) {
        setAuth(res.data.token, res.data.user, res.data.profile);
        navigate('/worker/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f6f2] flex flex-col justify-center py-10 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl text-center mb-6">
        <Link to="/" className="inline-flex items-center gap-2.5 justify-center mb-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-industrial-600 via-industrial-500 to-amber-500 flex items-center justify-center text-white shadow-[6px_6px_14px_rgba(235,109,72,0.35)]">
            <HardHat className="w-7 h-7" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-slate-900">Work<span className="text-industrial-600">Power</span></span>
        </Link>
        <h2 className="text-2xl font-extrabold text-slate-900">
          {language === 'hi' ? 'वर्कर (कारीगर) पंजीकरण' : 'Worker Registration'}
        </h2>
      </div>

      {/* Progress Steps Indicator */}
      <div className="max-w-xl mx-auto w-full px-4 mb-6">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 -z-10"></div>
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                step >= i ? 'bg-industrial-600 text-white shadow-[4px_4px_10px_rgba(235,109,72,0.35)]' : 'bg-slate-200 text-slate-500'
              }`}
            >
              {step > i ? <Check className="w-5 h-5" /> : i}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-[11px] font-bold text-slate-600 mt-2">
          <span>{language === 'hi' ? '1. व्यक्तिगत' : '1. Personal'}</span>
          <span>{language === 'hi' ? '2. स्किल' : '2. Skills'}</span>
          <span>{language === 'hi' ? '3. डॉक्युमेंट' : '3. Docs'}</span>
          <span>{language === 'hi' ? '4. समीक्षा' : '4. Review'}</span>
        </div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-xl px-4">
        <div className="clay-card py-8 px-6 sm:px-10 border border-slate-200/80">
          {error && (
            <div className="mb-5 p-3 bg-red-50 text-red-700 text-xs font-semibold rounded-xl flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Info */}
            {step === 1 && (
              <div className="space-y-4">
                <Input
                  label={language === 'hi' ? 'पूरा नाम (Full Name)' : 'Full Name'}
                  placeholder="उदा. राज कुमार"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  required
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label={language === 'hi' ? 'मोबाइल नंबर' : 'Phone Number'}
                    type="tel"
                    placeholder="9876543210"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    required
                  />
                  <Input
                    label={language === 'hi' ? 'जन्म तिथि (DOB)' : 'Date of Birth'}
                    type="date"
                    value={formData.dob}
                    onChange={(e) => handleChange('dob', e.target.value)}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1.5">
                      {language === 'hi' ? 'लिंग (Gender)' : 'Gender'}
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) => handleChange('gender', e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm outline-none"
                    >
                      <option value="male">पुरुष (Male)</option>
                      <option value="female">महिला (Female)</option>
                      <option value="other">अन्य (Other)</option>
                    </select>
                  </div>
                  <Input
                    label={language === 'hi' ? 'आधार संख्या (Aadhaar)' : 'Aadhaar Number'}
                    placeholder="1234 5678 9012"
                    value={formData.aadhaar}
                    onChange={(e) => handleChange('aadhaar', e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Input
                    label={language === 'hi' ? 'जिला (District)' : 'District'}
                    placeholder="Bokaro"
                    value={formData.district}
                    onChange={(e) => handleChange('district', e.target.value)}
                  />
                  <Input
                    label={language === 'hi' ? 'राज्य (State)' : 'State'}
                    placeholder="Jharkhand"
                    value={formData.state}
                    onChange={(e) => handleChange('state', e.target.value)}
                  />
                  <Input
                    label={language === 'hi' ? 'पिन कोड' : 'Pin Code'}
                    placeholder="827001"
                    value={formData.pinCode}
                    onChange={(e) => handleChange('pinCode', e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Skills & Experience */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1.5">
                    {language === 'hi' ? 'मुख्य ट्रेड / स्किल (Primary Skill)' : 'Primary Skill'}
                  </label>
                  <select
                    value={formData.primarySkill}
                    onChange={(e) => handleChange('primarySkill', e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm outline-none"
                  >
                    <option value="Welder (वेल्डर)">Welder (वेल्डर - 6G/3G/TIG)</option>
                    <option value="Fitter (फ़िटर)">Fitter (फ़िटर)</option>
                    <option value="Gas Cutter (गैस कटर)">Gas Cutter (गैस कटर)</option>
                    <option value="Rigger (रिगर)">Rigger (हेवी रिगर)</option>
                    <option value="Electrician (इलेक्ट्रिशियन)">Electrician (इंडस्ट्रियल)</option>
                    <option value="Helper (हेल्पर)">Helper (सामान्य हेल्पर)</option>
                    <option value="Scaffolder (स्केफोल्डर)">Scaffolder (स्केफोल्डर)</option>
                    <option value="Safety Officer">Safety Officer (सेफ़्टी ऑफिसर)</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label={language === 'hi' ? 'अनुभव (वर्ष में)' : 'Experience (Years)'}
                    type="number"
                    value={formData.experienceYears}
                    onChange={(e) => handleChange('experienceYears', e.target.value)}
                  />
                  <Input
                    label={language === 'hi' ? 'अपेक्षित वेतन (₹/माह)' : 'Expected Salary (₹/month)'}
                    type="number"
                    value={formData.expectedSalary}
                    onChange={(e) => handleChange('expectedSalary', e.target.value)}
                  />
                </div>

                <Input
                  label={language === 'hi' ? 'वर्तमान / पिछली कंपनी' : 'Current/Past Company'}
                  placeholder="उदा. L&T / TATA Steel Project"
                  value={formData.currentCompany}
                  onChange={(e) => handleChange('currentCompany', e.target.value)}
                />

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1.5">
                    {language === 'hi' ? 'उपलब्धता (Availability)' : 'Availability'}
                  </label>
                  <select
                    value={formData.availability}
                    onChange={(e) => handleChange('availability', e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm outline-none"
                  >
                    <option value="immediate">तुरंत उपलब्ध (Immediate Joining)</option>
                    <option value="15days">15 दिनों में (Within 15 Days)</option>
                    <option value="30days">30 दिनों में (Within 30 Days)</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 3: Documents */}
            {step === 3 && (
              <div className="space-y-5">
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-industrial-500 transition-colors cursor-pointer bg-gray-50">
                  <Upload className="w-8 h-8 text-industrial-600 mx-auto mb-2" />
                  <span className="text-sm font-bold text-gray-800 block">
                    {language === 'hi' ? 'अपना फोटो अपलोड करें' : 'Upload Passport Photo'}
                  </span>
                  <span className="text-xs text-gray-500 block mt-1">JPG, PNG (Max 5MB)</span>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-industrial-500 transition-colors cursor-pointer bg-gray-50">
                  <Upload className="w-8 h-8 text-industrial-600 mx-auto mb-2" />
                  <span className="text-sm font-bold text-gray-800 block">
                    {language === 'hi' ? 'आधार कार्ड अपलोड करें' : 'Upload Aadhaar Card'}
                  </span>
                  <span className="text-xs text-gray-500 block mt-1">PDF, JPG (Max 10MB)</span>
                </div>
              </div>
            )}

            {/* Step 4: Review & Terms */}
            {step === 4 && (
              <div className="space-y-4 text-sm">
                <div className="bg-slate-50 p-4 rounded-2xl space-y-2 border border-slate-200">
                  <p><strong>नाम:</strong> {formData.name}</p>
                  <p><strong>फोन:</strong> {formData.phone}</p>
                  <p><strong>ट्रेड:</strong> {formData.primarySkill}</p>
                  <p><strong>अनुभव:</strong> {formData.experienceYears} वर्ष</p>
                  <p><strong>अपेक्षित वेतन:</strong> ₹{formData.expectedSalary}/माह</p>
                </div>

                <label className="flex items-start gap-3 cursor-pointer pt-2">
                  <input
                    type="checkbox"
                    checked={formData.termsAccepted}
                    onChange={(e) => handleChange('termsAccepted', e.target.checked)}
                    className="mt-1 w-4 h-4 text-industrial-600 rounded"
                  />
                  <span className="text-xs text-gray-600 leading-relaxed">
                    {language === 'hi'
                      ? 'मैं वर्कपावर के नियम और शर्तों से सहमत हूँ। मेरी दी गई जानकारी सत्य और सही है।'
                      : 'I accept WorkPower terms and conditions. The information provided is accurate.'}
                  </span>
                </label>
              </div>
            )}

            {/* Buttons */}
            <div className="flex items-center justify-between gap-4 mt-8 pt-4 border-t border-gray-100">
              {step > 1 ? (
                <Button type="button" variant="outline" onClick={handlePrev} className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  {language === 'hi' ? 'पीछे' : 'Back'}
                </Button>
              ) : <div></div>}

              {step < 4 ? (
                <Button type="button" onClick={handleNext} className="gap-2">
                  {language === 'hi' ? 'आगे बढ़ें' : 'Next'}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button type="submit" isLoading={loading} className="gap-2 font-bold px-8">
                  {language === 'hi' ? 'रजिस्टर करें ✓' : 'Register Now ✓'}
                </Button>
              )}
            </div>
          </form>

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
