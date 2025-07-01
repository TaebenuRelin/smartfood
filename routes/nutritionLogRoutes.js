import express from 'express';
import NutritionLog from '../models/NutritionLog.js';

const router = express.Router();

// Add a new nutrition log
router.post('/', async (req, res) => {
  try {
    const log = await NutritionLog.create(req.body);
    res.status(201).json({ success: true, data: log });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get all logs for a user
router.get('/:userId', async (req, res) => {
  try {
    const logs = await NutritionLog.find({ user: req.params.userId }).sort({ createdAt: -1 });
    res.json({ success: true, data: logs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router; 