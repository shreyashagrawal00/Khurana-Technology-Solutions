import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const parseJobDescription = async (jd: string) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
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

  return JSON.parse(response.choices[0]?.message?.content || '{}');
};
