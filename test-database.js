import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: './config.env' });

const testDatabaseConnection = async () => {
  console.log('🔍 Testing Database Connection...\n');
  
  try {
    console.log('📡 Connecting to MongoDB...');
    console.log('URL:', process.env.MONGO_URI ? 'Set' : 'Not Set');
    
    if (!process.env.MONGO_URI) {
      console.log('❌ MONGO_URI not found in config.env');
      console.log('💡 Please update config.env with your MongoDB Atlas URL');
      return;
    }
    
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected Successfully!');
    console.log('📍 Host:', conn.connection.host);
    console.log('🗄️ Database:', conn.connection.name);
    console.log('🔗 Connection State:', conn.connection.readyState);
    
    // Test creating a collection
    const testCollection = mongoose.connection.collection('test');
    console.log('✅ Database operations working!');
    
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
    
  } catch (error) {
    console.log('❌ Database Connection Failed:');
    console.log('Error:', error.message);
    console.log('\n💡 Possible solutions:');
    console.log('1. Check your MongoDB Atlas URL in config.env');
    console.log('2. Make sure your IP is whitelisted in MongoDB Atlas');
    console.log('3. Verify username and password are correct');
  }
};

testDatabaseConnection(); 