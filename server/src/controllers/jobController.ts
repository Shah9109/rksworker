import { Request, Response } from 'express';
import Job from '../models/Job';
import Application from '../models/Application';
import Worker from '../models/Worker';
import { AuthRequest } from '../middleware/auth';

// @desc    Search and Filter Jobs
// @route   GET /api/jobs
// @access  Public
export const getJobs = async (req: Request, res: Response): Promise<void> => {
  try {
    const { search, location, skill, industry, exp, immediate, page = 1, limit = 10 } = req.query;
    const query: any = { status: 'active' };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { skillRequired: { $regex: search, $options: 'i' } },
      ];
    }

    if (location) {
      query['location.city'] = { $regex: location, $options: 'i' };
    }

    if (skill) {
      query.skillRequired = { $regex: skill, $options: 'i' };
    }

    if (industry) {
      query.industry = { $regex: industry, $options: 'i' };
    }

    if (immediate === 'true') {
      query.immediateJoining = true;
    }

    const total = await Job.countDocuments(query);
    const jobs = await Job.find(query)
      .populate('companyId', 'companyName logo industry address')
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      count: jobs.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      jobs,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// @desc    Get Single Job Detail
// @route   GET /api/jobs/:id
// @access  Public
export const getJobById = async (req: Request, res: Response): Promise<void> => {
  try {
    const job = await Job.findById(req.params.id).populate('companyId');
    if (!job) {
      res.status(404).json({ success: false, message: 'Job posting not found' });
      return;
    }

    res.status(200).json({ success: true, job });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// @desc    Apply for Job
// @route   POST /api/jobs/:id/apply
// @access  Private (Worker)
export const applyForJob = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const jobId = req.params.id;
    const worker = await Worker.findOne({ userId: req.user._id });
    if (!worker) {
      res.status(404).json({ success: false, message: 'Worker profile not found' });
      return;
    }

    const job = await Job.findById(jobId);
    if (!job) {
      res.status(404).json({ success: false, message: 'Job not found' });
      return;
    }

    // Check existing application
    const existing = await Application.findOne({ jobId, workerId: worker._id });
    if (existing) {
      res.status(400).json({ success: false, message: 'You have already applied for this job' });
      return;
    }

    const application = await Application.create({
      jobId: job._id,
      workerId: worker._id,
      companyId: job.companyId,
      status: 'applied',
    });

    // Increment applicants count
    job.applicantsCount += 1;
    await job.save();

    res.status(201).json({ success: true, application });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// @desc    Save / Bookmark Job
// @route   POST /api/jobs/:id/save
// @access  Private (Worker)
export const saveJob = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const jobId = req.params.id as any;
    const worker = await Worker.findOne({ userId: req.user._id });
    if (!worker) {
      res.status(404).json({ success: false, message: 'Worker profile not found' });
      return;
    }

    const index = worker.savedJobs.indexOf(jobId);
    if (index > -1) {
      worker.savedJobs.splice(index, 1);
    } else {
      worker.savedJobs.push(jobId);
    }

    await worker.save();
    res.status(200).json({ success: true, savedJobs: worker.savedJobs });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};
