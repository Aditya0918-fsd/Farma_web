import express from 'express';
import ExpertQuery from '../models/ExpertQuery.js';

const router = express.Router();

// GET all expert advice queries
router.get('/', async (req, res) => {
  try {
    const queries = await ExpertQuery.find().sort({ createdAt: -1 });
    res.json(queries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST submit expert query
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    if (!data.id) {
      data.id = `exp-${Date.now()}`;
    }
    const query = await ExpertQuery.create(data);
    res.json(query);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update expert query status and reply
router.put('/:id', async (req, res) => {
  try {
    const { status, adminReply } = req.body;
    const updated = await ExpertQuery.findOneAndUpdate(
      { id: req.params.id },
      { status, adminReply },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
