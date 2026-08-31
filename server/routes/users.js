import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// GET user by ID or get list
router.get('/', async (req, res) => {
  try {
    const { id, phone } = req.query;
    if (id) {
      const user = await User.findOne({ id });
      return res.json(user);
    }
    if (phone) {
      const user = await User.findOne({ phone });
      return res.json(user);
    }
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST save/login user profile
router.post('/', async (req, res) => {
  try {
    const userData = req.body;
    if (!userData.id) {
      userData.id = `usr-${Date.now()}`;
    }
    const user = await User.findOneAndUpdate(
      { id: userData.id },
      userData,
      { new: true, upsert: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update user profile
router.put('/:id', async (req, res) => {
  try {
    const updated = await User.findOneAndUpdate(
      { id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
