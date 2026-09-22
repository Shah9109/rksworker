import React, { useState, useEffect } from 'react';
import { Flame, TrendingUp, Sparkles, Video, Instagram, Facebook, Youtube } from 'lucide-react';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { PostCard } from '../../components/feed/PostCard';
import { useUIStore } from '../../store/uiStore';
import API from '../../config/api';

export const FeedPage: React.FC = () => {
  const { language } = useUIStore();
  const [tab, setTab] = useState<'trending' | 'popular' | 'latest' | 'video'>('trending');
  const [posts, setPosts] = useState<any[]>([]);

  // Comprehensive mock feed featuring YouTube Shorts, Instagram Reels, Facebook Reels, and Direct Video
  const mockPosts = [
    {
      _id: 'p-yt-1',
      authorName: 'Master Welder Academy',
      category: 'YouTube Shorts Reel',
      type: 'video',
      embedUrl: 'https://www.youtube.com/shorts/dQw4w9WgXcQ',
      createdAt: '2026-08-24',
      content: '🎥 6G TIG Boiler Pipe Welding Technique Demonstration. Watch how to maintain proper root penetration under 100% Radiography Test (RT) standards.',
      likes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    },
    {
      _id: 'p-ig-1',
      authorName: 'Industrial CNC & Machining Hub',
      category: 'Instagram Reel',
      type: 'video',
      embedUrl: 'https://www.instagram.com/reel/C-a5_HOSr5m/',
      createdAt: '2026-08-23',
      content: '⚙️ 5-Axis CNC Milling high-precision aerospace turbine impeller cutting process. Public reel available directly without login!',
      likes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
    {
      _id: 'p-fb-1',
      authorName: 'Heavy Equipment & Cranes India',
      category: 'Facebook Reel',
      type: 'video',
      embedUrl: 'https://www.facebook.com/reel/1029384756',
      createdAt: '2026-08-22',
      content: '🏗️ 250-Ton Hydraulic Mobile Crane tandem lift safety checklist demonstration at refinery construction site.',
      likes: [1, 2, 3, 4, 5, 6, 7, 8],
    },
    {
      _id: 'p-news-1',
      authorName: 'WorkPower Industrial News',
      category: 'Job Alert',
      type: 'news',
      createdAt: '2026-08-24',
      content: '🚨 TATA Power Jamshedpur expansion project opens 50+ new 6G Welder and Structural Fitter positions! Direct hiring trade test scheduled for this Friday.',
      likes: [1, 2, 3, 4, 5],
    },
    {
      _id: 'p-news-2',
      authorName: 'Ministry of Heavy Industries',
      category: 'Safety Update',
      type: 'news',
      createdAt: '2026-08-21',
      content: '📢 New monsoon safety guidelines issued for thermal power station erection sites across Jharkhand, Odisha, and Chhattisgarh.',
      likes: [1, 2, 3, 4, 5, 6, 7],
    },
  ];

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await API.get('/posts', { params: { sort: tab } });
        if (res.data.success && res.data.posts && res.data.posts.length > 0) {
          const apiPosts = res.data.posts;
          if (tab === 'video') {
            setPosts(apiPosts.filter((p: any) => p.type === 'video' || p.embedUrl));
          } else {
            setPosts(apiPosts);
          }
        } else {
          filterMockFeed(tab);
        }
      } catch (err) {
        filterMockFeed(tab);
      }
    };

    const filterMockFeed = (currentTab: string) => {
      if (currentTab === 'video') {
        setPosts(mockPosts.filter((p) => p.type === 'video'));
      } else if (currentTab === 'latest') {
        setPosts([...mockPosts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      } else if (currentTab === 'popular') {
        setPosts([...mockPosts].sort((a, b) => b.likes.length - a.likes.length));
      } else {
        setPosts(mockPosts);
      }
    };

    fetchFeed();
  }, [tab]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <Header />
      <main className="flex-grow max-w-4xl mx-auto w-full px-4 py-8 space-y-6">
        {/* Banner Header */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl border border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-industrial-400 font-extrabold">Industrial Community</span>
              <div className="flex items-center gap-1 bg-white/10 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-slate-200">
                <Youtube className="w-3 h-3 text-red-400" />
                <Instagram className="w-3 h-3 text-pink-400" />
                <Facebook className="w-3 h-3 text-blue-400" />
                <span>Direct In-Feed Reels</span>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black mt-1">
              {language === 'hi' ? 'सोशल फीड एवं रील्स (Social Feed & Reels)' : 'Industrial Social Feed & Reels'}
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              {language === 'hi'
                ? 'बिना लॉगिन इंस्टाग्राम, फेसबुक एवं यूट्यूब रील्स सीधे फीड में देखें'
                : 'Watch YouTube Shorts, Instagram Reels & Facebook Reels directly in-feed without requiring any login'}
            </p>
          </div>
        </div>

        {/* Feed Filter Tabs */}
        <div className="flex gap-2 bg-white p-2 rounded-2xl border border-gray-200 shadow-sm overflow-x-auto">
          <button
            onClick={() => setTab('trending')}
            className={`px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
              tab === 'trending' ? 'bg-industrial-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-400" />
            <span>Trending All</span>
          </button>

          <button
            onClick={() => setTab('video')}
            className={`px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
              tab === 'video' ? 'bg-industrial-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Video className="w-4 h-4 text-rose-400" />
            <span>Reels & Videos</span>
          </button>

          <button
            onClick={() => setTab('popular')}
            className={`px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
              tab === 'popular' ? 'bg-industrial-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>Most Popular</span>
          </button>

          <button
            onClick={() => setTab('latest')}
            className={`px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
              tab === 'latest' ? 'bg-industrial-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Sparkles className="w-4 h-4 text-industrial-400" />
            <span>Latest News & Jobs</span>
          </button>
        </div>

        {/* Posts Feed Stream */}
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};
