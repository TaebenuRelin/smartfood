import express from 'express';
import multer from 'multer';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Konfigurasi multer untuk upload gambar
const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(new Error('File harus berupa gambar JPG atau PNG!'), false);
    }
    cb(null, true);
  }
});

// Gemini API Configuration
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_VISION_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
const GEMINI_TEXT_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

// Validasi API key
if (!GEMINI_API_KEY) {
  console.error('GEMINI_API_KEY tidak ditemukan di environment variables!');
}

// Fungsi untuk mengenali makanan dari gambar menggunakan Gemini Vision
async function recognizeFoodWithGemini(imageBuffer, mimeType) {
  try {
    console.log('Menganalisis gambar dengan Gemini Vision...');
    
    const base64Image = imageBuffer.toString('base64');
    
    const promptVision = `Analisis gambar makanan ini dan berikan informasi dalam format JSON yang valid:

{
  "nama_makanan": "nama makanan dalam bahasa Indonesia",
  "nama_inggris": "nama makanan dalam bahasa Inggris",
  "kategori": "kategori makanan (contoh: buah, sayur, daging, dll)",
  "deskripsi": "deskripsi singkat makanan",
  "confidence": 0.95
}

Pastikan response hanya berisi JSON valid tanpa teks tambahan.`;

    const visionRequest = {
      contents: [
        {
          parts: [
            { text: promptVision },
            {
              inline_data: {
                mime_type: mimeType,
                data: base64Image
              }
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.1,
        topK: 1,
        topP: 1,
        maxOutputTokens: 500
      }
    };

    const response = await axios.post(GEMINI_VISION_URL, visionRequest, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 30000
    });

    console.log('Response dari Gemini Vision:', response.data);
    
    const geminiText = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!geminiText) {
      throw new Error('Tidak ada response dari Gemini Vision');
    }

    // Parse JSON response
    const recognitionResult = parseGeminiResponse(geminiText);
    if (!recognitionResult) {
      throw new Error('Format response Gemini tidak valid');
    }

    return recognitionResult;
  } catch (error) {
    console.error('Error dalam pengenalan makanan dengan Gemini:', error.message);
    // Tambahkan detail error dari axios jika ada
    if (error.response) {
      console.error('Data:', error.response.data);
      console.error('Status:', error.response.status);
    }
    throw new Error('Gagal menghubungi layanan pengenalan gambar.');
  }
}

// Fungsi helper untuk membersihkan dan parse JSON
function parseGeminiResponse(text) {
  try {
    const cleanText = text.replace(/```json\n?|\n?```/g, '').trim();
    return JSON.parse(cleanText);
  } catch (e) {
    console.error('Error parsing JSON dari Gemini:', e);
    return null;
  }
}

// Fungsi untuk mendapatkan data nutrisi menggunakan Gemini Text
async function getNutritionDataWithGemini(foodName, foodNameEnglish) {
  try {
    console.log(`Mendapatkan data nutrisi untuk: ${foodName}`);
    
    const promptNutrition = `Berikan informasi nutrisi lengkap untuk makanan "${foodName}" (${foodNameEnglish}) dalam format JSON yang valid:

{
  "nama": "${foodName}",
  "nama_inggris": "${foodNameEnglish}",
  "porsi": "1 porsi standar (dalam gram)",
  "nutrisi": {
    "kalori": 100,
    "protein": 5.0,
    "karbohidrat": 20.0,
    "lemak": 2.0,
    "serat": 3.0,
    "gula": 15.0,
    "sodium": 50,
    "kalsium": 20,
    "zat_besi": 1.0,
    "vitamin_c": 10,
    "vitamin_a": 100,
    "vitamin_d": 0,
    "vitamin_e": 1.0,
    "vitamin_k": 5,
    "vitamin_b1": 0.1,
    "vitamin_b2": 0.1,
    "vitamin_b3": 1.0,
    "vitamin_b6": 0.1,
    "vitamin_b12": 0,
    "folat": 10,
    "magnesium": 20,
    "fosfor": 30,
    "kalium": 200,
    "zinc": 0.5
  },
  "manfaat": ["manfaat kesehatan 1", "manfaat kesehatan 2"],
  "catatan": "catatan tambahan tentang makanan ini",
  "sumber_data": "USDA Food Database & Nutrition Research"
}

Berikan data yang akurat berdasarkan database nutrisi resmi. Jawab hanya dalam format JSON tanpa teks tambahan.`;

    const textRequest = {
      contents: [
        {
          parts: [{ text: promptNutrition }]
        }
      ],
      generationConfig: {
        temperature: 0.1,
        topK: 1,
        topP: 1,
        maxOutputTokens: 1000
      }
    };

    const response = await axios.post(GEMINI_TEXT_URL, textRequest, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 30000
    });

    console.log('Response dari Gemini Text:', response.data);
    
    const geminiText = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!geminiText) {
      throw new Error('Tidak ada response dari Gemini Text');
    }

    // Parse JSON response
    const nutritionData = parseGeminiResponse(geminiText);
    if (!nutritionData) {
      throw new Error('Format response nutrisi Gemini tidak valid');
    }

    return nutritionData;
  } catch (error) {
    console.error('Error dalam mendapatkan data nutrisi dengan Gemini:', error.message);
    if (error.response) {
      console.error('Data:', error.response.data);
      console.error('Status:', error.response.status);
    }
    throw new Error('Gagal menghubungi layanan data nutrisi.');
  }
}

// Route utama untuk analisis makanan
router.post('/analyze', upload.single('image'), async (req, res) => {
  try {
    // Validasi file
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: 'Gambar wajib diupload.' 
      });
    }

    if (!GEMINI_API_KEY) {
      return res.status(500).json({ 
        success: false, 
        message: 'API key Gemini tidak dikonfigurasi. Silakan hubungi administrator.' 
      });
    }

    console.log('File diterima:', {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size
    });

    // Langkah 1: Kenali makanan dari gambar dengan Gemini Vision
    const recognitionResult = await recognizeFoodWithGemini(req.file.buffer, req.file.mimetype);
    
    if (!recognitionResult.nama_makanan || recognitionResult.confidence < 0.3) {
      return res.status(422).json({
        success: false,
        message: 'AI tidak dapat mengenali makanan dari gambar ini dengan tingkat kepercayaan yang cukup. Coba gambar lain.',
        confidence: recognitionResult.confidence || 0
      });
    }

    console.log('Makanan terdeteksi:', recognitionResult);

    // Langkah 2: Ambil data nutrisi dengan Gemini Text
    const nutritionData = await getNutritionDataWithGemini(
      recognitionResult.nama_makanan, 
      recognitionResult.nama_inggris
    );

    // Langkah 3: Kirim respons
    const response = {
      success: true,
      foodName: recognitionResult.nama_makanan,
      foodNameEnglish: recognitionResult.nama_inggris,
      confidence: recognitionResult.confidence,
      kategori: recognitionResult.kategori,
      deskripsi: recognitionResult.deskripsi,
      ...nutritionData,
      timestamp: new Date().toISOString()
    };

    console.log('Analisis selesai:', response);
    res.json(response);

  } catch (error) {
    console.error('Error dalam analisis makanan:', error);
    
    let statusCode = 500;
    let message = 'Terjadi kesalahan internal pada server.';

    if (error.message.includes('layanan')) {
      statusCode = 503; // Service Unavailable
      message = error.message;
    } else if (error.message.includes('format')) {
      statusCode = 502; // Bad Gateway
      message = 'Menerima respons tidak valid dari layanan analisis. Coba lagi nanti.';
    }

    res.status(statusCode).json({
      success: false,
      message: message,
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Route untuk status API
router.get('/status', async (req, res) => {
  try {
    const status = {
      geminiApiConfigured: !!GEMINI_API_KEY,
      timestamp: new Date().toISOString()
    };
    
    res.json({
      success: true,
      ...status
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error mendapatkan status',
      error: error.message
    });
  }
});

export default router; 