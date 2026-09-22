import { Router } from 'express';
import { loginUser, registerWorker, registerCompany, getMe } from '../controllers/authController';
import { protect } from '../middleware/auth';

const router = Router();

router.post('/login', loginUser);
router.post('/register-worker', registerWorker);
router.post('/register-company', registerCompany);
router.get('/me', protect, getMe);

export default router;
