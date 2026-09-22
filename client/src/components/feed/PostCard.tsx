import React, { useState } from 'react';
import { Heart, MessageSquare, Share2, Bookmark, ShieldCheck, Send } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { MediaEmbed } from './MediaEmbed';
import { useUIStore } from '../../store/uiStore';
import API from '../../config/api';

interface PostCardProps {
  post: any;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { language } = useUIStore();

  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes?.length || 42);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<any[]>([
    { id: '1', userName: 'रमेश कुमार', text: 'बहुत बढ़िया अवसर! मैंने आवेदन कर दिया है।' },
    { id: '2', userName: 'विक्रम यादव', text: 'IBR सर्टिफिकेट टेस्ट की तारीख क्या है?' },
  ]);
  const [commentText, setCommentText] = useState('');

  const handleLike = async () => {
    setLiked(!liked);
    setLikesCount((prev: number) => (liked ? prev - 1 : prev + 1));
    try {
      await API.post(`/posts/${post._id}/like`);
    } catch (err) {}
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText) return;
    setComments((prev) => [...prev, { id: Date.now().toString(), userName: 'You', text: commentText }]);
    setCommentText('');
  };

  return (
    <Card className="p-6 space-y-4 bg-white border border-gray-200">
      {/* Author Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-industrial-600 text-white font-bold flex items-center justify-center text-sm shadow-md">
            {post.authorName ? post.authorName.charAt(0) : 'A'}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="font-bold text-sm text-slate-900">{post.authorName || 'WorkPower Official'}</h4>
              <ShieldCheck className="w-4 h-4 text-industrial-600" />
            </div>
            <span className="text-[11px] text-gray-500 font-medium">
              {post.category} • {new Date(post.createdAt || Date.now()).toLocaleDateString()}
            </span>
          </div>
        </div>

        <Badge variant={post.type === 'video' ? 'red' : 'blue'}>
          {post.type.toUpperCase()}
        </Badge>
      </div>

      {/* Content Text */}
      <p className="text-sm text-slate-800 leading-relaxed font-medium">{post.content}</p>

      {/* Embed / Media Section */}
      {post.embedUrl && <MediaEmbed embedUrl={post.embedUrl} />}

      {/* Post Actions Bar */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs font-bold text-gray-600">
        <div className="flex items-center gap-4">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 transition-all ${
              liked ? 'text-red-500' : 'hover:text-red-500'
            }`}
          >
            <Heart className={`w-4 h-4 ${liked ? 'fill-red-500' : ''}`} />
            <span>{likesCount}</span>
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1.5 hover:text-industrial-600 transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{comments.length} Comments</span>
          </button>

          <button className="flex items-center gap-1.5 hover:text-industrial-600 transition-all">
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>

        <button className="text-gray-400 hover:text-industrial-600">
          <Bookmark className="w-4 h-4" />
        </button>
      </div>

      {/* Comments Drawer */}
      {showComments && (
        <div className="pt-4 border-t border-gray-100 space-y-3 bg-slate-50 p-4 rounded-2xl">
          <div className="space-y-2">
            {comments.map((c) => (
              <div key={c.id} className="text-xs bg-white p-2.5 rounded-xl border border-gray-200">
                <span className="font-bold text-slate-900 block">{c.userName}</span>
                <span className="text-gray-700 mt-0.5 block">{c.text}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleAddComment} className="flex gap-2 pt-1">
            <input
              type="text"
              placeholder="टिप्पणी लिखें (Write a comment)..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="flex-1 bg-white border border-gray-300 rounded-xl px-3 py-1.5 text-xs outline-none"
            />
            <button type="submit" className="p-2 bg-industrial-600 text-white rounded-xl">
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </Card>
  );
};
