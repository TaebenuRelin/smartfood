# Setup Backend Smartfood - Analisis Makanan dengan AI

## 🎯 Fitur Backend

Backend ini menyediakan fungsi untuk:
1. **Menerima gambar makanan** dari frontend (multipart/form-data)
2. **Mengenali makanan** menggunakan model AI Hugging Face (salman-hq/food101-resnet50)
3. **Mengambil data nutrisi** dari USDA FoodData Central API
4. **Mengirim respons JSON** dengan informasi lengkap

## 📦 Package yang Diperlukan

```bash
npm install @xenova/transformers onnxruntime-node
```

## 🔧 Konfigurasi Environment Variables

Tambahkan ke file `config.env`:

```env
PORT=3000
MONGO_URI=your_mongodb_uri
NODE_ENV=development
GEMINI_API_KEY=your_gemini_api_key
USDA_API_KEY=your_usda_api_key
```

### Cara Mendapatkan USDA API Key:

1. Kunjungi [USDA FoodData Central](https://fdc.nal.usda.gov/api-key-signup.html)
2. Daftar untuk mendapatkan API key gratis
3. Salin API key ke file `config.env`

## 🚀 Endpoint API

### 1. Analisis Makanan
**POST** `/api/food-analysis/analyze`

**Request:**
- Content-Type: `multipart/form-data`
- Body: `image` (file gambar JPG/PNG, maksimal 10MB)

**Response Success:**
```json
{
  "success": true,
  "foodName": "apple",
  "confidence": 0.95,
  "nama": "Apple, raw, with skin",
  "porsi": "1 medium (182g)",
  "nutrisi": {
    "kalori": 95,
    "protein": 0.5,
    "karbohidrat": 25.1,
    "lemak": 0.3,
    "serat": 4.4,
    "gula": 18.9,
    "sodium": 2,
    "kalsium": 11,
    "zat_besi": 0.2,
    "vitamin_c": 8.4,
    "vitamin_a": 98
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

**Response Error:**
```json
{
  "success": false,
  "message": "Gambar wajib diupload."
}
```

### 2. Status Model
**GET** `/api/food-analysis/status`

**Response:**
```json
{
  "success": true,
  "modelLoaded": true,
  "usdaApiConfigured": true,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 🔄 Alur Kerja

1. **Upload Gambar**: Frontend mengirim gambar via multipart/form-data
2. **Validasi File**: Backend memvalidasi tipe dan ukuran file
3. **AI Recognition**: Model Hugging Face menganalisis gambar untuk mengenali makanan
4. **USDA Lookup**: Mencari data nutrisi dari USDA FoodData Central API
5. **Response**: Mengirim data nutrisi lengkap ke frontend

## ⚠️ Error Handling

### Error Codes:
- `400`: File tidak valid atau tidak diupload
- `404`: Data nutrisi tidak ditemukan di USDA
- `422`: AI tidak dapat mengenali makanan (confidence < 0.3)
- `500`: Error internal server atau konfigurasi API

### Error Messages (Bahasa Indonesia):
- "Gambar wajib diupload."
- "File harus berupa gambar JPG atau PNG!"
- "AI tidak dapat mengenali makanan dari gambar ini dengan tingkat kepercayaan yang cukup."
- "Data nutrisi untuk [nama_makanan] tidak ditemukan dalam database USDA."
- "Konfigurasi API USDA tidak lengkap."

## 🧪 Testing

### Test dengan cURL:
```bash
curl -X POST http://localhost:3000/api/food-analysis/analyze \
  -F "image=@path/to/food-image.jpg"
```

### Test Status:
```bash
curl http://localhost:3000/api/food-analysis/status
```

## 📝 Catatan Penting

1. **Model Loading**: Model Hugging Face akan dimuat saat server start (bisa memakan waktu beberapa menit)
2. **Memory Usage**: Model AI membutuhkan memori yang cukup besar
3. **API Limits**: USDA API memiliki batasan rate limit untuk free tier
4. **File Size**: Maksimal ukuran file 10MB
5. **Supported Formats**: Hanya JPG dan PNG

## 🔧 Troubleshooting

### Model tidak dimuat:
- Pastikan package `@xenova/transformers` terinstall
- Cek koneksi internet untuk download model
- Restart server

### USDA API Error:
- Pastikan API key valid
- Cek rate limit
- Verifikasi format query

### Memory Issues:
- Kurangi ukuran file upload
- Restart server secara berkala
- Monitor penggunaan memori 