import express from 'express';
import DealerListing from '../models/DealerListing.js';

const router = express.Router();

// GET all dealer listings
router.get('/listings', async (req, res) => {
  try {
    const listings = await DealerListing.find().sort({ createdAt: -1 });
    res.json(listings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST submit new dealer listing
router.post('/listings', async (req, res) => {
  try {
    const data = req.body;
    if (!data.id) {
      data.id = `dl-${Date.now()}`;
    }
    const listing = await DealerListing.create(data);
    res.json(listing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update dealer listing
router.put('/listings/:id', async (req, res) => {
  try {
    const updated = await DealerListing.findOneAndUpdate(
      { id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT approve dealer listing
router.put('/listings/:id/approve', async (req, res) => {
  try {
    const updated = await DealerListing.findOneAndUpdate(
      { id: req.params.id },
      { status: 'approved' },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT reject dealer listing
router.put('/listings/:id/reject', async (req, res) => {
  try {
    const updated = await DealerListing.findOneAndUpdate(
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
