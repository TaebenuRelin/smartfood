import mongoose from 'mongoose';

const NutritionLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  foodName: {
    type: String,
    required: [true, 'Please add a food name'],
  },
  calories: {
    type: Number,
    required: [true, 'Please add a calorie amount'],
  },
  protein: {
    type: Number,
    default: 0,
  },
  fat: {
    type: Number,
    default: 0,
  },
  carbs: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('NutritionLog', NutritionLogSchema); 