import mongoose, { Schema, Document } from 'mongoose';

export interface IApplication extends Document {
  jobId: mongoose.Types.ObjectId;
  workerId: mongoose.Types.ObjectId;
  companyId: mongoose.Types.ObjectId;
  status: 'applied' | 'viewed' | 'shortlisted' | 'approved' | 'rejected';
  appliedAt: Date;
  updatedAt: Date;
  notes?: string;
}

const ApplicationSchema: Schema = new Schema(
  {
    jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
    workerId: { type: Schema.Types.ObjectId, ref: 'Worker', required: true },
    companyId: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
    status: {
      type: String,
      enum: ['applied', 'viewed', 'shortlisted', 'approved', 'rejected'],
      default: 'applied',
    },
    appliedAt: { type: Date, default: Date.now },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

// Compound index to prevent duplicate applications for the same job by the same worker
ApplicationSchema.index({ jobId: 1, workerId: 1 }, { unique: true });

export default mongoose.model<IApplication>('Application', ApplicationSchema);
