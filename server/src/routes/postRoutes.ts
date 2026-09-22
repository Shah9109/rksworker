import { Router } from 'express';
import { getPosts, createPost, toggleLikePost, addComment, getComments } from '../controllers/postController';
import { protect } from '../middleware/auth';

const router = Router();

router.get('/', getPosts);
router.post('/', protect, createPost);
router.post('/:id/like', protect, toggleLikePost);
router.post('/:id/comment', protect, addComment);
router.get('/:id/comments', getComments);

export default router;
