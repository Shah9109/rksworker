import React, { useState } from 'react';
import { Layers, Plus, Trash2, Edit2, CheckCircle } from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { useUIStore } from '../../store/uiStore';

export const ManageCategories: React.FC = () => {
  const { language } = useUIStore();

  const [categories, setCategories] = useState([
    { id: '1', nameHi: 'वेल्डर (Welder)', nameEn: 'Welder (6G/3G/TIG)', count: 4500, type: 'skill' },
    { id: '2', nameHi: 'फ़िटर (Fitter)', nameEn: 'Structural & Pipe Fitter', count: 5200, type: 'skill' },
    { id: '3', nameHi: 'पावर प्लांट', nameEn: 'Power Plant Industry', count: 12500, type: 'industry' },
    { id: '4', nameHi: 'स्टील प्लांट', nameEn: 'Steel Plant Industry', count: 15000, type: 'industry' },
  ]);

  const [nameHi, setNameHi] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [type, setType] = useState<'skill' | 'industry'>('skill');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameHi || !nameEn) return;
    setCategories((prev) => [
      ...prev,
      { id: Date.now().toString(), nameHi, nameEn, count: 0, type },
    ]);
    setNameHi('');
    setNameEn('');
  };

  const handleDelete = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {language === 'hi' ? 'कैटेगरी प्रबंधन (Manage Categories)' : 'Manage Trades & Industries'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {language === 'hi'
              ? 'ट्रेड स्किल्स और औद्योगिक सेक्टर कैटेगरी जोड़ें या प्रबंधित करें'
              : 'Add, update, or toggle trade skills and industrial sectors'}
          </p>
        </div>

        <Card className="p-6 bg-white border border-gray-200">
          <h3 className="font-bold text-base text-slate-900 mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-rose-600" />
            <span>{language === 'hi' ? 'नई कैटेगरी जोड़ें' : 'Add New Category'}</span>
          </h3>

          <form onSubmit={handleAdd} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="हिंदी नाम (Hindi Name)"
                placeholder="उदा. क्रेन ऑपरेटर"
                value={nameHi}
                onChange={(e) => setNameHi(e.target.value)}
                required
              />
              <Input
                label="English Name"
                placeholder="e.g. Crane Operator"
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                required
              />
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Category Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                  className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm outline-none"
                >
                  <option value="skill">Skill Trade (कौशल)</option>
                  <option value="industry">Industrial Sector (उद्योग)</option>
                </select>
              </div>
            </div>
            <Button type="submit" className="w-full sm:w-auto px-8 bg-rose-600 hover:bg-rose-700 font-bold">
              Add Category ✓
            </Button>
          </form>
        </Card>

        {/* Categories Table / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map((cat) => (
            <Card key={cat.id} className="p-5 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-base text-slate-900">{cat.nameHi}</h4>
                  <Badge variant={cat.type === 'skill' ? 'blue' : 'green'}>{cat.type.toUpperCase()}</Badge>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{cat.nameEn}</p>
                <span className="text-xs font-semibold text-industrial-600 mt-1 block">{cat.count} Workers Active</span>
              </div>
              <button onClick={() => handleDelete(cat.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                <Trash2 className="w-4 h-4" />
              </button>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};
