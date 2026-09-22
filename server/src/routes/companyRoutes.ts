import { Router } from 'express';
import { protect, authorize } from '../middleware/auth';
import {
  getCompanyDashboard,
  createJob,
  getCompanyJobs,
  getJobApplicants,
  updateApplicationStatus,
  searchWorkersForCompany,
} from '../controllers/companyController';

const router = Router();

router.use(protect);
router.use(authorize('company'));

router.get('/dashboard', getCompanyDashboard);
router.post('/jobs', createJob);
router.get('/jobs', getCompanyJobs);
router.get('/jobs/:jobId/applicants', getJobApplicants);
router.put('/applications/:id/status', updateApplicationStatus);
router.get('/workers', searchWorkersForCompany);

export default router;
