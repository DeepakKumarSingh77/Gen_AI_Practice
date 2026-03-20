import { GoogleGenAI } from "@google/genai";
import readlineSync from "readline-sync";
import { exec } from "child_process";
import { promisify } from "util";
import os from "os";

const platform = os.platform();

const asyncExecute = promisify(exec);

const History = [];
const ai = new GoogleGenAI({
  apiKey: "Write _here_gemini_api_key",
});

//  Tool create karte hai, jo kisi bhi terminal/ shell command ko execute kar sakta hai

async function executeCommand({ command }) {
  try {
    const { stdout, stderr } = await asyncExecute(command);

    if (stderr) {
      return `Error: ${stderr}`;
    }

    return `Success: ${stdout} || Task executed completely`;
  } catch (error) {
    return `Error: ${error}`;
  }
}

async function openInBrowser({ filePath }) {
  try {
    // Windows: start | Mac: open | Linux: xdg-open
    const opener =
      platform === "win32"
        ? "start"
        : platform === "darwin"
          ? "open"
          : "xdg-open";
    await asyncExecute(`${opener} ${filePath}`);
    return `Success: Opened ${filePath} in the browser.`;
  } catch (error) {
    return `Error: Could not open browser. ${error}`;
  }
}

const executeCommandDeclaration = {
  name: "executeCommand",
  description:
    "Execute a single terminal/shell command. A command can be to create a folder, file, write on a file, edit the file or delete the file",
  parameters: {
    type: "OBJECT",
    properties: {
      command: {
        type: "STRING",
        description:
          'It will be a single terminal command. Ex: "mkdir calculator"',
      },
    },
    required: ["command"],
  },
};

const openBrowserDeclaration = {
  name: "openInBrowser",
  description:
    "Opens a specific HTML file in the user's default web browser to view the website.",
  parameters: {
    type: "OBJECT",
    properties: {
      filePath: {
        type: "STRING",
        description:
          'The path to the HTML file. Example: "calculator/index.html"',
      },
    },
    required: ["filePath"],
  },
};

const availableTools = {
  executeCommand,
  openInBrowser, // <-- Add this
};

async function runAgent(userProblem) {
  History.push({
    role: "user",
    parts: [{ text: userProblem }],
  });

  while (true) {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite", // 1.5-flash is more stable for tool use
      contents: History,
      config: {
        systemInstruction: `You are a Website builder expert. OS: ${platform}. 
        Steps: 1. mkdir folder 2. touch files 3. Write code 4. openInBrowser.`,
        tools: [
          {
            // IMPORTANT: You must include BOTH declarations here
            functionDeclarations: [executeCommandDeclaration, openBrowserDeclaration],
          },
        ],
      },
    });

    // Extracting the parts correctly
    const candidate = response.candidates?.[0];
    const content = candidate?.content;
    const parts = content?.parts || [];
    
    // Look for a function call
    const functionCallPart = parts.find(p => p.functionCall);

    if (functionCallPart) {
      const { name, args } = functionCallPart.functionCall;
      console.log(`\x1b[33mCalling Tool:\x1b[0m ${name}`, args);

      const toolFn = availableTools[name];
      const result = await toolFn(args);

      // Save model's intent to history
      History.push(content);

      // Save tool's result to history
      History.push({
        role: "user",
        parts: [{
          functionResponse: { name, response: { result } }
        }],
      });
      
      console.log(`\x1b[32mTool Result:\x1b[0m ${result}`);

    } else {
      // Extract text safely
      const textResponse = parts.find(p => p.text)?.text || "Project completed!";
      
      History.push({
        role: "model",
        parts: [{ text: textResponse }],
      });

      console.log("\n\x1b[36mAgent:\x1b[0m", textResponse);
      break;
    }
  }
}

async function main() {
  console.log("I am a cursor: let's create a website");
  const userProblem = readlineSync.question("Ask me anything--> ");
  await runAgent(userProblem);
  main();
}

main();
