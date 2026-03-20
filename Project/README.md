# Gen AI Project

This project contains two Node.js scripts that demonstrate the use of Google's Gemini AI for different purposes: a friendly chatbot and a specialized DSA instructor.

## Basic Concepts

### 1. **Google Gemini AI**
   - Gemini is Google's advanced language model capable of generating text, answering questions, and maintaining conversations.
   - We use the `@google/genai` library to interact with the Gemini API.
   - API calls are asynchronous, requiring `async/await` for handling.

### 2. **System Instructions**
   - System instructions define the AI's behavior, personality, and response guidelines.
   - They are passed in the `config` object when generating content.
   - For example, in `Friend_chatbot.js`, the AI is instructed to act as "Rohit" with specific personality traits.

### 3. **Conversation History**
   - The `History` array stores the chat history as an array of objects with `role` ("user" or "model") and `parts` (text content).
   - This allows the AI to maintain context across multiple interactions.

### 4. **Asynchronous Functions**
   - All AI interactions are asynchronous to avoid blocking the program.
   - `async/await` is used to write cleaner, synchronous-looking code.

### 5. **Readline-Sync for Input**
   - Used in `Friend_chatbot.js` for synchronous command-line input.
   - Allows the program to wait for user input without complex asynchronous handling.

### 6. **Error Handling**
   - While not explicitly shown in these scripts, API calls can fail, so try-catch blocks are recommended in production.

### 7. **API Key Security**
   - API keys are required for authentication with Google's services.
   - Never hardcode keys in production; use environment variables instead.
   - Obtain keys from Google AI Studio.

## Scripts Overview

### 1. Friend_chatbot.js
   - A conversational chatbot that role-plays as "Rohit", a gym enthusiast.
   - Maintains a friendly, casual tone with fitness-related humor.
   - Uses conversation history for context.

### 2. DSA_Instructor.js
   - A specialized AI that only answers Data Structures and Algorithms questions.
   - Refuses unrelated queries politely.
   - Demonstrates content filtering using system instructions.

## Installation

1. Ensure Node.js (version 14+) is installed.
2. Navigate to the project directory: `cd Project`
3. Install dependencies: `npm install`

## Usage

### Friend_chatbot.js
1. Replace the API key with your own.
2. Run: `node Friend_chatbot.js`
3. Chat with "Rohit" by typing messages.
4. Type 'exit' to quit.

### DSA_Instructor.js
1. Replace the API key with your own.
2. Run: `node DSA_Instructor.js`
3. The script will query about the president of USA, but the AI will refuse due to system instructions.

## Dependencies

- `@google/genai`: For Gemini AI integration
- `readline-sync`: For synchronous CLI input (used in Friend_chatbot.js)

## Example Output

### Friend_chatbot.js
```
Ask me anything --> Hey Rohit, what's up?
Rohit: Hey buddy! Just finished a killer workout 💪. What's good with you?
```

### DSA_Instructor.js
```
Ask something related to Data Structures and Algorithms. I don't answer unrelated questions.
```

## Important Notes

- These scripts use hardcoded API keys for demonstration. In real applications, use environment variables.
- The DSA instructor demonstrates how to restrict AI responses to specific topics.
- Conversation history helps maintain natural dialogue flow.