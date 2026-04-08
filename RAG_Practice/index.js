import * as dotenv from 'dotenv';
dotenv.config();

import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
// import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { Pinecone } from '@pinecone-database/pinecone';
import { PineconeStore } from '@langchain/pinecone';
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";

async function loaddata(){

    const PDF_PATH = './dsa.pdf';
    const pdfLoader = new PDFLoader(PDF_PATH);
    const rawDocs = await pdfLoader.load();
    // console.log(rawDocs);

    console.log("load data");


    const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });
   const chunkedDocs = await textSplitter.splitDocuments(rawDocs);
//    console.log(chunkedDocs);

console.log("data chunking");
// console.log("API KEY:", process.env.GEMINI_API_KEY);

  const embeddings = new HuggingFaceInferenceEmbeddings({
  apiKey: process.env.HUGGINGFACE_API_KEY,
  model: "BAAI/bge-small-en-v1.5", // faster + free
});

  const test = await embeddings.embedQuery("hello world");
// console.log("Embedding length:", test.length);
  const pinecone = new Pinecone();
  const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX_NAME)


  await PineconeStore.fromDocuments(chunkedDocs, embeddings, {
      pineconeIndex,
      maxConcurrency: 5,
  });

  console.log("data store in vectorDB");
}

loaddata();