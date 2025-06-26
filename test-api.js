import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3000/api';

async function testAPI() {
  console.log('🧪 Testing API Endpoints...\n');

  try {
    // Test GET /api/foods
    console.log('1. Testing GET /api/foods...');
    const response = await fetch(`${BASE_URL}/foods`);
    const data = await response.json();
    console.log('Response:', data);
    console.log('Status:', response.status);
    console.log('');

    // Test POST /api/foods
    console.log('2. Testing POST /api/foods...');
    const newFood = {
      name: "Nasi Goreng",
      description: "Nasi goreng spesial dengan telur dan ayam",
      price: 25000,
      category: "makanan",
      image: "https://example.com/nasi-goreng.jpg"
    };

    const postResponse = await fetch(`${BASE_URL}/foods`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFood)
    });
    
    const postData = await postResponse.json();
    console.log('Response:', postData);
    console.log('Status:', postResponse.status);
    console.log('');

  } catch (error) {
    console.error('❌ Error testing API:', error.message);
  }
}

testAPI(); 