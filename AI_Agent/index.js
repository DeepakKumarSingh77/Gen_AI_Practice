import { GoogleGenAI } from "@google/genai";
import readlineSync from "readline-sync";

const History = [];
const ai = new GoogleGenAI({
  apiKey: "Write_here_Gemini_APIkey",
});

function sum({ num1, num2 }) {
  return num1 + num2;
}

function prime({ num }) {
  if (num < 2) return false;

  for (let i = 2; i <= Math.sqrt(num); i++) if (num % i == 0) return false;

  return true;
}

async function getCryptoPrice({ coin }) {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coin}`,
  );
  const data = await response.json();

  return data;
}

const sumDeclaration = {
  name: "sum",
  description: "Get the sum of 2 number",
  parameters: {
    type: "OBJECT",
    properties: {
      num1: {
        type: "NUMBER",
        description: "It will be first number for addition ex: 10",
      },
      num2: {
        type: "NUMBER",
        description: "It will be Second number for addition ex: 10",
      },
    },
    required: ["num1", "num2"],
  },
};

const primeDeclaration = {
  name: "prime",
  description: "Get if number if prime or not",
  parameters: {
    type: "OBJECT",
    properties: {
      num: {
        type: "NUMBER",
        description: "It will be the number to find it is prime or not ex: 13",
      },
    },
    required: ["num"],
  },
};

const cryptoDeclaration = {
  name: "getCryptoPrice",
  description: "Get the current price of any crypto Currency like bitcoin",
  parameters: {
    type: "OBJECT",
    properties: {
      coin: {
        type: "STRING",
        description: "It will be the crypto currency name, like bitcoin",
      },
    },
    required: ["coin"],
  },
};

const availableTools = {
  sum: sum,
  prime: prime,
  getCryptoPrice: getCryptoPrice,
};

async function runAgent(userProblem) {
  History.push({
    role: "user",
    parts: [{ text: userProblem }],
  });

  while (true) {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: History,
      config: {
        systemInstruction: `You are an AI Agent. You have access to 3 tools:
                            1. sum → add two numbers
                            2. prime → check if number is prime
                            3. getCryptoPrice → get crypto price
                            Use these tools whenever needed to solve the user query.`,
        tools: [
          {
            functionDeclarations: [
              sumDeclaration,
              primeDeclaration,
              cryptoDeclaration,
            ],
          },
        ],
      },
    });

    const parts = response.candidates?.[0]?.content?.parts || [];

    const functionCallPart = parts.find((p) => p.functionCall);

    if (functionCallPart) {
      const { name, args } = functionCallPart.functionCall;

      // console.log("Tool Called:", name, args);

      const toolFunction = availableTools[name];

      const result = await toolFunction(args);

      // console.log("Tool Result:", result);

      // save model tool call
      History.push({
        role: "model",
        parts: [{ functionCall: { name, args } }],
      });

      // send tool result back
      History.push({
        role: "user",
        parts: [
          {
            functionResponse: {
              name: name,
              response: { result },
            },
          },
        ],
      });
    } else {
      // Search for the part that actually contains text
      const textPart = parts.find((p) => p.text);
      const finalText =
        textPart?.text || response.text || "I couldn't process that.";

      // Save model final text to history
      History.push({
        role: "model",
        parts: [{ text: finalText }],
      });

      console.log("\nAgent:", finalText);
      break;
    }
  }
}

async function main() {
  const userProblem = readlineSync.question("Ask me anything--> ");
  await runAgent(userProblem);
  main();
}

main();
