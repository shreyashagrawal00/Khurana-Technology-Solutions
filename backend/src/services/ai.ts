import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;
const isOpenRouter = apiKey?.startsWith('sk-or-');
const isGoogleGemini = apiKey?.startsWith('AIza');

const openai = new OpenAI({
  apiKey,
  baseURL: isOpenRouter 
    ? 'https://openrouter.ai/api/v1' 
    : isGoogleGemini 
      ? 'https://generativelanguage.googleapis.com/v1beta/openai/' 
      : undefined,
  defaultHeaders: isOpenRouter ? {
    'HTTP-Referer': 'http://localhost:5000',
    'X-Title': 'InternTracker AI',
  } : undefined,
});

export const parseJobDescription = async (jd: string) => {
  try {
    const model = isOpenRouter 
      ? 'openai/gpt-4o-mini' 
      : isGoogleGemini 
        ? 'gemini-1.5-flash' 
        : 'gpt-4o';
    const response = await openai.chat.completions.create({
      model,
      messages: [
        {
          role: "system",
          content: "You are a professional recruiting assistant. Parse the following job description into a structured JSON format."
        },
        {
          role: "user",
          content: `Job Description: ${jd}
          Extract:
          - companyName
          - role
          - requiredSkills (array)
          - niceToHaveSkills (array)
          - seniority
          - location
          - threeToFiveResumeBulletPoints (specifically tailored for this role and JD)
          
          Return ONLY valid JSON.`
        }
      ],
      response_format: { type: "json_object" }
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('AI returned an empty response');
    }
    return JSON.parse(content);
  } catch (error) {
    console.error('Core AI Parsing Error:', error);
    throw error;
  }
};
