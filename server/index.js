import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import healthRoutes from './routes/health.js';
import seedRoutes from './routes/seed.js';
import userRoutes from './routes/users.js';
import kccRoutes from './routes/kcc.js';
import cropRoutes from './routes/crops.js';
import labourRoutes from './routes/labour.js';
import machineryRoutes from './routes/machinery.js';
import expertRoutes from './routes/expert.js';
import mandiRoutes from './routes/mandi.js';
import dealerRoutes from './routes/dealer.js';
import farmerRoutes from './routes/farmers.js';
import orderRoutes from './routes/orders.js';
import pathshalaRoutes from './routes/pathshala.js';
import notificationRoutes from './routes/notifications.js';
import cardRoutes from './routes/cards.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Connect to MongoDB Database "Farma"
connectDB();

// API Routes
app.use('/api/health', healthRoutes);
app.use('/api/seed', seedRoutes);
app.use('/api/users', userRoutes);
app.use('/api/kcc', kccRoutes);
app.use('/api/crops', cropRoutes);
app.use('/api/labour', labourRoutes);
app.use('/api/machinery', machineryRoutes);
app.use('/api/expert', expertRoutes);
app.use('/api/mandi', mandiRoutes);
app.use('/api/dealer', dealerRoutes);
app.use('/api/farmers', farmerRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/pathshala', pathshalaRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/cards', cardRoutes);

app.get('/api', (req, res) => {
  res.json({
    message: 'Farma Web MongoDB Backend API Running',
    docs: '/api/health',
  });
});

if (process.env.NODE_ENV !== 'test' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`🚀 Farma MongoDB API Server running on port ${PORT}`);
    console.log(`🔗 Database URL: ${process.env.MONGODB_URI || 'mongodb://localhost:27017/Farma'}`);
    console.log(`=======================================================`);
  });
}

export default app;
