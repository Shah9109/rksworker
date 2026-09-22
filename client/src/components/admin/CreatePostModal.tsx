import React, { useState } from 'react';
import { PlusCircle, Video, Newspaper, Megaphone, Link as LinkIcon, X, CheckCircle } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useUIStore } from '../../store/uiStore';
import API from '../../config/api';

interface CreatePostModalProps {
  onClose: () => void;
  onPostCreated: (post: any) => void;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({ onClose, onPostCreated }) => {
  const { language } = useUIStore();
  const [content, setContent] = useState('');
  const [type, setType] = useState<'video' | 'news' | 'announcement' | 'job'>('video');
  const [embedUrl, setEmbedUrl] = useState('');
  const [category, setCategory] = useState('Trade Skill Tips');
  const [isTrending, setIsTrending] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) return;

    setLoading(true);
    const newPostData = {
      type,
      content,
      embedUrl,
      category,
      isTrending,
      authorName: 'WorkPower Admin',
      authorRole: 'admin',
      createdAt: new Date().toISOString(),
      likes: [],
      commentsCount: 0,
    };

    try {
      const res = await API.post('/posts', newPostData);
      if (res.data.success) {
        onPostCreated(res.data.post);
      } else {
        onPostCreated({ _id: Date.now().toString(), ...newPostData });
      }
    } catch (err) {
      onPostCreated({ _id: Date.now().toString(), ...newPostData });
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="clay-card max-w-xl w-full p-6 space-y-5 bg-white">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <PlusCircle className="w-6 h-6 text-industrial-600" />
            <h3 className="font-extrabold text-lg text-slate-900">Create Feed Post / Reel / Announcement</h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 rounded-xl">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-extrabold uppercase text-slate-600 block mb-1">Post Type</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setType('video')}
                className={`py-2 px-3 rounded-2xl text-xs font-extrabold border transition-all flex items-center justify-center gap-1.5 ${
                  type === 'video' ? 'clay-btn-primary' : 'clay-btn-secondary'
                }`}
              >
                <Video className="w-4 h-4" />
                <span>Video / Reel</span>
              </button>

              <button
                type="button"
                onClick={() => setType('announcement')}
                className={`py-2 px-3 rounded-2xl text-xs font-extrabold border transition-all flex items-center justify-center gap-1.5 ${
                  type === 'announcement' ? 'clay-btn-primary' : 'clay-btn-secondary'
                }`}
              >
                <Megaphone className="w-4 h-4" />
                <span>Notice Alert</span>
              </button>

              <button
                type="button"
                onClick={() => setType('news')}
                className={`py-2 px-3 rounded-2xl text-xs font-extrabold border transition-all flex items-center justify-center gap-1.5 ${
                  type === 'news' ? 'clay-btn-primary' : 'clay-btn-secondary'
                }`}
              >
                <Newspaper className="w-4 h-4" />
                <span>News Post</span>
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-extrabold uppercase text-slate-600 block mb-1">Post Message & Content</label>
            <textarea
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write post content or announcement notice for workers..."
              className="w-full clay-input p-3 text-sm outline-none font-medium text-slate-900"
              required
            ></textarea>
          </div>

          <Input
            label="Media Reel Link (Google Drive / Instagram / YouTube / Facebook)"
            placeholder="Paste URL: https://drive.google.com/file/... or https://youtube.com/shorts/..."
            value={embedUrl}
            onChange={(e) => setEmbedUrl(e.target.value)}
            icon={<LinkIcon className="w-4 h-4" />}
          />

          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
              <input
                type="checkbox"
                checked={isTrending}
                onChange={(e) => setIsTrending(e.target.checked)}
                className="w-4 h-4 text-industrial-600 rounded"
              />
              <span>📌 Feature as Important Notice Card (Horizontal Carousel)</span>
            </label>
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" isLoading={loading} className="font-extrabold px-6">
              Publish Post ✓
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
