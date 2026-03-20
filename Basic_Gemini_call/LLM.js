import { GoogleGenAI } from "@google/genai";
import readlineSync from "readline-sync";

const ai = new GoogleGenAI({ apiKey: "Write _here_gemini_api_key" });

const History = [];

async function Chatting(userProblem) {

  History.push({
    role: "user",
    parts: [{ text: userProblem }]
  });

  try {

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview", // safer stable model
      contents: History
    });

    const aiResponseText =
      response.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

    console.log("\nGemini:", aiResponseText);

    History.push({
      role: "model",
      parts: [{ text: aiResponseText }]
    });

  } catch (error) {
    console.error("\n[Error]:", error.message);
  }
}

async function main() {

  console.log("--- Chatbot Started (Type 'exit' to quit) ---");

  while (true) {

    const userProblem = readlineSync.question("\nAsk me anything --> ");

    if (userProblem.toLowerCase() === "exit") {
      console.log("Goodbye!");
      break;
    }

    await Chatting(userProblem);
  }
}

main();