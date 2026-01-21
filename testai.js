import { GoogleGenAI } from "@google/genai";
import "dotenv/config";


// Ensure the key is provided
const apiKey = process.env.GEMINI_API_KEY; 
const ai = new GoogleGenAI({ apiKey });

async function main() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Explain how AI works in a few words",
    });
    
    // In the new SDK, .text is a property on the response
    console.log(response.text);
  } catch (err) {
    console.error("Connection Error:", err.message);
  }
}

main();