import mongoose from 'mongoose';

const NutritionLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  foodName: String,
  calories: Number,
  protein: Number,
  fat: Number,
  carbs: Number,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('NutritionLog', NutritionLogSchema); 