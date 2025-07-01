import express from 'express';
import multer from 'multer';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(new Error('File harus berupa gambar JPG, PNG, atau SVG!'), false);
    }
    cb(null, true);
  }
});

const apiKey = process.env.GEMINI_API_KEY;

// Validasi API key
if (!apiKey) {
  console.error('GEMINI_API_KEY tidak ditemukan di environment variables!');
}

const GEMINI_VISION_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro-vision:generateContent?key=${apiKey}`;
const GEMINI_TEXT_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`;

router.post('/', (req, res, next) => {
  upload.single('image')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: 'Ukuran gambar maksimal 5MB.' });
    } else if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
}, async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Gambar wajib diupload.' });
  }
  if (!apiKey) {
    return res.status(500).json({ message: 'API key Gemini tidak dikonfigurasi' });
  }
  try {
    console.log('MIME type:', req.file.mimetype);
    console.log('File size:', req.file.size);
    const base64Image = req.file.buffer.toString('base64');
    const promptVision = `Gambar ini adalah foto makanan. Tolong identifikasi nama makanan yang tampak pada gambar ini (dalam bahasa Indonesia, satu kata atau frasa saja, tanpa penjelasan tambahan). Jika tidak yakin, sebutkan "Tidak dikenali".`;
    const visionRequest = {
      contents: [
        {
          parts: [
            { text: promptVision },
            {
              inline_data: {
                mime_type: req.file.mimetype,
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
        maxOutputTokens: 50
      }
    };
    const responseVision = await axios.post(GEMINI_VISION_URL, visionRequest, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 30000
    });
    console.log('Response dari Gemini Vision:', responseVision.data);
    const foodName = responseVision.data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    if (!foodName || foodName.toLowerCase().includes('tidak dikenali')) {
      return res.status(422).json({ message: 'AI tidak dapat mengenali makanan dari gambar ini. Coba gambar lain.' });
    }
    console.log('Nama makanan terdeteksi:', foodName);
    // 2. Dapatkan info gizi dari Gemini text API
    const promptText = `Berikan analisis nutrisi untuk makanan "${foodName}" dalam format JSON yang valid. Format yang diharapkan:\n{\n  "nama": "${foodName}",\n  "porsi": "1 porsi standar",\n  "nutrisi": {\n    "kalori": 250,\n    "protein": 15,\n    "karbohidrat": 30,\n    "lemak": 8,\n    "serat": 3\n  },\n  "alergi": ["gluten", "laktosa"],\n  "confidence": 0.85\n}\n\nJawab hanya dalam format JSON tanpa teks tambahan.`;
    const textRequest = {
      contents: [
        {
          parts: [{ text: promptText }]
        }
      ],
      generationConfig: {
        temperature: 0.1,
        topK: 1,
        topP: 1,
        maxOutputTokens: 500
      }
    };
    const responseText = await axios.post(GEMINI_TEXT_URL, textRequest, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 30000
    });
    console.log('Response dari Gemini Text:', responseText.data);
    const geminiText = responseText.data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!geminiText) {
      return res.status(500).json({ message: 'Gagal mendapatkan analisis nutrisi.', debug: responseText.data });
    }
    let nutritionResult;
    try {
      const cleanText = geminiText.replace(/```json\n?|\n?```/g, '').trim();
      nutritionResult = JSON.parse(cleanText);
    } catch (e) {
      console.error('Error parsing JSON:', e);
      console.error('Raw response:', geminiText);
      return res.status(500).json({ message: 'Format jawaban Gemini tidak valid', rawResponse: geminiText, error: e.message });
    }
    res.json({ foodName, ...nutritionResult });
  } catch (error) {
    console.error('Error dalam analisis:', error);
    if (error.response) {
      if (error.response.status === 400) {
        return res.status(400).json({ message: 'Request tidak valid. Pastikan gambar yang diupload valid.', error: error.response.data });
      } else if (error.response.status === 403) {
        return res.status(403).json({ message: 'API key tidak valid atau quota habis.', error: error.response.data });
      }
      return res.status(error.response.status).json({ message: error.response.data.error?.message || 'Error dari Gemini API', error: error.response.data });
    }
    res.status(500).json({ message: 'Gagal menganalisis makanan', error: error.message });
  }
});

router.post('/analyze', upload.single('image'), async (req, res) => {
  // proses analisis gambar
});

export default router;