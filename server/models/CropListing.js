import mongoose from 'mongoose';

const cropListingSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    sellerName: { type: String, required: true },
    district: { type: String, default: '' },
    city: { type: String, default: '' },
    address: { type: String, default: '' },
    pincode: { type: String, default: '' },
    phone: { type: String, required: true },
    cropName: { type: String, required: true },
    weight: { type: String, default: '' },
    price: { type: Number, required: true },
    image: { type: String, default: '' },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    createdAt: { type: String, default: () => new Date().toISOString() },
  },
  { timestamps: true }
);

export default mongoose.models.CropListing || mongoose.model('CropListing', cropListingSchema);
