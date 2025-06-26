# 🔐 Setup Database User di MongoDB Atlas

## 📋 Langkah-langkah Setup User:

### **1. Login ke MongoDB Atlas**
- Buka https://cloud.mongodb.com
- Login dengan akun Anda

### **2. Setup Database Access**
1. **Klik "Database Access" di sidebar kiri**
2. **Klik "Add New Database User"**
3. **Isi form:**
   - **Username:** `s22210609` (atau username yang Anda inginkan)
   - **Password:** Buat password yang kuat (minimal 8 karakter)
   - **Database User Privileges:** Pilih "Read and write to any database"
4. **Klik "Add User"**

### **3. Setup Network Access**
1. **Klik "Network Access" di sidebar kiri**
2. **Klik "Add IP Address"**
3. **Pilih salah satu:**
   - **"Allow Access from Anywhere"** (0.0.0.0/0) - untuk development
   - **"Add Current IP Address"** - untuk keamanan lebih tinggi
4. **Klik "Confirm"**

### **4. Update config.env**
Setelah setup user, update file `config.env`:

```env
PORT=3000
MONGO_URI=mongodb+srv://s22210609:YOUR_ACTUAL_PASSWORD@cluster0.vxqcb9r.mongodb.net/smartfood?retryWrites=true&w=majority&appName=Cluster0
NODE_ENV=development
```

**Ganti `YOUR_ACTUAL_PASSWORD` dengan password yang Anda buat di langkah 2.**

### **5. Test Koneksi**
```bash
node test-database.js
```

## 🆘 Jika Masih Error:

### **Error: "Authentication failed"**
- Pastikan username dan password benar
- Pastikan user memiliki permission "Read and write"
- Coba buat user baru dengan password yang berbeda

### **Error: "Connection timeout"**
- Pastikan IP address sudah di-whitelist
- Coba pilih "Allow Access from Anywhere"

### **Error: "User not found"**
- Pastikan user sudah dibuat di "Database Access"
- Pastikan username di URL sama dengan username di MongoDB Atlas 