import { Request, Response } from 'express';
import User from '../models/User';
import Worker from '../models/Worker';
import Company from '../models/Company';
import { generateToken } from '../utils/jwt';
import { AuthRequest } from '../middleware/auth';

// @desc    Login User (Phone + DOB)
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { phone, dob } = req.body;

    if (!phone || !dob) {
      res.status(400).json({ success: false, message: 'Please provide phone number and date of birth' });
      return;
    }

    const inputDob = new Date(dob);

    const user = await User.findOne({ phone });
    if (!user) {
      res.status(404).json({ success: false, message: 'User not registered with this phone number' });
      return;
    }

    // Verify DOB matches (day, month, year)
    const userDob = new Date(user.dob);
    if (
      userDob.getFullYear() !== inputDob.getFullYear() ||
      userDob.getMonth() !== inputDob.getMonth() ||
      userDob.getDate() !== inputDob.getDate()
    ) {
      res.status(401).json({ success: false, message: 'Date of Birth does not match' });
      return;
    }

    user.lastLogin = new Date();
    await user.save();

    let profile = null;
    if (user.role === 'worker') {
      profile = await Worker.findOne({ userId: user._id });
    } else if (user.role === 'company') {
      profile = await Company.findOne({ userId: user._id });
    }

    const token = generateToken(user._id.toString(), user.role);

    res.status(200).json({
      success: true,
      token,
      user: {
        _id: user._id,
        phone: user.phone,
        name: user.name,
        role: user.role,
        photo: user.photo,
        gender: user.gender,
        language: user.language,
        isVerified: user.isVerified,
      },
      profile,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// @desc    Register Worker
// @route   POST /api/auth/register-worker
// @access  Public
export const registerWorker = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      phone,
      dob,
      name,
      photo,
      gender,
      aadhaar,
      address,
      district,
      state,
      pinCode,
      primarySkill,
      secondarySkill,
      experienceYears,
      currentCompany,
      expectedSalary,
      availability,
    } = req.body;

    // Check existing
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      res.status(400).json({ success: false, message: 'Phone number already registered. Please login.' });
      return;
    }

    const user = await User.create({
      phone,
      dob: new Date(dob),
      name,
      photo: photo || '',
      gender: gender || 'male',
      aadhaar: aadhaar || '',
      role: 'worker',
      address: {
        line: address || '',
        district: district || '',
        state: state || '',
        pinCode: pinCode || '',
      },
    });

    const worker = await Worker.create({
      userId: user._id,
      primarySkill: primarySkill || 'General Helper',
      secondarySkill: secondarySkill || '',
      totalExperience: Number(experienceYears) || 0,
      currentCompany: currentCompany || '',
      expectedSalary: Number(expectedSalary) || 0,
      availability: availability || 'immediate',
      profileCompletion: 65,
    });

    const token = generateToken(user._id.toString(), 'worker');

    res.status(201).json({
      success: true,
      token,
      user: {
        _id: user._id,
        phone: user.phone,
        name: user.name,
        role: user.role,
        photo: user.photo,
        gender: user.gender,
        language: user.language,
      },
      profile: worker,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// @desc    Register Company
// @route   POST /api/auth/register-company
// @access  Public
export const registerCompany = async (req: Request, res: Response): Promise<void> => {
  try {
    const { phone, dob, name, companyName, industry, description, logo, gst, address, city, state, pinCode, contactPerson, contactEmail } = req.body;

    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      res.status(400).json({ success: false, message: 'Phone number already registered' });
      return;
    }

    const user = await User.create({
      phone,
      dob: new Date(dob || '1990-01-01'),
      name: name || contactPerson,
      role: 'company',
      address: { line: address, district: city, state, pinCode },
    });

    const company = await Company.create({
      userId: user._id,
      companyName,
      industry: industry || 'Mechanical Industries',
      description: description || '',
      logo: logo || '',
      gst: gst || '',
      address: { line: address, city, state, pinCode },
      contactPerson,
      contactEmail,
    });

    const token = generateToken(user._id.toString(), 'company');

    res.status(201).json({
      success: true,
      token,
      user,
      profile: company,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// @desc    Get Current User Profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = req.user;
    let profile = null;

    if (user.role === 'worker') {
      profile = await Worker.findOne({ userId: user._id });
    } else if (user.role === 'company') {
      profile = await Company.findOne({ userId: user._id });
    }

    res.status(200).json({
      success: true,
      user,
      profile,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};
