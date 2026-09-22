import React, { useState } from 'react';
import { Briefcase, Plus, MapPin, Building2, Trash2 } from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useUIStore } from '../../store/uiStore';

export const ExperiencePage: React.FC = () => {
  const { language } = useUIStore();
  const [experiences, setExperiences] = useState([
    {
      _id: '1',
      companyName: 'L&T Power Project',
      duration: '2023 - 2025 (2 Yrs)',
      project: '600MW Supercritical Boiler Erection',
      location: 'Korba, CG',
      salary: 21000,
    },
    {
      _id: '2',
      companyName: 'TATA Steel Maintenance',
      duration: '2021 - 2023 (2 Yrs)',
      project: 'Blast Furnace Piping Overhaul',
      location: 'Jamshedpur',
      salary: 18500,
    },
  ]);

  const [company, setCompany] = useState('');
  const [duration, setDuration] = useState('');
  const [project, setProject] = useState('');
  const [location, setLocation] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company || !duration) return;
    setExperiences((prev) => [
      ...prev,
      { _id: Date.now().toString(), companyName: company, duration, project, location, salary: 20000 },
    ]);
    setCompany('');
    setDuration('');
    setProject('');
    setLocation('');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {language === 'hi' ? 'कार्य अनुभव (Experience History)' : 'Experience History'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {language === 'hi'
              ? 'अपनी पिछली कंपनियों और प्रोजेक्ट्स की जानकारी जोड़ें'
              : 'Add details of your past industrial companies, projects, and tenure'}
          </p>
        </div>

        <Card className="p-6 bg-white border border-gray-200">
          <h3 className="font-bold text-base text-slate-900 mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-industrial-600" />
            <span>{language === 'hi' ? 'नया अनुभव जोड़ें' : 'Add Experience Entry'}</span>
          </h3>

          <form onSubmit={handleAdd} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label={language === 'hi' ? 'कंपनी का नाम' : 'Company Name'}
                placeholder="उदा. TATA Steel / L&T"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
              />
              <Input
                label={language === 'hi' ? 'समयावधि (Duration)' : 'Duration / Tenure'}
                placeholder="उदा. 2022 - 2024 (2 Years)"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label={language === 'hi' ? 'प्रोजेक्ट का विवरण' : 'Project Name / Details'}
                placeholder="उदा. Pipe Fitting & Welding"
                value={project}
                onChange={(e) => setProject(e.target.value)}
              />
              <Input
                label={language === 'hi' ? 'स्थान (Location)' : 'Location'}
                placeholder="उदा. Bokaro, Jharkhand"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <Button type="submit" disabled={!company} className="w-full font-bold">
              {language === 'hi' ? 'अनुभव सुरक्षित करें' : 'Save Experience'}
            </Button>
          </form>
        </Card>

        <div className="space-y-4">
          {experiences.map((exp) => (
            <Card key={exp._id} className="p-5 flex items-start justify-between">
              <div className="space-y-1">
                <h4 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-industrial-600" />
                  <span>{exp.companyName}</span>
                </h4>
                <p className="text-xs font-semibold text-industrial-600">{exp.duration}</p>
                <p className="text-xs text-gray-600 mt-1">Project: {exp.project}</p>
                <span className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5" /> {exp.location}
                </span>
              </div>
              <button
                onClick={() => setExperiences((prev) => prev.filter((e) => e._id !== exp._id))}
                className="text-red-400 hover:text-red-600 p-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};
