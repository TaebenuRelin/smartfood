# 🔧 Fix Network Access Error di MongoDB Atlas

## ❌ Error yang Ditemukan:
```
Error: querySrv ECONNREFUSED _mongodb._tcp.cluster0.vxqcb9r.mongodb.net
```

## 🔧 Solusi:

### **1. Setup Network Access di MongoDB Atlas**

1. **Buka [MongoDB Atlas](https://cloud.mongodb.com)**
2. **Login ke akun Anda**
3. **Pilih cluster Anda**
4. **Klik "Network Access" di sidebar kiri**
5. **Klik "Add IP Address"**
6. **Pilih salah satu:**
   - **"Allow Access from Anywhere"** (0.0.0.0/0) - **RECOMMENDED untuk development**
   - **"Add Current IP Address"** - untuk keamanan lebih tinggi
7. **Klik "Confirm"**

### **2. Pastikan Cluster Status**

1. **Klik "Database" di sidebar**
2. **Pastikan cluster status "Active" atau "Running"**
3. **Jika status "Paused" atau "Stopped", klik "Resume"**

### **3. Test Koneksi**

Setelah setup network access, test lagi:
```bash
node test-database.js
```

### **4. Jika Masih Error**

Coba pendekatan alternatif:
1. **Restart cluster** di MongoDB Atlas
2. **Tunggu 2-3 menit** setelah setup network access
3. **Test koneksi lagi**

## 🆘 Troubleshooting Lanjutan:

### **Error: "ECONNREFUSED"**
- Pastikan IP address sudah di-whitelist
- Pastikan cluster status "Active"
- Coba pilih "Allow Access from Anywhere"

### **Error: "Authentication failed"**
- Pastikan username dan password benar
- Pastikan user memiliki permission "Read and write"

### **Error: "Cluster not found"**
- Pastikan cluster name di URL benar
- Pastikan cluster sudah running 