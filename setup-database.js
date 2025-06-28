import fs from 'fs';
import path from 'path';

console.log('🔧 MongoDB Atlas Setup Helper\n');

console.log('📋 Langkah-langkah setup MongoDB Atlas:');
console.log('1. Buka https://cloud.mongodb.com');
console.log('2. Login atau daftar akun');
console.log('3. Buat cluster baru (pilih M0 FREE)');
console.log('4. Klik "Connect" pada cluster');
console.log('5. Pilih "Connect your application"');
console.log('6. Copy connection string\n');

console.log('📝 Format URL yang benar:');
console.log('mongodb+srv://username:password@cluster-name.xxxxx.mongodb.net/smartfood?retryWrites=true&w=majority\n');

console.log('⚠️  Yang perlu diganti:');
console.log('- username: ganti dengan username MongoDB Atlas Anda');
console.log('- password: ganti dengan password MongoDB Atlas Anda');
console.log('- cluster-name.xxxxx.mongodb.net: ganti dengan host cluster Anda\n');

console.log('🔒 Security Setup:');
console.log('1. Di MongoDB Atlas, klik "Network Access"');
console.log('2. Klik "Add IP Address"');
console.log('3. Pilih "Allow Access from Anywhere" (0.0.0.0/0)');
console.log('4. Atau tambahkan IP komputer Anda\n');

// Check current config
const configPath = './config.env';
if (fs.existsSync(configPath)) {
  const config = fs.readFileSync(configPath, 'utf8');
  console.log('📄 Current config.env:');
  console.log(config);
  
  if (config.includes('your_username') || config.includes('your_cluster')) {
    console.log('\n❌ URL masih menggunakan placeholder!');
    console.log('💡 Silakan update config.env dengan URL MongoDB Atlas yang sebenarnya');
  } else {
    console.log('\n✅ URL sudah diupdate!');
  }
} else {
  console.log('❌ File config.env tidak ditemukan!');
} 