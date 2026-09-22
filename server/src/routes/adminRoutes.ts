import { Router } from 'express';
import { protect, authorize } from '../middleware/auth';
import {
  getAdminStats,
  getUnverifiedWorkers,
  verifyWorkerProfile,
  verifyWorkerDocument,
} from '../controllers/adminController';

const router = Router();

router.use(protect);
router.use(authorize('admin'));

router.get('/stats', getAdminStats);
router.get('/workers/unverified', getUnverifiedWorkers);
router.put('/workers/:id/verify', verifyWorkerProfile);
router.put('/documents/:docId/verify', verifyWorkerDocument);

export default router;
