import React, { useState } from 'react';
import { Wrench, Plus, Trash2, ShieldCheck } from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useUIStore } from '../../store/uiStore';

export const SkillsPage: React.FC = () => {
  const { language } = useUIStore();
  const [skills, setSkills] = useState([
    { _id: '1', name: '6G Pipe Welding', level: 'expert' },
    { _id: '2', name: 'TIG & ARC Welding', level: 'expert' },
    { _id: '3', name: 'Structural Fitting', level: 'intermediate' },
  ]);

  const [newSkill, setNewSkill] = useState('');
  const [level, setLevel] = useState('intermediate');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill) return;
    setSkills((prev) => [...prev, { _id: Date.now().toString(), name: newSkill, level }]);
    setNewSkill('');
  };

  const handleDelete = (id: string) => {
    setSkills((prev) => prev.filter((s) => s._id !== id));
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {language === 'hi' ? 'कौशल और ट्रेड (Skills & Trade)' : 'Skills & Trade Manager'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {language === 'hi'
              ? 'अपनी सभी औद्योगिक दक्षता (Skills) जोड़ें'
              : 'Add unlimited trade skills to get matched with high-paying job offers'}
          </p>
        </div>

        <Card className="p-6 bg-white border border-gray-200">
          <h3 className="font-bold text-base text-slate-900 mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-industrial-600" />
            <span>{language === 'hi' ? 'नया स्किल जोड़ें' : 'Add New Skill'}</span>
          </h3>

          <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="उदा. Radiography Welding / Scaffolding"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm outline-none"
            />

            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm outline-none"
            >
              <option value="beginner">शुरुआती (Beginner)</option>
              <option value="intermediate">मध्यम (Intermediate)</option>
              <option value="expert">विशेषज्ञ (Expert / Master)</option>
            </select>

            <Button type="submit" disabled={!newSkill} className="w-full font-bold">
              {language === 'hi' ? 'स्किल जोड़ें' : 'Add Skill'}
            </Button>
          </form>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((s) => (
            <Card key={s._id} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-industrial-50 text-industrial-600 flex items-center justify-center">
                  <Wrench className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{s.name}</h4>
                  <Badge variant={s.level === 'expert' ? 'green' : 'blue'} size="sm">
                    {s.level.toUpperCase()}
                  </Badge>
                </div>
              </div>
              <button onClick={() => handleDelete(s._id)} className="text-red-400 hover:text-red-600 p-1">
                <Trash2 className="w-4 h-4" />
              </button>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};
