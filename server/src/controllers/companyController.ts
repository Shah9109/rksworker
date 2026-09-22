import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import Company from '../models/Company';
import Job from '../models/Job';
import Application from '../models/Application';
import Worker from '../models/Worker';

// @desc    Get Company Dashboard Stats
// @route   GET /api/company/dashboard
// @access  Private (Company)
export const getCompanyDashboard = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const company = await Company.findOne({ userId: req.user._id });
    if (!company) {
      res.status(404).json({ success: false, message: 'Company profile not found' });
      return;
    }

    const activeJobsCount = await Job.countDocuments({ companyId: company._id, status: 'active' });
    const totalJobsCount = await Job.countDocuments({ companyId: company._id });
    const totalApplicantsCount = await Application.countDocuments({ companyId: company._id });
    const shortlistedCount = await Application.countDocuments({ companyId: company._id, status: 'shortlisted' });

    const recentApplications = await Application.find({ companyId: company._id })
      .populate('workerId')
      .populate('jobId', 'title')
      .limit(5)
      .sort({ createdAt: -1 });

    const activeJobs = await Job.find({ companyId: company._id, status: 'active' }).limit(5);

    res.status(200).json({
      success: true,
      company,
      stats: {
        activeJobs: activeJobsCount,
        totalJobs: totalJobsCount,
        totalApplicants: totalApplicantsCount,
        shortlistedCount,
        bookmarkedWorkers: company.bookmarkedWorkers.length,
      },
      recentApplications,
      activeJobs,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// @desc    Create Job Posting
// @route   POST /api/company/jobs
// @access  Private (Company)
export const createJob = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const company = await Company.findOne({ userId: req.user._id });
    if (!company) {
      res.status(404).json({ success: false, message: 'Company profile not found' });
      return;
    }

    const { title, description, industry, skillRequired, expMin, expMax, salaryMin, salaryMax, city, state, vacancies, jobType, immediateJoining } = req.body;

    const job = await Job.create({
      companyId: company._id,
      title,
      description,
      industry: industry || company.industry,
      skillRequired,
      experience: { min: Number(expMin) || 0, max: Number(expMax) || 5 },
      salary: { min: Number(salaryMin) || 0, max: Number(salaryMax) || 0, currency: 'INR' },
      location: { city, state },
      vacancies: Number(vacancies) || 1,
      jobType: jobType || 'contract',
      immediateJoining: immediateJoining || false,
      status: 'active',
    });

    res.status(201).json({ success: true, job });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// @desc    Get All Jobs Posted by Company
// @route   GET /api/company/jobs
// @access  Private (Company)
export const getCompanyJobs = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const company = await Company.findOne({ userId: req.user._id });
    if (!company) {
      res.status(404).json({ success: false, message: 'Company profile not found' });
      return;
    }

    const jobs = await Job.find({ companyId: company._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// @desc    Get Applicants for a Specific Job
// @route   GET /api/company/jobs/:jobId/applicants
// @access  Private (Company)
export const getJobApplicants = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const applications = await Application.find({ jobId: req.params.jobId })
      .populate({
        path: 'workerId',
        populate: { path: 'userId', select: 'name phone photo address gender' },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, applications });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// @desc    Update Application Status (Approve / Reject / Shortlist)
// @route   PUT /api/company/applications/:id/status
// @access  Private (Company)
export const updateApplicationStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { status, notes } = req.body;
    const application = await Application.findById(req.params.id);

    if (!application) {
      res.status(404).json({ success: false, message: 'Application not found' });
      return;
    }

    application.status = status;
    if (notes) application.notes = notes;
    await application.save();

    res.status(200).json({ success: true, application });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// @desc    Search Worker Directory for Companies
// @route   GET /api/company/workers
// @access  Private (Company)
export const searchWorkersForCompany = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { search, skill, experience, availability } = req.query;
    const query: any = {};

    if (skill) {
      query.primarySkill = { $regex: skill, $options: 'i' };
    }

    if (availability) {
      query.availability = availability;
    }

    const workers = await Worker.find(query)
      .populate('userId', 'name phone photo address gender isVerified')
      .limit(20);

    res.status(200).json({ success: true, workers });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};
