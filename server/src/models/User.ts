import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  phone: string;
  dob: Date;
  role: 'worker' | 'company' | 'admin';
  name: string;
  photo?: string;
  gender: 'male' | 'female' | 'other';
  aadhaar?: string;
  address?: {
    line?: string;
    district?: string;
    state?: string;
    pinCode?: string;
  };
  isVerified: boolean;
  isActive: boolean;
  language: 'hi' | 'en';
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    phone: { type: String, required: true, unique: true, index: true },
    dob: { type: Date, required: true },
    role: { type: String, enum: ['worker', 'company', 'admin'], default: 'worker' },
    name: { type: String, required: true },
    photo: { type: String, default: '' },
    gender: { type: String, enum: ['male', 'female', 'other'], default: 'male' },
    aadhaar: { type: String, default: '' },
    address: {
      line: { type: String, default: '' },
      district: { type: String, default: '' },
      state: { type: String, default: '' },
      pinCode: { type: String, default: '' },
    },
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    language: { type: String, enum: ['hi', 'en'], default: 'hi' },
    lastLogin: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);
