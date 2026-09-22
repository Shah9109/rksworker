import { Router } from 'express';
import { protect, authorize } from '../middleware/auth';
import { upload } from '../middleware/upload';
import {
  getWorkerDashboard,
  updateWorkerProfile,
  uploadWorkerDocument,
  deleteWorkerDocument,
  addWorkerSkill,
  addWorkerExperience,
  getMyApplications,
} from '../controllers/workerController';

const router = Router();

router.use(protect);
router.use(authorize('worker'));

router.get('/dashboard', getWorkerDashboard);
router.put('/profile', updateWorkerProfile);
router.post('/documents', upload.single('file'), uploadWorkerDocument);
router.delete('/documents/:docId', deleteWorkerDocument);
router.post('/skills', addWorkerSkill);
router.post('/experience', addWorkerExperience);
router.get('/applications', getMyApplications);

export default router;
