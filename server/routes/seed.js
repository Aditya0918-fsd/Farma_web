import express from 'express';
import User from '../models/User.js';
import KccApplication from '../models/KccApplication.js';
import CropListing from '../models/CropListing.js';
import LabourBooking from '../models/LabourBooking.js';
import LabourType from '../models/LabourType.js';
import MachineryBooking from '../models/MachineryBooking.js';
import ExpertQuery from '../models/ExpertQuery.js';
import MandiRate from '../models/MandiRate.js';
import DealerListing from '../models/DealerListing.js';
import RegisteredFarmer from '../models/RegisteredFarmer.js';
import Order from '../models/Order.js';
import PathshalaVideo from '../models/PathshalaVideo.js';
import Notification from '../models/Notification.js';
import FarmerCard from '../models/FarmerCard.js';

const router = express.Router();

// Seed initial data into MongoDB database "Farma"
router.post('/', async (req, res) => {
  try {
    // 1. Mandi Rates
    const mandiCount = await MandiRate.countDocuments();
    if (mandiCount === 0) {
      await MandiRate.insertMany([
        { id: "m1", name: "Wheat", hindi: "गेहूं", min: 2150, max: 2400, modal: 2275, unit: "Quintal", change: 2.35, img: "🌾", mandi: "Kanpur Mandi" },
        { id: "m2", name: "Paddy (Common)", hindi: "धान", min: 1750, max: 1950, modal: 1860, unit: "Quintal", change: 1.78, img: "🌾", mandi: "Kanpur Mandi" },
        { id: "m3", name: "Soyabean", hindi: "सोयाबीन", min: 4800, max: 5050, modal: 4920, unit: "Quintal", change: 3.12, img: "🟡", mandi: "Kanpur Mandi" },
        { id: "m4", name: "Maize", hindi: "मक्का", min: 1850, max: 2000, modal: 1920, unit: "Quintal", change: 0.91, img: "🌽", mandi: "Kanpur Mandi" },
        { id: "m5", name: "Mustard", hindi: "सरसों", min: 5100, max: 5400, modal: 5250, unit: "Quintal", change: -0.5, img: "🌼", mandi: "Kanpur Mandi" },
        { id: "m6", name: "Gram", hindi: "चना", min: 4600, max: 4900, modal: 4750, unit: "Quintal", change: 1.2, img: "🟤", mandi: "Kanpur Mandi" },
        { id: "m7", name: "Onion", hindi: "प्याज", min: 800, max: 1200, modal: 1050, unit: "Quintal", change: -2.1, img: "🧅", mandi: "Kanpur Mandi" },
        { id: "m8", name: "Tomato", hindi: "टमाटर", min: 600, max: 1000, modal: 800, unit: "Quintal", change: 4.5, img: "🍅", mandi: "Kanpur Mandi" },
      ]);
    }

    // 2. Crop Listings
    const cropCount = await CropListing.countDocuments();
    if (cropCount === 0) {
      await CropListing.insertMany([
        {
          id: "crop-101",
          sellerName: "Rajesh Kumar Sharma",
          district: "Patna",
          city: "Danapur",
          address: "Village Rampur, PO Danapur",
          pincode: "801503",
          phone: "9876543210",
          cropName: "Organic Sharbati Wheat",
          weight: "50 Quintal",
          price: 2450,
          image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&q=80",
          status: "approved",
          createdAt: new Date().toISOString(),
        },
        {
          id: "crop-102",
          sellerName: "Mahesh Singh",
          district: "Nalanda",
          city: "Bihar Sharif",
          address: "Gram Panchayat Chandi",
          pincode: "803108",
          phone: "9123456789",
          cropName: "Premium Basmati Paddy",
          weight: "30 Quintal",
          price: 3200,
          image: "https://images.unsplash.com/photo-1536054993300-0b00f01ee72a?w=500&q=80",
          status: "approved",
          createdAt: new Date().toISOString(),
        },
      ]);
    }

    // 3. Labour Types
    const labourTypeCount = await LabourType.countDocuments();
    if (labourTypeCount === 0) {
      await LabourType.insertMany([
        { name: "Harvesting Labour" },
        { name: "Sowing Labour" },
        { name: "Irrigation Labour" },
        { name: "Weeding Labour" },
        { name: "Crop Loading Labour" },
        { name: "Orchard Labour" },
      ]);
    }

    // 4. Pathshala Videos
    const videoCount = await PathshalaVideo.countDocuments();
    if (videoCount === 0) {
      await PathshalaVideo.insertMany([
        {
          id: "vid-1",
          title: "वैज्ञानिक विधि से गेहूं की खेती | Scientific Wheat Farming Techniques",
          youtubeUrl: "https://www.youtube.com/watch?v=co3_pS74L-Q",
          category: "soil",
          description: "इस वीडियो में देखें गेहूं की बुवाई से लेकर कटाई तक की पूरी जानकारी और वैज्ञानिक तरीके।",
          createdAt: new Date().toISOString()
        },
        {
          id: "vid-2",
          title: "ड्रिप सिंचाई प्रणाली कैसे काम करती है? | Working of Drip Irrigation System",
          youtubeUrl: "https://www.youtube.com/watch?v=FmYj08m52_I",
          category: "water",
          description: "खेतों में ड्रिप सिंचाई (टपक सिंचाई) लगाने के फायदे और उसकी पूरी कार्यप्रणाली।",
          createdAt: new Date().toISOString()
        },
        {
          id: "vid-3",
          title: "जैविक खाद बनाने की सबसे आसान विधि | How to make Organic Compost at home",
          youtubeUrl: "https://www.youtube.com/watch?v=P84nI0TpxmU",
          category: "soil",
          description: "केंचुआ खाद (Vermicompost) और अन्य जैविक खाद बनाने की विधि तथा खेतों में इसके उपयोग।",
          createdAt: new Date().toISOString()
        }
      ]);
    }

    res.json({ success: true, message: 'Database Farma successfully seeded with initial records!' });
  } catch (error) {
    console.error('Error seeding DB Farma:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
