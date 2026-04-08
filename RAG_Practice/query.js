import * as dotenv from "dotenv";
dotenv.config();

import readlineSync from "readline-sync";
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import { Pinecone } from "@pinecone-database/pinecone";
import Groq from "groq-sdk";

// ✅ Groq setup (FREE + FAST)
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function chatting(question) {

  const queries = question;

  // ✅ Embeddings (FREE)
  const embeddings = new HuggingFaceInferenceEmbeddings({
    apiKey: process.env.HUGGINGFACE_API_KEY,
    model: "BAAI/bge-small-en-v1.5",
  });

  const queryVector = await embeddings.embedQuery(queries);

  // ✅ Pinecone
  const pinecone = new Pinecone();
  const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX_NAME);

  const searchResults = await pineconeIndex.query({
    topK: 5,
    vector: queryVector,
    includeMetadata: true,
  });

  // ✅ Build context
  const context = searchResults.matches
    .map(match => match.metadata.text)
    .join("\n\n---\n\n");

  // ✅ Prompt
  const prompt = `
You are a Data Structures and Algorithms expert.

Answer ONLY using the context below.
If answer is not present, say:
"I could not find the answer in the provided document."

Context:
${context}

Question:
${question}
`;

  // ✅ Groq LLM (SUPER FAST + FREE)
  const response = await groq.chat.completions.create({
  model: "llama-3.1-8b-instant",
  messages: [
    {
      role: "user",
      content: prompt,
    },
  ],
});

  console.log("\n🧠 Answer:\n");
  console.log(response.choices[0].message.content);
}


// ✅ CLI loop
async function main() {
  const userProblem = readlineSync.question("\nAsk me anything --> ");
  await chatting(userProblem);
  main();
}

main();