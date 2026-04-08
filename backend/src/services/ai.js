"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseJobDescription = void 0;
const openai_1 = __importDefault(require("openai"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const openai = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY,
});
const parseJobDescription = async (jd) => {
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
    return JSON.parse(response.choices[0].message.content || '{}');
};
exports.parseJobDescription = parseJobDescription;
//# sourceMappingURL=ai.js.map