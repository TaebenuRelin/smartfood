# Database Setup Guide

## Struktur File yang Sudah Dibuat:

### 1. Config Files
- `config/db.js` - Koneksi database MongoDB
- `config.env` - File konfigurasi environment variables

### 2. Models
- `models/Food.js` - Model untuk data makanan

### 3. Routes
- `routes/server.js` - Server utama Express
- `routes/foodRoutesDB.js` - API routes untuk CRUD makanan

## Langkah Setup Database:

### 1. Update MongoDB Connection String
Edit file `config.env` dan ganti `MONGO_URI` dengan URL MongoDB Atlas Anda:

```env
PORT=3000
MONGO_URI=mongodb+srv://username:password@cluster.xxxxx.mongodb.net/smartfood?retryWrites=true&w=majority
NODE_ENV=development
```

### 2. Install Dependencies (jika belum)
```bash
npm install express mongoose cors dotenv
```

### 3. Jalankan Server
```bash
node routes/server.js
```

## API Endpoints yang Tersedia:

### GET /api/foods
- Mendapatkan semua makanan yang tersedia

### GET /api/foods/:id
- Mendapatkan makanan berdasarkan ID

### POST /api/foods
- Menambah makanan baru
- Body: `{ "name": "Nama Makanan", "description": "Deskripsi", "price": 25000, "category": "makanan" }`

### PUT /api/foods/:id
- Update makanan berdasarkan ID

### DELETE /api/foods/:id
- Hapus makanan berdasarkan ID

## Kategori Makanan yang Didukung:
- makanan
- minuman
- dessert
- snack

## Troubleshooting:
1. Pastikan MongoDB Atlas sudah running
2. Pastikan IP address Anda sudah di-whitelist di MongoDB Atlas
3. Pastikan username dan password benar
4. Pastikan nama database sudah benar 