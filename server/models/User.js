import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, default: '' },
    role: { type: String, enum: ['farmer', 'dealer'], default: 'farmer' },
    state: { type: String, default: '' },
    district: { type: String, default: '' },
    village: { type: String, default: '' },
    businessName: { type: String },
    dealerType: { type: String },
    occupation: { type: String },
    pincode: { type: String },
    aadhaarNumber: { type: String },
    aadhaarFront: { type: String },
    aadhaarBack: { type: String },
    bankHolder: { type: String },
    bankName: { type: String },
    bankAccount: { type: String },
    bankIfsc: { type: String },
    bankAddress: { type: String },
    verificationStatus: { type: String, enum: ['Pending', 'Verified'], default: 'Pending' },
    createdAt: { type: String, default: () => new Date().toISOString() },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model('User', userSchema);
