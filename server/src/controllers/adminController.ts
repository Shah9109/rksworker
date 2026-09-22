import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import User from '../models/User';
import Worker from '../models/Worker';
import Company from '../models/Company';
import Job from '../models/Job';
import Application from '../models/Application';

// @desc    Get Admin Overview Stats
// @route   GET /api/admin/stats
// @access  Private (Admin)
export const getAdminStats = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const totalWorkers = await Worker.countDocuments();
    const totalCompanies = await Company.countDocuments();
    const totalJobs = await Job.countDocuments();
    const totalApplications = await Application.countDocuments();
    const pendingVerifications = await Worker.countDocuments({ isProfileVerified: false });

    res.status(200).json({
      success: true,
      stats: {
        totalWorkers,
        totalCompanies,
        totalJobs,
        totalApplications,
        pendingVerifications,
        revenue: 145000, // Estimated platform earnings
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// @desc    Get Unverified Workers List
// @route   GET /api/admin/workers/unverified
// @access  Private (Admin)
export const getUnverifiedWorkers = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const workers = await Worker.find({ isProfileVerified: false })
      .populate('userId')
      .limit(20);

    res.status(200).json({ success: true, workers });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// @desc    Approve / Verify Worker Profile
// @route   PUT /api/admin/workers/:id/verify
// @access  Private (Admin)
export const verifyWorkerProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { status } = req.body; // true or false
    const worker = await Worker.findById(req.params.id);

    if (!worker) {
      res.status(404).json({ success: false, message: 'Worker not found' });
      return;
    }

    worker.isProfileVerified = status;
    await worker.save();

    // Also update User isVerified
    await User.findByIdAndUpdate(worker.userId, { isVerified: status });

    res.status(200).json({ success: true, worker });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// @desc    Verify Worker Document
// @route   PUT /api/admin/documents/:docId/verify
// @access  Private (Admin)
export const verifyWorkerDocument = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { status, workerId } = req.body;
    const worker = await Worker.findById(workerId);

    if (!worker) {
      res.status(404).json({ success: false, message: 'Worker not found' });
      return;
    }

    const doc = worker.documents.find((d: any) => d._id.toString() === req.params.docId);
    if (doc) {
      doc.isVerified = status;
      await worker.save();
    }

    res.status(200).json({ success: true, documents: worker.documents });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};
