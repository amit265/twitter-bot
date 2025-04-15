import Prompt from './Prompt.js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import 'dotenv/config';


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateBpscAnswer(question) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
  
      const response = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: Prompt.BPSC_MAINS_ANSWER_PROMPT.replace("{question}", question) }] }],
      });
  
      console.log("\nGenerated Answer:\n", response.response.text());
    } catch (error) {
      console.error("Error generating answer:", error);
    }
  }
  
  // Example Usage
  const question = "Discuss the impact of climate change on India's economy and suggest mitigation measures.";
  generateBpscAnswer(question);