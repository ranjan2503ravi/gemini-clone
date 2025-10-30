import { GoogleGenerativeAI } from "@google/generative-ai";
// API key environment se lo
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);

export async function aiSummarize(prompt) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const result = await model.generateContent(`Give a clear and informative answer (20 sentences): ${prompt}`);
    return result.response.text();
  } catch (error) {
    console.error("AI Error:", error);
    return "Error generating response.";
  }
}

// async ka matlab — ye function asynchronous hai (promise return karega).
// prompt parameter — user ka input ya question hota hai jo hum Gemini ko bhejte hain.
// “Ek async function banao jiska naam aiSummarize hai aur jo user ka input (prompt) lega.”

// getGenerativeModel() Gemini ke andar se ek specific model select karta hai.
// Yahan "gemini-2.0-flash" ek fast AI model hai (speed optimized version).



// const result = await model.generateContent(prompt);
// Ye line AI model ko prompt send karti hai.
// generateContent() ek API call karta hai Google Gemini ke server pe.
// await lagane se ye AI ka response aane tak wait karta hai.
// Example:
// Agar prompt hai "Summarize this paragraph",
// to generateContent() Gemini ko bhej kar summarized answer laata hai.



// return result.response.text();
// Gemini API ka response ek object hota hai jisme response.text() method milta hai.
// text() ke andar final AI ka output hota hai (plain string form me).
// So ye line ka matlab:
// “Gemini ka text output leke return kar do.”

























