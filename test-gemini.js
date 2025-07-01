import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config();
dotenv.config({ path: join(__dirname, 'config.env') });

console.log('=== Test Konfigurasi Gemini API ===\n');

// Check environment variables
console.log('Environment Variables:');
console.log('- PORT:', process.env.PORT || 'Not set');
console.log('- NODE_ENV:', process.env.NODE_ENV || 'Not set');
console.log('- MONGO_URI:', process.env.MONGO_URI ? 'Set' : 'Not set');
console.log('- GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? 'Set' : 'Not set');

if (process.env.GEMINI_API_KEY) {
  console.log('- API Key length:', process.env.GEMINI_API_KEY.length);
  console.log('- API Key starts with:', process.env.GEMINI_API_KEY.substring(0, 10) + '...');
} else {
  console.log('\n❌ GEMINI_API_KEY tidak ditemukan!');
  console.log('Silakan ikuti langkah-langkah di setup-gemini.md');
  process.exit(1);
}

console.log('\n✅ Konfigurasi environment variables berhasil!');
console.log('\nLangkah selanjutnya:');
console.log('1. Restart server dengan: npm run dev');
console.log('2. Test upload gambar melalui frontend');
console.log('3. Periksa console server untuk log analisis'); 