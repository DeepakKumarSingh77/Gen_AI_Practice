# AI Agent with Function Calling

## Overview

This AI Agent is a sophisticated conversational assistant built using Google's Gemini AI model (gemini-2.5-flash-lite). It leverages function calling capabilities to perform specific tasks, enabling it to provide accurate, real-time information and computations. The agent can handle mathematical operations, prime number checks, and cryptocurrency price queries through integrated tools.

## Features

- **Conversational Interface**: Interactive chat-based interaction using readline-sync for seamless user input.
- **Function Calling Tools**: Three specialized tools for enhanced functionality:
  - **Sum Tool**: Adds two numbers with precision.
  - **Prime Tool**: Checks if a given number is prime.
  - **Crypto Price Tool**: Fetches real-time cryptocurrency prices from CoinGecko API.
- **Iterative Refinement**: Utilizes a while loop mechanism to make multiple tool calls, improving response accuracy and completeness.
- **Conversation History**: Maintains context through a history array, allowing for coherent multi-turn conversations.

## How It Works

### Core Architecture

1. **Initialization**: The agent initializes with Google's GenAI client and defines available tools.
2. **User Input**: Accepts user queries via command-line interface.
3. **AI Processing**: Sends the conversation history to Gemini AI with system instructions and tool declarations.
4. **Tool Execution**: If the AI determines a tool is needed, it calls the appropriate function and incorporates the result back into the conversation.
5. **Response Generation**: Provides final answers based on tool outputs and AI reasoning.

### The Iterative Improvement Flow

The agent's intelligence shines through its **iterative refinement mechanism** implemented via a `while(true)` loop in the `runAgent` function. This approach allows the AI to make multiple tool calls within a single user query, significantly enhancing the quality and accuracy of responses:

#### Flow Explanation:

1. **Initial Query Processing**: User input is added to the conversation history.

2. **AI Analysis**: The Gemini model analyzes the query and determines if tools are required.

3. **Tool Call Detection**: If a function call is detected in the AI response:
   - The agent executes the specified tool with provided arguments.
   - Results are captured and fed back into the conversation history.
   - The loop continues, allowing the AI to process the new information.

4. **Iterative Enhancement**: The AI can now make follow-up tool calls based on previous results. For example:
   - A user asks: "What's the sum of prime numbers between 10 and 20?"
   - First iteration: AI calls `prime` tool multiple times to check numbers 11, 13, 17, 19.
   - Second iteration: AI calls `sum` tool to add the identified primes.
   - Result: Accurate computation with step-by-step reasoning.

5. **Final Response**: When no more tool calls are needed, the AI generates a comprehensive answer incorporating all tool outputs.

#### Benefits of Multiple Calls:

- **Complex Problem Solving**: Breaks down intricate queries into manageable steps.
- **Data Accuracy**: Real-time tool execution ensures up-to-date information (e.g., crypto prices).
- **Contextual Responses**: Each tool call enriches the conversation context, leading to more informed answers.
- **Error Reduction**: Iterative verification minimizes computational errors.
- **Dynamic Adaptation**: The AI can adjust its approach based on intermediate results.

This mechanism transforms the agent from a simple Q&A bot into a powerful problem-solving assistant capable of handling multi-step reasoning tasks.

## Installation

1. **Prerequisites**:
   - Node.js (v14 or higher)
   - npm or yarn

2. **Clone/Download**: Place the project files in your desired directory.

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **API Key**: Ensure you have a valid Google AI API key. Replace the placeholder in `index.js`:
   ```javascript
   const ai = new GoogleGenAI({
     apiKey: "YOUR_API_KEY_HERE",
   });
   ```

## Usage

1. **Run the Agent**:
   ```bash
   node index.js
   ```

2. **Interact**: Type your queries when prompted. Examples:
   - "What is 15 + 27?"
   - "Is 29 a prime number?"
   - "What's the current price of Bitcoin?"
   - "Calculate the sum of primes between 1 and 10."

3. **Exit**: Use Ctrl+C to terminate the program.

## Tools Details

### Sum Tool
- **Function**: `sum({ num1, num2 })`
- **Purpose**: Performs addition of two numbers.
- **Parameters**: `num1` (number), `num2` (number)
- **Example**: `sum({ num1: 10, num2: 20 })` → `30`

### Prime Tool
- **Function**: `prime({ num })`
- **Purpose**: Determines if a number is prime.
- **Parameters**: `num` (number)
- **Example**: `prime({ num: 13 })` → `true`

### Crypto Price Tool
- **Function**: `getCryptoPrice({ coin })`
- **Purpose**: Fetches current USD price of a cryptocurrency.
- **Parameters**: `coin` (string, e.g., "bitcoin")
- **API**: CoinGecko
- **Example**: `getCryptoPrice({ coin: "ethereum" })` → Current ETH price data

## Dependencies

- `@google/genai`: Google's Generative AI SDK
- `readline-sync`: Synchronous readline for Node.js

## Security Note

- Keep your Google AI API key secure and never commit it to version control.
- The crypto price tool relies on CoinGecko's free API; be mindful of rate limits.

## Future Enhancements

- Add more specialized tools (weather, news, calculations)
- Implement conversation persistence
- Add error handling and retry mechanisms
- Integrate with more AI models for comparison

This AI Agent demonstrates the power of combining large language models with programmatic tools, creating a versatile assistant capable of real-world tasks.