import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import Worker from '../models/Worker';
import User from '../models/User';
import Job from '../models/Job';
import Application from '../models/Application';
import Attendance from '../models/Attendance';

// Helper to calculate profile completion %
const calculateProfileCompletion = (user: any, worker: any): number => {
  let score = 20; // Base phone + DOB
  if (user.name) score += 10;
  if (user.photo) score += 10;
  if (user.aadhaar) score += 10;
  if (user.address?.district) score += 10;
  if (worker.primarySkill) score += 10;
  if (worker.experience && worker.experience.length > 0) score += 10;
  if (worker.documents && worker.documents.length > 0) score += 20;
  return Math.min(score, 100);
};

// @desc    Get Worker Dashboard Summary
// @route   GET /api/worker/dashboard
// @access  Private (Worker)
export const getWorkerDashboard = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = req.user;
    const worker = await Worker.findOne({ userId: user._id });

    if (!worker) {
      res.status(404).json({ success: false, message: 'Worker profile not found' });
      return;
    }

    // Calculate completion
    const completion = calculateProfileCompletion(user, worker);
    worker.profileCompletion = completion;
    await worker.save();

    // Stats counts
    const docsCount = worker.documents.length;
    const applicationsCount = await Application.countDocuments({ workerId: worker._id });
    
    // Latest matching jobs by primary skill
    const matchingJobs = await Job.find({
      status: 'active',
      skillRequired: { $regex: worker.primarySkill.split(' ')[0], $options: 'i' },
    })
      .populate('companyId', 'companyName logo industry address')
      .limit(4)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      profileCompletion: completion,
      stats: {
        documentsUploaded: docsCount,
        appliedJobs: applicationsCount,
        savedJobs: worker.savedJobs.length,
      },
      worker,
      matchingJobs,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// @desc    Update Worker Profile
// @route   PUT /api/worker/profile
// @access  Private (Worker)
export const updateWorkerProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = req.user;
    const { name, photo, gender, aadhaar, address, district, state, pinCode, primarySkill, secondarySkill, totalExperience, currentCompany, expectedSalary, availability } = req.body;

    // Update User
    if (name) user.name = name;
    if (photo) user.photo = photo;
    if (gender) user.gender = gender;
    if (aadhaar) user.aadhaar = aadhaar;
    if (address || district || state || pinCode) {
      user.address = {
        line: address || user.address?.line,
        district: district || user.address?.district,
        state: state || user.address?.state,
        pinCode: pinCode || user.address?.pinCode,
      };
    }
    await user.save();

    // Update Worker
    const worker = await Worker.findOne({ userId: user._id });
    if (!worker) {
      res.status(404).json({ success: false, message: 'Worker profile not found' });
      return;
    }

    if (primarySkill) worker.primarySkill = primarySkill;
    if (secondarySkill !== undefined) worker.secondarySkill = secondarySkill;
    if (totalExperience !== undefined) worker.totalExperience = Number(totalExperience);
    if (currentCompany !== undefined) worker.currentCompany = currentCompany;
    if (expectedSalary !== undefined) worker.expectedSalary = Number(expectedSalary);
    if (availability) worker.availability = availability;

    worker.profileCompletion = calculateProfileCompletion(user, worker);
    await worker.save();

    res.status(200).json({
      success: true,
      user,
      worker,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// @desc    Upload Worker Document
// @route   POST /api/worker/documents
// @access  Private (Worker)
export const uploadWorkerDocument = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const worker = await Worker.findOne({ userId: req.user._id });
    if (!worker) {
      res.status(404).json({ success: false, message: 'Worker profile not found' });
      return;
    }

    const { type, name, url } = req.body;
    let docUrl = url;

    if (req.file) {
      docUrl = `/uploads/${req.file.filename}`;
    }

    if (!docUrl || !type) {
      res.status(400).json({ success: false, message: 'Please provide document type and file' });
      return;
    }

    const newDoc = {
      type,
      name: name || `${type.toUpperCase()} Document`,
      url: docUrl,
      isVerified: false,
      uploadedAt: new Date(),
    };

    worker.documents.push(newDoc as any);
    worker.profileCompletion = calculateProfileCompletion(req.user, worker);
    await worker.save();

    res.status(201).json({
      success: true,
      documents: worker.documents,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// @desc    Delete Worker Document
// @route   DELETE /api/worker/documents/:docId
// @access  Private (Worker)
export const deleteWorkerDocument = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const worker = await Worker.findOne({ userId: req.user._id });
    if (!worker) {
      res.status(404).json({ success: false, message: 'Worker profile not found' });
      return;
    }

    worker.documents = worker.documents.filter((d: any) => d._id.toString() !== req.params.docId);
    worker.profileCompletion = calculateProfileCompletion(req.user, worker);
    await worker.save();

    res.status(200).json({
      success: true,
      documents: worker.documents,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// @desc    Add / Update Skills
// @route   POST /api/worker/skills
// @access  Private (Worker)
export const addWorkerSkill = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const worker = await Worker.findOne({ userId: req.user._id });
    if (!worker) {
      res.status(404).json({ success: false, message: 'Worker profile not found' });
      return;
    }

    const { name, level } = req.body;
    if (!name) {
      res.status(400).json({ success: false, message: 'Skill name required' });
      return;
    }

    worker.skills.push({ name, level: level || 'intermediate' });
    await worker.save();

    res.status(200).json({ success: true, skills: worker.skills });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// @desc    Add Experience Entry
// @route   POST /api/worker/experience
// @access  Private (Worker)
export const addWorkerExperience = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const worker = await Worker.findOne({ userId: req.user._id });
    if (!worker) {
      res.status(404).json({ success: false, message: 'Worker profile not found' });
      return;
    }

    const { companyName, duration, project, location, salary } = req.body;
    worker.experience.push({
      companyName,
      duration,
      project: project || '',
      location: location || '',
      salary: Number(salary) || 0,
    });

    worker.profileCompletion = calculateProfileCompletion(req.user, worker);
    await worker.save();

    res.status(200).json({ success: true, experience: worker.experience });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// @desc    Get Applied Jobs Tracking
// @route   GET /api/worker/applications
// @access  Private (Worker)
export const getMyApplications = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const worker = await Worker.findOne({ userId: req.user._id });
    if (!worker) {
      res.status(404).json({ success: false, message: 'Worker profile not found' });
      return;
    }

    const applications = await Application.find({ workerId: worker._id })
      .populate({
        path: 'jobId',
        populate: { path: 'companyId', select: 'companyName logo industry address' },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, applications });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// @desc    Worker Attendance Check-In with GPS
// @route   POST /api/worker/attendance/checkin
// @access  Private (Worker)
export const checkInAttendance = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { lat, lng } = req.body;
    const worker = await Worker.findOne({ userId: req.user._id });
    if (!worker) {
      res.status(404).json({ success: false, message: 'Worker profile not found' });
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    const attendance = await Attendance.create({
      workerId: worker._id,
      date: today,
      checkIn: new Date(),
      gps: { lat: lat || 0, lng: lng || 0 },
      status: 'present',
    });

    res.status(201).json({ success: true, attendance });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};
