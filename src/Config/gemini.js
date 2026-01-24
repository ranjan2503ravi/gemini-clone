import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

async function main(prompt) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    return response;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
}

export default main;
