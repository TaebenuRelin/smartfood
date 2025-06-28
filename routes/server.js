import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import foodsRoute from './foodRoutesDB.js';

// Load env vars
dotenv.config({ path: '../config.env' });

const app = express();
app.use(cors());
app.use(express.json());

// Connect to Database
connectDB();

// Import route foods
app.use('/api/foods', foodsRoute); // Akses di /api/foods

// Jalankan server di port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

