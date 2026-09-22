import React, { useState } from 'react';
import { Clock, MapPin, CheckCircle, Navigation } from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useUIStore } from '../../store/uiStore';
import API from '../../config/api';

export const AttendancePage: React.FC = () => {
  const { language } = useUIStore();
  const [checkedIn, setCheckedIn] = useState(false);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(false);

  const [history, setHistory] = useState([
    { date: '2026-07-28', checkIn: '08:00 AM', checkOut: '05:00 PM', status: 'present', location: 'TATA Power Site' },
    { date: '2026-07-27', checkIn: '08:15 AM', checkOut: '05:00 PM', status: 'present', location: 'TATA Power Site' },
  ]);

  const handleCheckIn = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setCheckedIn(true);
          setLoading(false);
        },
        () => {
          setCheckedIn(true);
          setLoading(false);
        }
      );
    } else {
      setCheckedIn(true);
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {language === 'hi' ? 'दैनिक उपस्थिति एवं GPS लॉगर' : 'Daily Attendance & GPS Check-In'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {language === 'hi'
              ? 'साइट पर पहुंचते ही GPS उपस्थिति दर्ज करें'
              : 'Log daily site presence with GPS location stamp for salary calculation'}
          </p>
        </div>

        {/* Check-In Card */}
        <Card className="p-6 bg-white border border-gray-200 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-industrial-50 text-industrial-600 flex items-center justify-center mx-auto">
            <Clock className="w-8 h-8" />
          </div>

          {checkedIn ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 max-w-md mx-auto">
              <CheckCircle className="w-5 h-5" />
              <span>Checked-In Today at 08:05 AM (GPS Captured)</span>
            </div>
          ) : (
            <Button
              onClick={handleCheckIn}
              isLoading={loading}
              size="lg"
              className="px-10 font-bold text-base gap-2"
            >
              <Navigation className="w-5 h-5" />
              <span>{language === 'hi' ? '📍 GPS चेक-इन करें' : '📍 Site Check-In Now'}</span>
            </Button>
          )}
        </Card>

        {/* Attendance History */}
        <div className="space-y-3">
          <h3 className="font-bold text-base text-slate-900">Attendance Log History</h3>
          {history.map((h, i) => (
            <Card key={i} className="p-4 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-slate-900">{h.date}</h4>
                <span className="text-xs text-gray-500">In: {h.checkIn} • Out: {h.checkOut}</span>
              </div>
              <Badge variant="green">PRESENT ✓</Badge>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};
