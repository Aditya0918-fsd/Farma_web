import express from 'express';
import CropListing from '../models/CropListing.js';

const router = express.Router();

// GET all crop listings
router.get('/', async (req, res) => {
  try {
    const crops = await CropListing.find().sort({ createdAt: -1 });
    res.json(crops);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST submit new crop listing
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    if (!data.id) {
      data.id = `crop-${Date.now()}`;
    }
    const crop = await CropListing.create(data);
    res.json(crop);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT approve crop listing
router.put('/:id/approve', async (req, res) => {
  try {
    const updated = await CropListing.findOneAndUpdate(
      { id: req.params.id },
      { status: 'approved' },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT reject crop listing
router.put('/:id/reject', async (req, res) => {
  try {
    const updated = await CropListing.findOneAndUpdate(
      { id: req.params.id },
      { status: 'rejected' },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
