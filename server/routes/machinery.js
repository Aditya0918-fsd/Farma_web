import express from 'express';
import MachineryBooking from '../models/MachineryBooking.js';

const router = express.Router();

// GET all machinery bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await MachineryBooking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST submit machinery booking
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    if (!data.id) {
      data.id = `mach-${Date.now()}`;
    }
    const booking = await MachineryBooking.create(data);
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT allot machinery booking
router.put('/:id/allot', async (req, res) => {
  try {
    const { machineDetails, adminNotes } = req.body;
    const updated = await MachineryBooking.findOneAndUpdate(
      { id: req.params.id },
      { status: 'allotted', allottedMachineDetails: machineDetails, adminNotes },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT reject machinery booking
router.put('/:id/reject', async (req, res) => {
  try {
    const updated = await MachineryBooking.findOneAndUpdate(
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
