import React from 'react';
import { HardHat, ShieldCheck, Download, Printer, QrCode, MapPin } from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useUIStore } from '../../store/uiStore';
import { useAuthStore } from '../../store/authStore';

export const DigitalIDPage: React.FC = () => {
  const { language } = useUIStore();
  const { user } = useAuthStore();

  const cardData = {
    id: 'WP-2026-8910',
    name: user?.name || 'राज कुमार (Raj Kumar)',
    trade: '6G / TIG Pipe Welder',
    experience: '5 Years',
    location: 'Jamshedpur, Jharkhand',
    issuedDate: '01 Jan 2026',
    validUntil: '31 Dec 2028',
    isVerified: true,
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {language === 'hi' ? 'डिजिटल वर्कर आईडी कार्ड (Digital Worker ID)' : 'Digital Industrial Worker Pass'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {language === 'hi'
              ? 'प्रमाणित QR कोड युक्त आपका डिजिटल पहचान पत्र'
              : 'Official verified identity pass with scannable QR code for site entrance'}
          </p>
        </div>

        {/* Digital ID Pass Card Container */}
        <div className="max-w-md mx-auto">
          <div className="bg-gradient-to-br from-slate-900 via-industrial-950 to-slate-900 text-white rounded-3xl p-6 border-2 border-industrial-500/40 shadow-2xl space-y-6 relative overflow-hidden">
            {/* Header Badge */}
            <div className="flex items-center justify-between border-b border-white/15 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-industrial-600 flex items-center justify-center text-white">
                  <HardHat className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-base tracking-tight">Work<span className="text-industrial-400">Power</span></span>
                  <span className="block text-[9px] uppercase tracking-widest text-industrial-300 font-semibold">Industrial Pass</span>
                </div>
              </div>
              <Badge variant="green" size="sm">✅ VERIFIED WORKER</Badge>
            </div>

            {/* Main Info Body */}
            <div className="flex gap-4 items-center">
              <div className="w-20 h-24 rounded-2xl bg-slate-800 border-2 border-industrial-400 flex items-center justify-center font-bold text-2xl text-industrial-300 shrink-0">
                📸
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">{cardData.name}</h3>
                <span className="text-xs font-bold text-industrial-300 block">{cardData.trade}</span>
                <span className="text-xs text-slate-300 block flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {cardData.location}
                </span>
                <span className="text-[11px] text-slate-400 block font-mono pt-1">ID: {cardData.id}</span>
              </div>
            </div>

            {/* Scannable QR Placeholder */}
            <div className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4 text-slate-900">
              <div className="w-16 h-16 bg-slate-900 rounded-xl flex items-center justify-center text-white shrink-0">
                <QrCode className="w-12 h-12 text-industrial-400" />
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-gray-500 block">Scan to Audit Profile</span>
                <span className="text-xs font-extrabold text-industrial-700 block">WorkPower Authenticated</span>
                <span className="text-[10px] text-gray-400 block">Valid: {cardData.validUntil}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <Button onClick={handlePrint} variant="outline" className="flex-1 gap-2 font-bold">
              <Printer className="w-4 h-4" />
              <span>{language === 'hi' ? 'प्रिंट करें (Print Pass)' : 'Print Pass'}</span>
            </Button>
            <Button className="flex-1 gap-2 font-bold">
              <Download className="w-4 h-4" />
              <span>{language === 'hi' ? 'PDF डाउनलोड करें' : 'Download PDF'}</span>
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
