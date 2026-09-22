import { Request, Response } from 'express';
import Post from '../models/Post';
import Comment from '../models/Comment';
import { AuthRequest } from '../middleware/auth';

// @desc    Get Social Feed Posts
// @route   GET /api/posts
// @access  Public
export const getPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { type, category, sort = 'latest', page = 1, limit = 10 } = req.query;
    const query: any = {};

    if (type) query.type = type;
    if (category) query.category = category;

    let sortOption: any = { createdAt: -1 };
    if (sort === 'trending') sortOption = { isTrending: -1, likes: -1 };
    if (sort === 'popular') sortOption = { commentsCount: -1, likes: -1 };

    const posts = await Post.find(query)
      .sort(sortOption)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const total = await Post.countDocuments(query);

    res.status(200).json({
      success: true,
      count: posts.length,
      total,
      page: Number(page),
      posts,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// @desc    Create Social Feed Post
// @route   POST /api/posts
// @access  Private (Admin / Authorized Users)
export const createPost = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { type, content, media, embedUrl, category, isTrending } = req.body;
    const user = req.user;

    const post = await Post.create({
      authorId: user._id,
      authorName: user.name,
      authorRole: user.role,
      type: type || 'news',
      content,
      media: media || [],
      embedUrl: embedUrl || '',
      category: category || 'General',
      isTrending: isTrending || false,
    });

    res.status(201).json({ success: true, post });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// @desc    Like / Unlike Post
// @route   POST /api/posts/:id/like
// @access  Private
export const toggleLikePost = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;

    const post = await Post.findById(postId);
    if (!post) {
      res.status(404).json({ success: false, message: 'Post not found' });
      return;
    }

    const index = post.likes.indexOf(userId as any);
    if (index > -1) {
      post.likes.splice(index, 1);
    } else {
      post.likes.push(userId as any);
    }

    await post.save();
    res.status(200).json({ success: true, likesCount: post.likes.length, isLiked: index === -1 });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// @desc    Add Comment to Post
// @route   POST /api/posts/:id/comment
// @access  Private
export const addComment = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404).json({ success: false, message: 'Post not found' });
      return;
    }

    const comment = await Comment.create({
      postId: post._id,
      userId: req.user._id,
      userName: req.user.name,
      userPhoto: req.user.photo || '',
      text,
    });

    post.commentsCount += 1;
    await post.save();

    res.status(201).json({ success: true, comment });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// @desc    Get Post Comments
// @route   GET /api/posts/:id/comments
// @access  Public
export const getComments = async (req: Request, res: Response): Promise<void> => {
  try {
    const comments = await Comment.find({ postId: req.params.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, comments });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};
