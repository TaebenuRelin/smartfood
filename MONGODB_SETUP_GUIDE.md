# 🗄️ Panduan Setup MongoDB Atlas untuk SmartFood

## 📋 Langkah 1: Daftar MongoDB Atlas

1. **Buka [MongoDB Atlas](https://cloud.mongodb.com)**
2. **Klik "Try Free" atau "Sign Up"**
3. **Isi form pendaftaran:**
   - Email
   - Password
   - Nama lengkap
4. **Klik "Create Account"**

## 🏗️ Langkah 2: Buat Cluster

1. **Pilih "Build a Database"**
2. **Pilih "FREE" tier (M0)**
3. **Pilih Cloud Provider:**
   - AWS, Google Cloud, atau Azure (pilih yang mana saja)
4. **Pilih Region:**
   - Asia Pacific (Singapore) - untuk latency rendah
5. **Klik "Create"**

## 🔐 Langkah 3: Setup Security

### **Database Access:**
1. **Klik "Database Access" di sidebar**
2. **Klik "Add New Database User"**
3. **Username:** `smartfooduser`
4. **Password:** Buat password yang kuat
5. **Database User Privileges:** "Read and write to any database"
6. **Klik "Add User"**

### **Network Access:**
1. **Klik "Network Access" di sidebar**
2. **Klik "Add IP Address"**
3. **Pilih "Allow Access from Anywhere" (0.0.0.0/0)**
4. **Klik "Confirm"**

## 🔗 Langkah 4: Dapatkan Connection String

1. **Klik "Database" di sidebar**
2. **Klik tombol "Connect" pada cluster**
3. **Pilih "Connect your application"**
4. **Copy connection string**

**Format URL yang akan Anda dapatkan:**
```
mongodb+srv://smartfooduser:<password>@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority
```

## ⚙️ Langkah 5: Update config.env

1. **Buka file `config.env`**
2. **Ganti baris MONGO_URI dengan URL dari MongoDB Atlas**
3. **Ganti `<password>` dengan password yang Anda buat**
4. **Tambahkan `/smartfood` sebelum `?retryWrites`**

**Contoh hasil akhir:**
```env
PORT=3000
MONGO_URI=mongodb+srv://smartfooduser:mypassword123@cluster0.abc123.mongodb.net/smartfood?retryWrites=true&w=majority
NODE_ENV=development
```

## ✅ Langkah 6: Test Koneksi

Jalankan perintah berikut:
```bash
node test-database.js
```

Jika berhasil, Anda akan melihat:
```
✅ MongoDB Connected Successfully!
📍 Host: cluster0.abc123.mongodb.net
🗄️ Database: smartfood
```

## 🚀 Langkah 7: Jalankan Server

```bash
node routes/server.js
```

## 🆘 Troubleshooting

### **Error: "Authentication failed"**
- Pastikan username dan password benar
- Pastikan user memiliki permission "Read and write"

### **Error: "Connection timeout"**
- Pastikan IP address sudah di-whitelist
- Coba pilih "Allow Access from Anywhere"

### **Error: "Cluster not found"**
- Pastikan cluster sudah running
- Pastikan URL cluster name benar

## 📞 Bantuan

Jika masih ada masalah, cek:
1. **MongoDB Atlas Status:** https://status.cloud.mongodb.com
2. **Documentation:** https://docs.atlas.mongodb.com
3. **Community:** https://community.mongodb.com 