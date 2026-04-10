import OpenAI from 'openai';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function test() {
  const apiKey = process.env.OPENAI_API_KEY;
  console.log("Using API Key starting with:", apiKey?.substring(0, 10));
  
  // Try standard OpenAI first if not AIza
  const isGoogle = apiKey?.startsWith('AIza');
  const baseURL = isGoogle ? 'https://generativelanguage.googleapis.com/v1beta/openai/' : undefined;
  const model = isGoogle ? 'gemini-1.5-flash' : 'gpt-4o-mini';

  console.log("BaseURL:", baseURL || "Default (OpenAI)");
  console.log("Model:", model);

  const openai = new OpenAI({ apiKey, baseURL });

  try {
    const response = await openai.chat.completions.create({
      model,
      messages: [{ role: 'user', content: 'Say hello' }]
    });
    console.log("Response:", response.choices[0].message.content);
  } catch (error: any) {
    console.error("Error Status:", error.status);
    console.error("Error Message:", error.message);
    if (error.response?.data) {
      console.error("Error Details:", JSON.stringify(error.response.data));
    }
  }
}

test();
