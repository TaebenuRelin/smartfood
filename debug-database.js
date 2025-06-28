import dotenv from 'dotenv';
import fs from 'fs';

// Load environment variables
dotenv.config({ path: './config.env' });

console.log('🔍 Database Connection Debugger\n');

// Check if config.env exists
if (!fs.existsSync('./config.env')) {
  console.log('❌ File config.env tidak ditemukan!');
  process.exit(1);
}

// Read and display config
const config = fs.readFileSync('./config.env', 'utf8');
console.log('📄 Isi config.env:');
console.log(config);

// Check MONGO_URI
const mongoUri = process.env.MONGO_URI;
console.log('\n🔗 MONGO_URI Status:');
console.log('Set:', !!mongoUri);
console.log('Length:', mongoUri ? mongoUri.length : 0);

if (mongoUri) {
  console.log('\n📋 URL Analysis:');
  
  // Check for common issues
  if (mongoUri.includes('your_username')) {
    console.log('❌ Masih menggunakan placeholder username');
  }
  
  if (mongoUri.includes('your_password')) {
    console.log('❌ Masih menggunakan placeholder password');
  }
  
  if (mongoUri.includes('your_cluster')) {
    console.log('❌ Masih menggunakan placeholder cluster name');
  }
  
  if (mongoUri.startsWith('mongodb+srv://')) {
    console.log('✅ Format URL benar (mongodb+srv://)');
  } else {
    console.log('❌ Format URL salah, harus dimulai dengan mongodb+srv://');
  }
  
  if (mongoUri.includes('smartfood')) {
    console.log('✅ Database name sudah benar (smartfood)');
  } else {
    console.log('❌ Database name tidak ditemukan atau salah');
  }
  
  if (mongoUri.includes('retryWrites=true')) {
    console.log('✅ Retry writes enabled');
  }
  
  if (mongoUri.includes('w=majority')) {
    console.log('✅ Write concern set to majority');
  }
}

console.log('\n💡 Troubleshooting Tips:');
console.log('1. Pastikan URL dari MongoDB Atlas sudah benar');
console.log('2. Ganti username, password, dan cluster name');
console.log('3. Pastikan IP address sudah di-whitelist di MongoDB Atlas');
console.log('4. Cek apakah username dan password benar');
console.log('5. Pastikan cluster sudah running di MongoDB Atlas'); 