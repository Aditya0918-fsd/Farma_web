import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    time: { type: String, default: () => new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) },
    read: { type: Boolean, default: false },
    type: { type: String, enum: ['info', 'success', 'warning'], default: 'info' },
    link: { type: String, default: '' },
    category: { type: String, default: 'account' },
    pdfDataUrl: { type: String },
    pdfFileName: { type: String },
    createdAt: { type: String, default: () => new Date().toISOString() },
  },
  { timestamps: true }
);

export default mongoose.models.Notification || mongoose.model('Notification', notificationSchema);
