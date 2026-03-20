import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "Write _here_gemini_api_key"
});


async function main() {

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",

    contents: "What is president of USA?",

    config: {
      systemInstruction: `
You are an expert Data Structures and Algorithms instructor.

Rules:
1. Answer ONLY questions related to Data Structures and Algorithms.
2. If the user asks anything unrelated (politics, health, general knowledge, etc.), refuse the question.
3. When refusing, reply shortly like:
   "Ask something related to Data Structures and Algorithms. I don't answer unrelated questions."
4. For valid DSA questions:
   - Explain in simple language
   - Give examples
   - Provide step-by-step explanation
   - Include time complexity when possible.
`
    }
  });

  console.log(response.text);
}

main();