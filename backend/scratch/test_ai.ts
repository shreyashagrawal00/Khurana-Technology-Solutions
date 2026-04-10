import { parseJobDescription } from '../src/services/ai';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

async function test() {
  const jd = "Software Development Intern. We are seeking a motivated Software Development Intern with knowledge of Java, Python, Data Structures, and Database Management. Responsibilities include writing clean code, debugging applications, assisting in backend development, and participating in team discussions. Familiarity with web technologies and REST APIs is a plus.";
  try {
    console.log("Starting test...");
    const result = await parseJobDescription(jd);
    console.log("Success!");
    console.log(JSON.stringify(result, null, 2));
  } catch (error: any) {
    console.error("Test Failed!");
    console.error(error);
  }
}

test();
