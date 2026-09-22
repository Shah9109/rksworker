import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  FileText,
  CheckCircle,
  Search,
  ShieldCheck,
  MapPin,
  Megaphone,
  Flame,
  ChevronRight,
  Sparkles,
  Zap,
} from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { PostCard } from '../../components/feed/PostCard';
import { useUIStore } from '../../store/uiStore';
import { useAuthStore } from '../../store/authStore';
import API from '../../config/api';

export const WorkerDashboard: React.FC = () => {
  const { language } = useUIStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [data, setData] = useState<any>(null);
  const [feedPosts, setFeedPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Horizontal Notice Cards Carousel Data
  const noticeCards = [
    {
      id: 'notice-1',
      titleHi: '🚨 6G वेल्डर ट्रेड टेस्ट सूचना — TATA Power',
      titleEn: '🚨 6G Welder Trade Test Alert — TATA Power',
      descHi: 'टाटा पावर जमशेदपुर साइट पर इस शुक्रवार को फ्री ट्रेड टेस्ट और ऑन-द-स्पॉट जॉइनिंग लेटर।',
      descEn: 'Free trade test and on-the-spot hiring order at TATA Power Jamshedpur site this Friday.',
      badge: 'URGENT NOTICE',
      bgGradient: 'from-industrial-600 to-industrial-800',
    },
    {
      id: 'notice-2',
      titleHi: '📢 आधार एवं IBR सर्टिफिकेट वेरिफिकेशन अनिवार्य',
      titleEn: '📢 Mandatory Aadhaar & IBR Verification',
      descHi: 'कृपया अपने दस्तावेज़ अनुभाग में आधार कार्ड और मेडिकल सर्टिफिकेट तुरंत अपडेट करें।',
      descEn: 'Please update your Aadhaar card and medical fitness certificate in Documents Manager.',
      badge: 'VERIFICATION ALERT',
      bgGradient: 'from-amber-600 to-orange-700',
    },
    {
      id: 'notice-3',
      titleHi: '🏭 NTPC कोरबा — 100+ स्ट्रक्चरल फ़िटर भर्ती',
      titleEn: '🏭 NTPC Korba — 100+ Fitter Vacancies',
      descHi: 'NTPC सुपरक्रिटिकल थर्मल प्लांट प्रोजेक्ट के लिए अनुभवी पाइप फ़िटर और फ़ैब्रिकेटर आमंत्रित हैं।',
      descEn: 'Experienced pipe fitters and fabricators invited for NTPC Thermal Station project.',
      badge: 'NEW JOB HIRING',
      bgGradient: 'from-emerald-600 to-teal-700',
    },
  ];

  // Initial Feed Stream Demo Data (Videos, YouTube Shorts, Google Drive, News)
  const initialPosts = [
    {
      _id: 'post-video-1',
      authorName: 'WorkPower Official Admin',
      category: 'Reels / Video Tip',
      type: 'video',
      embedUrl: 'https://www.youtube.com/shorts/dQw4w9WgXcQ',
      createdAt: '2026-07-28',
      content: '🎥 Master 6G TIG Boiler Pipe Welding Root Penetration! Watch this step-by-step demonstration for 100% Radiography Test (RT) clearance.',
      likes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    },
    {
      _id: 'post-news-1',
      authorName: 'Heavy Industries Gazette',
      category: 'Industry News',
      type: 'news',
      createdAt: '2026-07-27',
      content: '📰 Ministry of Steel & Power announces 15% wage revision for certified alloy steel welders across national thermal & steel plants.',
      likes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    },
    {
      _id: 'post-drive-1',
      authorName: 'Safety Department Admin',
      category: 'Safety Video Reel',
      type: 'video',
      embedUrl: 'https://drive.google.com/file/d/1sampleVideoId/preview',
      createdAt: '2026-07-26',
      content: '⚠️ High-Temperature Safety Inspection Reel for Plant Technicians in Scaffolding & Boiler Erection Zones.',
      likes: [1, 2, 3, 4, 5, 6, 7, 8],
    },
  ];

  useEffect(() => {
    const fetchDashboardAndFeed = async () => {
      try {
        const [dashRes, feedRes] = await Promise.all([
          API.get('/worker/dashboard'),
          API.get('/posts'),
        ]);

        if (dashRes.data.success) {
          setData(dashRes.data);
        }
        if (feedRes.data.success && feedRes.data.posts.length > 0) {
          setFeedPosts(feedRes.data.posts);
        } else {
          setFeedPosts(initialPosts);
        }
      } catch (err) {
        setFeedPosts(initialPosts);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardAndFeed();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-slate-900 via-industrial-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-industrial-300 font-bold">
                {language === 'hi' ? 'स्वागत है' : 'Welcome Back'}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">
                {user?.name || 'राज कुमार (Raj Kumar)'}
              </h1>
              <p className="text-slate-300 text-sm mt-1">
                {language === 'hi'
                  ? 'मुख्य ट्रेड: Welder / 6G Pipe Welder'
                  : 'Primary Trade: Welder / 6G Pipe Welder'}
              </p>
            </div>
            <Button
              onClick={() => navigate('/worker/profile')}
              variant="outline"
              size="sm"
              className="border-white/30 text-white hover:bg-white/10"
            >
              {language === 'hi' ? 'प्रोफाइल संपादित करें' : 'Edit Profile'}
            </Button>
          </div>

          {/* Profile Completion Bar */}
          <div className="mt-6 pt-6 border-t border-white/15">
            <div className="flex justify-between items-center text-xs font-semibold mb-2">
              <span>{language === 'hi' ? 'प्रोफाइल पूर्णता (Completion)' : 'Profile Completion'}</span>
              <span className="text-industrial-300">{data?.profileCompletion || 75}%</span>
            </div>
            <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-industrial-400 to-industrial-200 rounded-full transition-all duration-500"
                style={{ width: `${data?.profileCompletion || 75}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* 📢 HORIZONTAL SCROLL IMPORTANT NOTICE CARDS CAROUSEL */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-industrial-600 animate-bounce" />
              <span>{language === 'hi' ? 'महत्वपूर्ण सूचना कार्ड्स (Important Notices)' : 'Important Announcement Cards'}</span>
            </h3>
            <span className="text-xs text-gray-500 font-bold">{language === 'hi' ? 'दाएं स्वाइप करें →' : 'Swipe Right →'}</span>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x scrollbar-thin scrollbar-thumb-industrial-300">
            {noticeCards.map((notice) => (
              <div
                key={notice.id}
                className={`snap-start min-w-[290px] sm:min-w-[340px] max-w-[340px] bg-gradient-to-br ${notice.bgGradient} text-white p-5 rounded-3xl shadow-[6px_6px_16px_rgba(0,0,0,0.15)] flex flex-col justify-between shrink-0 space-y-4`}
              >
                <div>
                  <Badge variant="blue" size="sm" className="bg-white/20 text-white border-white/30 font-extrabold mb-3">
                    {notice.badge}
                  </Badge>
                  <h4 className="font-extrabold text-base leading-snug">
                    {language === 'hi' ? notice.titleHi : notice.titleEn}
                  </h4>
                  <p className="text-xs text-white/90 mt-2 leading-relaxed font-medium">
                    {language === 'hi' ? notice.descHi : notice.descEn}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/20 flex justify-end">
                  <button
                    onClick={() => navigate('/worker/jobs')}
                    className="text-xs font-extrabold text-white hover:underline flex items-center gap-1"
                  >
                    <span>{language === 'hi' ? 'विवरण देखें' : 'View Details'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <Card hoverEffect onClick={() => navigate('/worker/documents')}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-industrial-50 text-industrial-600 flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <span className="text-2xl font-extrabold text-slate-900">{data?.stats?.documentsUploaded || 3}</span>
                <span className="block text-xs text-gray-500 font-bold">{language === 'hi' ? 'अपलोड दस्तावेज' : 'Uploaded Docs'}</span>
              </div>
            </div>
          </Card>

          <Card hoverEffect onClick={() => navigate('/worker/applied')}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-2xl font-extrabold text-slate-900">{data?.stats?.appliedJobs || 4}</span>
                <span className="block text-xs text-gray-500 font-bold">{language === 'hi' ? 'आवेदन की स्थिति' : 'Applications'}</span>
              </div>
            </div>
          </Card>

          <Card hoverEffect onClick={() => navigate('/worker/jobs')}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Search className="w-6 h-6" />
              </div>
              <div>
                <span className="text-2xl font-extrabold text-slate-900">{data?.stats?.savedJobs || 2}</span>
                <span className="block text-xs text-gray-500 font-bold">{language === 'hi' ? 'सेव की गई नौकरियां' : 'Saved Jobs'}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* 📱 INTEGRATED INFINITE SOCIAL FEED & MEDIA REELS */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <Flame className="w-6 h-6 text-rose-500 animate-pulse" />
              <span>{language === 'hi' ? 'लाइव सोशल फीड एवं वीडियो रील्स (Social Feed & Reels)' : 'Live Social Feed & Video Reels'}</span>
            </h3>
            <button
              onClick={() => navigate('/feed')}
              className="text-xs font-extrabold text-industrial-600 hover:underline flex items-center gap-1"
            >
              <span>{language === 'hi' ? 'फीड खोलें' : 'Open Full Feed'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Feed Post Stream on Worker Home Page */}
          <div className="space-y-5">
            {feedPosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
