import mongoose, { Schema, Document } from 'mongoose';

export interface ISkill {
  name: string;
  level: 'beginner' | 'intermediate' | 'expert';
}

export interface IExperience {
  companyName: string;
  duration: string;
  project?: string;
  location?: string;
  salary?: number;
}

export interface IDocumentItem {
  _id?: string;
  type: 'aadhaar' | 'pan' | 'resume' | 'medical' | 'experience_letter' | 'certificate' | 'bank_passbook' | 'passport' | 'driving_licence';
  url: string;
  name: string;
  isVerified: boolean;
  uploadedAt: Date;
}

export interface IWorker extends Document {
  userId: mongoose.Types.ObjectId;
  primarySkill: string;
  secondarySkill?: string;
  skills: ISkill[];
  experience: IExperience[];
  totalExperience: number;
  currentCompany?: string;
  expectedSalary?: number;
  availability: 'immediate' | '15days' | '30days' | 'not_available';
  profileCompletion: number;
  documents: IDocumentItem[];
  savedJobs: mongoose.Types.ObjectId[];
  isProfileVerified: boolean;
  qrCode?: string;
  digitalId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const WorkerSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    primarySkill: { type: String, required: true, index: true },
    secondarySkill: { type: String, default: '' },
    skills: [
      {
        name: { type: String, required: true },
        level: { type: String, enum: ['beginner', 'intermediate', 'expert'], default: 'intermediate' },
      },
    ],
    experience: [
      {
        companyName: { type: String, required: true },
        duration: { type: String, required: true },
        project: { type: String, default: '' },
        location: { type: String, default: '' },
        salary: { type: Number, default: 0 },
      },
    ],
    totalExperience: { type: Number, default: 0 },
    currentCompany: { type: String, default: '' },
    expectedSalary: { type: Number, default: 0 },
    availability: {
      type: String,
      enum: ['immediate', '15days', '30days', 'not_available'],
      default: 'immediate',
    },
    profileCompletion: { type: Number, default: 50 },
    documents: [
      {
        type: {
          type: String,
          enum: ['aadhaar', 'pan', 'resume', 'medical', 'experience_letter', 'certificate', 'bank_passbook', 'passport', 'driving_licence'],
          required: true,
        },
        url: { type: String, required: true },
        name: { type: String, required: true },
        isVerified: { type: Boolean, default: false },
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
    savedJobs: [{ type: Schema.Types.ObjectId, ref: 'Job' }],
    isProfileVerified: { type: Boolean, default: false },
    qrCode: { type: String, default: '' },
    digitalId: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model<IWorker>('Worker', WorkerSchema);
