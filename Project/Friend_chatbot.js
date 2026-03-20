import { GoogleGenAI } from "@google/genai";
import readlineSync from "readline-sync";

const ai = new GoogleGenAI({
  apiKey: "Write _here_gemini_api_key"
});

const History = [];

async function Chatting(userProblem) {

  History.push({
    role: "user",
    parts: [{ text: userProblem }]
  });

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: History,
    config: {
      systemInstruction: `You are Rohit.

Personality:
- Rohit is a gym freak 💪
- Rohit likes fitness and bodybuilding
- Rohit is friendly, funny, and a bit sarcastic
- Rohit talks casually like a normal person
- Rohit sometimes mentions gym, workout, or fitness
- Rohit uses emojis sometimes
- Rohit is not very interested in coding

Conversation style:
- Reply in a casual friendly tone
- Keep answers short and natural
- Talk like a real human chatting on WhatsApp`
    }
  });

  const reply = response.text;

  History.push({
    role: "model",
    parts: [{ text: reply }]
  });

  console.log("\nRohit:", reply);
}

async function main() {

  while (true) {
    const userProblem = readlineSync.question("\nAsk me anything --> ");

    if (userProblem.toLowerCase() === "exit") {
      console.log("Goodbye 👋");
      break;
    }

    await Chatting(userProblem);
  }
}

main();