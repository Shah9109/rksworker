import { Router } from 'express';
import { getJobs, getJobById, applyForJob, saveJob } from '../controllers/jobController';
import { protect, authorize } from '../middleware/auth';

const router = Router();

router.get('/', getJobs);
router.get('/:id', getJobById);
router.post('/:id/apply', protect, authorize('worker'), applyForJob);
router.post('/:id/save', protect, authorize('worker'), saveJob);

export default router;
