require('dotenv').config();
const axios = require('axios');

const apiKey = process.env.GEMINI_API_KEY;

async function testGemini() {
  try {
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + apiKey,
      {
        contents: [{ parts: [{ text: "Hello, Gemini!" }] }]
      }
    );
    console.log('Gemini API response:', response.data);
  } catch (err) {
    console.error('Error:', err.response ? err.response.data : err.message);
  }
}

testGemini();

const promptText = `Berikan analisis nutrisi untuk makanan "${foodName}" dalam format JSON yang valid. ...`;
const textRequest = { ... };
const responseText = await axios.post(GEMINI_TEXT_URL, textRequest, { ... });
const geminiText = responseText.data.candidates?.[0]?.content?.parts?.[0]?.text;
nutritionResult = JSON.parse(cleanText);