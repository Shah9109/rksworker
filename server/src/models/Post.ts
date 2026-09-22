import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
  authorId: mongoose.Types.ObjectId;
  authorName: string;
  authorRole: string;
  type: 'image' | 'video' | 'news' | 'job' | 'announcement';
  content: string;
  media?: Array<{ url: string; type: string }>;
  embedUrl?: string;
  likes: mongoose.Types.ObjectId[];
  commentsCount: number;
  shares: number;
  category: string;
  isTrending: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema: Schema = new Schema(
  {
    authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    authorName: { type: String, required: true },
    authorRole: { type: String, default: 'admin' },
    type: {
      type: String,
      enum: ['image', 'video', 'news', 'job', 'announcement'],
      default: 'news',
    },
    content: { type: String, required: true },
    media: [{ url: String, type: { type: String } }],
    embedUrl: { type: String, default: '' },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    commentsCount: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    category: { type: String, default: 'General' },
    isTrending: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<IPost>('Post', PostSchema);
