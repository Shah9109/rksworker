import React, { useState } from 'react';
import { User, Phone, MapPin, Briefcase, CheckCircle, ShieldCheck } from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useUIStore } from '../../store/uiStore';
import { useAuthStore } from '../../store/authStore';

export const EditProfile: React.FC = () => {
  const { language } = useUIStore();
  const { user } = useAuthStore();

  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || 'राज कुमार',
    phone: user?.phone || '9876543210',
    aadhaar: '1234 5678 9012',
    district: 'Jamshedpur',
    state: 'Jharkhand',
    primarySkill: 'Welder (6G TIG & ARC)',
    secondarySkill: 'Structural Fitter',
    experienceYears: '5',
    expectedSalary: '22000',
    availability: 'immediate',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {language === 'hi' ? 'प्रोफाइल संपादित करें (Edit Profile)' : 'Edit Profile'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {language === 'hi'
              ? 'अपनी व्यक्तिगत और व्यावसायिक जानकारी अपडेट करें'
              : 'Keep your contact, location, and expected salary details updated'}
          </p>
        </div>

        {saved && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl text-sm font-bold flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <span>{language === 'hi' ? 'प्रोफाइल सफलतापूर्वक अपडेट हो गई! ✓' : 'Profile updated successfully! ✓'}</span>
          </div>
        )}

        <Card className="p-6 bg-white border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label={language === 'hi' ? 'पूरा नाम' : 'Full Name'}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <Input
                label={language === 'hi' ? 'मोबाइल नंबर' : 'Phone Number'}
                value={formData.phone}
                disabled
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label={language === 'hi' ? 'आधार नंबर' : 'Aadhaar Number'}
                value={formData.aadhaar}
                onChange={(e) => setFormData({ ...formData, aadhaar: e.target.value })}
              />
              <Input
                label={language === 'hi' ? 'जिला (District)' : 'District'}
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
              />
              <Input
                label={language === 'hi' ? 'राज्य (State)' : 'State'}
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">
                  {language === 'hi' ? 'मुख्य ट्रेड (Primary Skill)' : 'Primary Skill'}
                </label>
                <select
                  value={formData.primarySkill}
                  onChange={(e) => setFormData({ ...formData, primarySkill: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm outline-none"
                >
                  <option value="Welder (6G TIG & ARC)">Welder (6G TIG & ARC)</option>
                  <option value="Structural Fitter">Structural Fitter</option>
                  <option value="Heavy Rigger">Heavy Rigger</option>
                  <option value="Industrial Electrician">Industrial Electrician</option>
                </select>
              </div>

              <Input
                label={language === 'hi' ? 'अपेक्षित वेतन (₹/माह)' : 'Expected Salary (₹/month)'}
                type="number"
                value={formData.expectedSalary}
                onChange={(e) => setFormData({ ...formData, expectedSalary: e.target.value })}
              />
            </div>

            <Button type="submit" size="lg" className="w-full sm:w-auto px-8 font-bold">
              {language === 'hi' ? 'बदलाव सुरक्षित करें' : 'Save Changes'}
            </Button>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
};
