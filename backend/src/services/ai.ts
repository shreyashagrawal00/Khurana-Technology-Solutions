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
        ? 'gemini-2.5-flash' 
        : 'gpt-4o';
    
    console.log(`AI Parsing started with model: ${model}`);
    
    const response = await openai.chat.completions.create({
      model,
      messages: [
        {
          role: "system",
          content: "You are a professional recruiting assistant. Parse the job description into a structured JSON format. Return ONLY valid JSON."
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
          - threeToFiveResumeBulletPoints (specifically tailored for this role and JD)`
        }
      ]
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('AI returned an empty response');
    }

    // Handle potential markdown formatting in response
    const jsonStr = content.includes('```json') 
      ? content.split('```json')[1].split('```')[0].trim()
      : content.trim();

    return JSON.parse(jsonStr);
  } catch (error: any) {
    console.error('Core AI Parsing Error:', error?.message || error);
    if (error?.response?.data) {
      console.error('Error Details:', JSON.stringify(error.response.data));
    }
    throw error;
  }
};

export const generateCoverLetter = async (company: string, role: string, jd: string) => {
  try {
    const model = isOpenRouter 
      ? 'openai/gpt-4o-mini' 
      : isGoogleGemini 
        ? 'gemini-2.5-flash' 
        : 'gpt-4o';
    
    console.log(`Generating cover letter with model: ${model}`);
    
    const response = await openai.chat.completions.create({
      model,
      messages: [
        {
          role: "system",
          content: "You are an expert career coach and technical recruiter. Write a compelling, professional, and authentic cover letter based on the provided company, role, and job description. Limit it to 3-4 paragraphs. Make it engaging but not overly enthusiastic or desperate. Return ONLY the text of the cover letter."
        },
        {
          role: "user",
          content: `Company: ${company}\nRole: ${role}\nJob Description (notes): ${jd || 'Not provided'}`
        }
      ]
    });

    const content = response.choices[0]?.message?.content;
    if (!content) throw new Error('AI returned an empty response');

    return content.trim();
  } catch (error: any) {
    console.error('Cover Letter Generation Error:', error?.message || error);
    throw error;
  }
};
