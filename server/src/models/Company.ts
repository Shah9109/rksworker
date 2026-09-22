import mongoose, { Schema, Document } from 'mongoose';

export interface ICompany extends Document {
  userId: mongoose.Types.ObjectId;
  companyName: string;
  industry: string;
  description?: string;
  logo?: string;
  website?: string;
  gst?: string;
  address?: {
    line?: string;
    city?: string;
    state?: string;
    pinCode?: string;
  };
  contactPerson: string;
  contactEmail: string;
  isVerified: boolean;
  bookmarkedWorkers: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const CompanySchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    companyName: { type: String, required: true },
    industry: { type: String, required: true },
    description: { type: String, default: '' },
    logo: { type: String, default: '' },
    website: { type: String, default: '' },
    gst: { type: String, default: '' },
    address: {
      line: { type: String, default: '' },
      city: { type: String, default: '' },
      state: { type: String, default: '' },
      pinCode: { type: String, default: '' },
    },
    contactPerson: { type: String, required: true },
    contactEmail: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    bookmarkedWorkers: [{ type: Schema.Types.ObjectId, ref: 'Worker' }],
  },
  { timestamps: true }
);

export default mongoose.model<ICompany>('Company', CompanySchema);
