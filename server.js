import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import connectDB from './config/db.js';
import foodsRoute from './routes/foodRoutesDB.js';
import analyzeRoutes from './routes/analyzeRoutes.js';
import geminiFoodAnalysisRoutes from './routes/geminiFoodAnalysisRoutes.js';
import authRoutes from './routes/authRoutes.js';
import errorHandler from './middleware/error.js';

// --- DIAGNOSTIC LOG ---
if (authRoutes) {
  console.log('✅ Auth routes loaded successfully.');
} else {
  console.error('❌ CRITICAL ERROR: Auth routes failed to load!');
}
// --------------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load env vars - try .env first, then config.env as fallback
dotenv.config();
dotenv.config({ path: join(__dirname, 'config.env') });

// Validate MongoDB URI
if (!process.env.MONGO_URI) {
  console.error('FATAL ERROR: MONGO_URI is not defined in environment variables');
  process.exit(1);
}

// Validate Gemini API Key
if (!process.env.GEMINI_API_KEY) {
  console.error('WARNING: GEMINI_API_KEY is not defined in environment variables');
  console.error('Please add your Gemini API key to config.env or .env file');
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to Database
connectDB();

// Routes
app.use('/api/foods', foodsRoute);
app.use('/api/analyze', analyzeRoutes);
app.use('/api/gemini-food-analysis', geminiFoodAnalysisRoutes);
app.use('/api/auth', authRoutes);

// Error Handler Middleware (should be last)
app.use(errorHandler);

// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`Gemini API Key configured: ${process.env.GEMINI_API_KEY ? 'Yes' : 'No'}`);
}); 