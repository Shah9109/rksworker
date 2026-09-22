import React, { useState } from 'react';
import { Play, ExternalLink, Instagram, Facebook, Youtube, Video, Maximize2, Minimize2 } from 'lucide-react';

interface MediaEmbedProps {
  embedUrl: string;
}

export const MediaEmbed: React.FC<MediaEmbedProps> = ({ embedUrl }) => {
  if (!embedUrl) return null;

  const [aspectMode, setAspectMode] = useState<'portrait' | 'standard'>('portrait');
  const [iframeError, setIframeError] = useState(false);

  // 1. Extract YouTube ID & Type (Shorts vs Standard)
  const getYouTubeInfo = (url: string) => {
    const isShort = url.includes('/shorts/') || url.includes('shorts');
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    const id = match && match[2].length === 11 ? match[2] : null;
    return id ? { id, isShort } : null;
  };

  // 2. Extract Instagram Shortcode
  const getInstagramInfo = (url: string) => {
    const isIg = url.includes('instagram.com');
    if (!isIg) return null;
    const match = url.match(/instagram\.com\/(?:reel|reels|p|tv)\/([a-zA-Z0-9_-]+)/);
    const id = match ? match[1] : null;
    return {
      id,
      embedUrl: id ? `https://www.instagram.com/reel/${id}/embed` : url,
      isReel: url.includes('/reel') || url.includes('/reels'),
    };
  };

  // 3. Extract Facebook Video / Reel Info
  const getFacebookInfo = (url: string) => {
    const isFb = url.includes('facebook.com') || url.includes('fb.watch');
    if (!isFb) return null;
    const isReel = url.includes('/reel/') || url.includes('/reels/') || url.includes('/share/r/');
    const encodedUrl = encodeURIComponent(url.trim());
    return {
      isFb: true,
      isReel,
      embedUrl: `https://www.facebook.com/plugins/video.php?href=${encodedUrl}&show_text=0&autoplay=0`,
    };
  };

  // 4. Extract Google Drive File ID
  const getGoogleDriveId = (url: string) => {
    const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
  };

  // 5. Check Direct Video (MP4 / WebM / OGG)
  const isDirectVideo = (url: string) => {
    return (
      url.endsWith('.mp4') ||
      url.endsWith('.webm') ||
      url.endsWith('.ogg') ||
      url.includes('.mp4?') ||
      url.includes('mime=video')
    );
  };

  const ytInfo = getYouTubeInfo(embedUrl);
  const igInfo = getInstagramInfo(embedUrl);
  const fbInfo = getFacebookInfo(embedUrl);
  const driveId = getGoogleDriveId(embedUrl);
  const directVideo = isDirectVideo(embedUrl);

  // Platform Header Bar
  const renderHeader = (title: string, icon: React.ReactNode, bgGradient: string) => (
    <div className={`px-4 py-2.5 rounded-t-3xl flex items-center justify-between text-white ${bgGradient}`}>
      <div className="flex items-center gap-2">
        <div className="p-1.5 rounded-xl bg-white/20 backdrop-blur-sm">{icon}</div>
        <span className="text-xs font-black tracking-wide uppercase">{title}</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setAspectMode(aspectMode === 'portrait' ? 'standard' : 'portrait')}
          title="Toggle Aspect Ratio"
          className="p-1.5 rounded-xl bg-white/15 hover:bg-white/30 text-white transition-all text-[11px] font-bold flex items-center gap-1"
        >
          {aspectMode === 'portrait' ? (
            <>
              <Maximize2 className="w-3 h-3" />
              <span className="hidden sm:inline">9:16 Reel</span>
            </>
          ) : (
            <>
              <Minimize2 className="w-3 h-3" />
              <span className="hidden sm:inline">16:9 Wide</span>
            </>
          )}
        </button>
        <a
          href={embedUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-2.5 py-1 rounded-xl bg-white/20 hover:bg-white/35 text-[11px] font-extrabold flex items-center gap-1 transition-all"
        >
          <span>Open Link</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );

  // ===================== YOUTUBE PLAYER =====================
  if (ytInfo) {
    const isShortsPortrait = (ytInfo.isShort && aspectMode === 'portrait') || aspectMode === 'portrait';
    return (
      <div className="w-full rounded-3xl overflow-hidden shadow-xl border border-gray-200 bg-slate-950">
        {renderHeader(
          ytInfo.isShort ? 'YouTube Shorts' : 'YouTube Video',
          <Youtube className="w-4 h-4 text-red-400" />,
          'bg-gradient-to-r from-red-600 to-rose-700'
        )}
        <div className="flex justify-center bg-black">
          <div
            className={`relative w-full ${
              isShortsPortrait ? 'max-w-[340px] aspect-[9/16] min-h-[480px]' : 'aspect-video'
            }`}
          >
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${ytInfo.id}?autoplay=0&rel=0&modestbranding=1`}
              title="YouTube Video Player"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    );
  }

  // ===================== INSTAGRAM REEL PLAYER =====================
  if (igInfo && igInfo.id) {
    return (
      <div className="w-full rounded-3xl overflow-hidden shadow-xl border border-pink-100 bg-slate-950">
        {renderHeader(
          'Instagram Reel (No Login Required)',
          <Instagram className="w-4 h-4 text-pink-300" />,
          'bg-gradient-to-r from-pink-600 via-purple-600 to-amber-600'
        )}
        <div className="flex justify-center bg-slate-900/60 p-2 sm:p-4">
          <div className="relative w-full max-w-[360px] h-[520px] rounded-2xl overflow-hidden bg-white shadow-inner">
            <iframe
              src={`${igInfo.embedUrl}/?utm_source=ig_embed&amp;utm_campaign=loading`}
              title="Instagram Reel Preview"
              className="w-full h-full border-0"
              allowFullScreen
              scrolling="no"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    );
  }

  // ===================== FACEBOOK REEL / VIDEO PLAYER =====================
  if (fbInfo) {
    return (
      <div className="w-full rounded-3xl overflow-hidden shadow-xl border border-industrial-100 bg-slate-950">
        {renderHeader(
          fbInfo.isReel ? 'Facebook Reel' : 'Facebook Video',
          <Facebook className="w-4 h-4 text-blue-300" />,
          'bg-gradient-to-r from-blue-700 to-indigo-800'
        )}
        <div className="flex justify-center bg-black/90 p-2 sm:p-4">
          <div
            className={`relative w-full ${
              fbInfo.isReel && aspectMode === 'portrait'
                ? 'max-w-[360px] h-[520px]'
                : 'aspect-video max-w-2xl'
            } rounded-2xl overflow-hidden bg-black shadow-inner`}
          >
            <iframe
              src={fbInfo.embedUrl}
              title="Facebook Video Player"
              className="w-full h-full border-0"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    );
  }

  // ===================== DIRECT HTML5 VIDEO =====================
  if (directVideo) {
    return (
      <div className="w-full rounded-3xl overflow-hidden shadow-xl border border-gray-200 bg-slate-950">
        {renderHeader(
          'Industrial Video Player',
          <Video className="w-4 h-4 text-emerald-400" />,
          'bg-gradient-to-r from-emerald-700 to-teal-800'
        )}
        <div className="flex justify-center bg-black">
          <video
            controls
            playsInline
            preload="metadata"
            className={`w-full ${
              aspectMode === 'portrait' ? 'max-w-[340px] aspect-[9/16] object-cover' : 'aspect-video object-contain'
            }`}
            src={embedUrl}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    );
  }

  // ===================== GOOGLE DRIVE VIDEO =====================
  if (driveId) {
    return (
      <div className="w-full rounded-3xl overflow-hidden shadow-xl border border-gray-200 bg-slate-950">
        {renderHeader(
          'Google Drive Video',
          <Play className="w-4 h-4 text-amber-400" />,
          'bg-gradient-to-r from-slate-800 to-industrial-900'
        )}
        <div className="flex justify-center bg-black">
          <div className="relative w-full aspect-video">
            <iframe
              src={`https://drive.google.com/file/d/${driveId}/preview`}
              title="Google Drive Video Player"
              className="w-full h-full border-0"
              allow="autoplay"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    );
  }

  // ===================== FALLBACK MEDIA CARD =====================
  return (
    <div className="p-5 bg-gradient-to-r from-slate-900 to-industrial-950 text-white rounded-3xl flex items-center justify-between gap-4 border border-slate-800 shadow-md">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-11 h-11 rounded-2xl bg-industrial-600 flex items-center justify-center text-white shrink-0 shadow-md">
          <Play className="w-5 h-5 fill-white" />
        </div>
        <div className="min-w-0">
          <span className="text-xs text-industrial-400 font-extrabold uppercase block">Media Video Link</span>
          <span className="text-sm font-bold truncate block text-slate-200">{embedUrl}</span>
        </div>
      </div>
      <a
        href={embedUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2.5 bg-industrial-600 hover:bg-industrial-500 text-white text-xs font-extrabold rounded-2xl flex items-center gap-1.5 shrink-0 transition-all shadow-md"
      >
        <span>Open Media</span>
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>
  );
};
