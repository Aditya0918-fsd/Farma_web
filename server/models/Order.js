import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    items: [
      {
        id: { type: String },
        productId: { type: String },
        name: { type: String },
        category: { type: String },
        price: { type: Number },
        unit: { type: String },
        image: { type: String },
        quantity: { type: Number },
        sellerName: { type: String },
      },
    ],
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ['kcc', 'upi', 'cod', 'wallet'], required: true },
    deliveryAddress: { type: String, default: '' },
    status: {
      type: String,
      enum: ['Confirmed', 'Packed', 'Dispatched', 'Delivered', 'Processing'],
      default: 'Confirmed',
    },
    assignedDealerName: { type: String },
    createdAt: { type: String, default: () => new Date().toISOString() },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model('Order', orderSchema);
