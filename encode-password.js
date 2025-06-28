import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🔐 Password Encoder untuk MongoDB Atlas\n');

rl.question('Masukkan password MongoDB Atlas Anda: ', (password) => {
  const encodedPassword = encodeURIComponent(password);
  
  console.log('\n📋 Hasil:');
  console.log('Password asli:', password);
  console.log('Password encoded:', encodedPassword);
  
  console.log('\n🔗 URL lengkap:');
  console.log(`mongodb+srv://s22210609:${encodedPassword}@cluster0.vxqcb9r.mongodb.net/smartfood?retryWrites=true&w=majority&appName=Cluster0`);
  
  console.log('\n📝 Update file config.env dengan URL di atas');
  
  rl.close();
}); 