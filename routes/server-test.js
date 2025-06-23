import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load env vars
dotenv.config({ path: './config.env' });

const app = express();
app.use(cors());
app.use(express.json());

// Test route without database
app.get('/api/foods', (req, res) => {
  res.json([
    {
      _id: '1',
      name: 'Nasi Goreng',
      description: 'Nasi goreng spesial',
      price: 25000,
      category: 'makanan',
      image: 'https://example.com/nasi-goreng.jpg',
      isAvailable: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: '2', 
      name: 'Es Teh Manis',
      description: 'Es teh manis segar',
      price: 5000,
      category: 'minuman',
      image: 'https://example.com/es-teh.jpg',
      isAvailable: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
});

app.post('/api/foods', (req, res) => {
  const newFood = {
    _id: Date.now().toString(),
    ...req.body,
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  res.status(201).json(newFood);
});

app.get('/api/foods/:id', (req, res) => {
  const food = {
    _id: req.params.id,
    name: 'Nasi Goreng',
    description: 'Nasi goreng spesial',
    price: 25000,
    category: 'makanan',
    image: 'https://example.com/nasi-goreng.jpg',
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  res.json(food);
});

app.put('/api/foods/:id', (req, res) => {
  const updatedFood = {
    _id: req.params.id,
    ...req.body,
    updatedAt: new Date()
  };
  res.json(updatedFood);
});

app.delete('/api/foods/:id', (req, res) => {
  res.json({ message: 'Food deleted successfully' });
});

// Jalankan server di port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Test Server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api/foods`);
}); 