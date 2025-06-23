import express from 'express';
import Food from '../models/Food.js';

const router = express.Router();

// @route   GET api/foods
// @desc    Get all foods
// @access  Public
router.get('/', async (req, res) => {
  try {
    const foods = await Food.find({ isAvailable: true }).sort({ createdAt: -1 });
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET api/foods/:id
// @desc    Get single food by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }
    res.json(food);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST api/foods
// @desc    Create new food
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, description, nutritionalInfo, servingSize, servingUnit, category } = req.body;
    if (!name || !description || !nutritionalInfo || !servingSize || !servingUnit || !category) {
      return res.status(400).json({ message: 'Field wajib: name, description, nutritionalInfo, servingSize, servingUnit, category' });
    }
    // Validasi nutritionalInfo
    const requiredNutrients = ['calories', 'protein', 'carbohydrates', 'fats', 'cholesterol', 'fiber', 'sugar', 'sodium'];
    for (const nutrient of requiredNutrients) {
      if (nutritionalInfo[nutrient] === undefined) {
        return res.status(400).json({ message: `Field nutritionalInfo.${nutrient} wajib diisi` });
      }
    }
    const newFood = new Food(req.body);
    const savedFood = await newFood.save();
    res.status(201).json(savedFood);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   PUT api/foods/:id
// @desc    Update food
// @access  Public
router.put('/:id', async (req, res) => {
  try {
    const { name, description, nutritionalInfo, servingSize, servingUnit, category } = req.body;
    if (!name || !description || !nutritionalInfo || !servingSize || !servingUnit || !category) {
      return res.status(400).json({ message: 'Field wajib: name, description, nutritionalInfo, servingSize, servingUnit, category' });
    }
    // Validasi nutritionalInfo
    const requiredNutrients = ['calories', 'protein', 'carbohydrates', 'fats', 'cholesterol', 'fiber', 'sugar', 'sodium'];
    for (const nutrient of requiredNutrients) {
      if (nutritionalInfo[nutrient] === undefined) {
        return res.status(400).json({ message: `Field nutritionalInfo.${nutrient} wajib diisi` });
      }
    }
    const updatedFood = await Food.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedFood) {
      return res.status(404).json({ message: 'Food not found' });
    }
    res.json(updatedFood);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE api/foods/:id
// @desc    Delete food
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const deletedFood = await Food.findByIdAndDelete(req.params.id);
    if (!deletedFood) {
      return res.status(404).json({ message: 'Food not found' });
    }
    res.json({ message: 'Food deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router; 