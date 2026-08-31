import mongoose from 'mongoose';

const kccApplicationSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    aadhaar: { type: String, required: true },
    address: { type: String, default: '' },
    district: { type: String, default: '' },
    landSize: { type: String, default: '' },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    cardNumber: { type: String },
    issueDate: { type: String },
    cardTier: { type: String, enum: ['nex', 'prime'] },
    paymentStatus: { type: String, enum: ['pending', 'paid'] },
    paymentAmount: { type: Number },
    createdAt: { type: String, default: () => new Date().toISOString() },
  },
  { timestamps: true }
);

export default mongoose.models.KccApplication || mongoose.model('KccApplication', kccApplicationSchema);
