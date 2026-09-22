import mongoose, { Schema, Document } from 'mongoose';

export interface IAttendance extends Document {
  workerId: mongoose.Types.ObjectId;
  date: string; // YYYY-MM-DD
  checkIn: Date;
  checkOut?: Date;
  gps?: {
    lat: number;
    lng: number;
  };
  status: 'present' | 'absent' | 'half_day';
}

const AttendanceSchema: Schema = new Schema(
  {
    workerId: { type: Schema.Types.ObjectId, ref: 'Worker', required: true, index: true },
    date: { type: String, required: true },
    checkIn: { type: Date, default: Date.now },
    checkOut: { type: Date },
    gps: {
      lat: { type: Number, default: 0 },
      lng: { type: Number, default: 0 },
    },
    status: { type: String, enum: ['present', 'absent', 'half_day'], default: 'present' },
  },
  { timestamps: true }
);

export default mongoose.model<IAttendance>('Attendance', AttendanceSchema);
