import mongoose, { Schema, Document } from 'mongoose';

export interface IJob extends Document {
  companyId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  industry: string;
  skillRequired: string;
  experience: {
    min: number;
    max: number;
  };
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  location: {
    city: string;
    state: string;
  };
  vacancies: number;
  jobType: 'contract' | 'permanent' | 'temporary';
  immediateJoining: boolean;
  status: 'active' | 'closed' | 'draft';
  applicantsCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const JobSchema: Schema = new Schema(
  {
    companyId: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
    title: { type: String, required: true, index: true },
    description: { type: String, required: true },
    industry: { type: String, required: true, index: true },
    skillRequired: { type: String, required: true, index: true },
    experience: {
      min: { type: Number, default: 0 },
      max: { type: Number, default: 10 },
    },
    salary: {
      min: { type: Number, default: 0 },
      max: { type: Number, default: 0 },
      currency: { type: String, default: 'INR' },
    },
    location: {
      city: { type: String, required: true, index: true },
      state: { type: String, required: true },
    },
    vacancies: { type: Number, default: 1 },
    jobType: { type: String, enum: ['contract', 'permanent', 'temporary'], default: 'contract' },
    immediateJoining: { type: Boolean, default: false },
    status: { type: String, enum: ['active', 'closed', 'draft'], default: 'active' },
    applicantsCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IJob>('Job', JobSchema);
