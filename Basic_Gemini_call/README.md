# Basic Gemini Chatbot

This project is a simple command-line chatbot application that uses Google's Gemini AI to generate responses based on user input. It maintains a conversation history and allows for interactive chatting.

## Basic Concepts

### 1. **Google Gemini AI**
   - Gemini is a large language model developed by Google.
   - It can generate human-like text responses based on prompts.
   - In this project, we use the `@google/genai` library to interact with Gemini's API.

### 2. **Asynchronous Programming**
   - The code uses `async/await` to handle asynchronous operations, such as API calls to Gemini.
   - This ensures the program doesn't block while waiting for responses.

### 3. **Conversation History**
   - The `History` array stores the conversation as a series of messages with roles ("user" or "model").
   - This allows the AI to maintain context across multiple interactions.

### 4. **Readline-Sync for Input**
   - `readline-sync` is used to read user input synchronously from the command line.
   - It provides a simple way to prompt the user for input without dealing with asynchronous callbacks.

### 5. **Error Handling**
   - The code includes a try-catch block to handle errors from the API call.
   - If an error occurs, it logs the error message to the console.

### 6. **API Key Management**
   - The Google GenAI API requires an API key for authentication.
   - The key is currently hardcoded in the script (not recommended for production).
   - Obtain your own API key from the Google AI Studio and replace the placeholder.

## Installation

1. Ensure you have Node.js installed (version 14 or higher).
2. Clone or download this project.
3. Navigate to the project directory: `cd Basic_Gemini_call`
4. Install dependencies: `npm install`

## Usage

1. Replace the API key in `LLM.js` with your own Google GenAI API key.
2. Run the application: `node LLM.js`
3. Type your questions or messages when prompted.
4. Type 'exit' to quit the chatbot.

## Dependencies

- `@google/genai`: For interacting with Google's Gemini AI.
- `readline-sync`: For synchronous command-line input.

## Example Interaction

```
--- Chatbot Started (Type 'exit' to quit) ---

Ask me anything --> Hello, how are you?
Gemini: Hello! I'm doing well, thank you for asking. How can I help you today?

Ask me anything --> What is Node.js?
Gemini: Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine...
```

