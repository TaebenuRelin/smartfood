import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  nutritionalInfo: {
    calories: {
      type: Number,
      required: true,
      min: 0
    },
    protein: {
      type: Number,
      required: true,
      min: 0
    },
    carbohydrates: {
      type: Number,
      required: true,
      min: 0
    },
    fats: {
      type: Number,
      required: true,
      min: 0
    },
    cholesterol: {
      type: Number,
      required: true,
      min: 0
    },
    fiber: {
      type: Number,
      required: true,
      min: 0
    },
    sugar: {
      type: Number,
      required: true,
      min: 0
    },
    sodium: {
      type: Number,
      required: true,
      min: 0
    }
  },
  servingSize: {
    type: Number,
    required: true,
    min: 0
  },
  servingUnit: {
    type: String,
    required: true,
    enum: ['g', 'ml', 'piece', 'portion']
  },
  category: {
    type: String,
    required: true,
    enum: ['makanan', 'minuman', 'dessert', 'snack']
  },
  image: {
    type: String,
    default: ''
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Food = mongoose.model('Food', foodSchema);

export default Food; 