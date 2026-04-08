# 🚀 RAG Chatbot (PDF + Pinecone + Groq)

A complete **Retrieval-Augmented Generation (RAG)** chatbot built using:

* 📄 PDF as knowledge base
* 🧠 HuggingFace embeddings
* 📦 Pinecone vector database
* ⚡ Groq (Llama 3.1) for fast LLM responses

---

## 📌 Features

* Ask questions from your PDF 📄
* Fast semantic search using vector embeddings ⚡
* Accurate answers using retrieved context 🧠
* Fully **free stack** (no OpenAI required) 💰

---

## 🧠 Architecture

```
User Question
     ↓
HuggingFace Embedding (384-dim)
     ↓
Pinecone Vector Search
     ↓
Top-K Relevant Chunks
     ↓
Groq (Llama 3.1)
     ↓
Final Answer
```

---

## 📂 Project Structure

```
RAG_Practice/
│── index.js        # PDF ingestion + vector storage
│── query.js        # Chatbot (retrieval + answer)
│── dsa.pdf         # Input document
│── .env            # API keys
│── package.json
```

---

## ⚙️ Setup Guide

### 1️⃣ Install dependencies

```bash
npm install
```

If you face dependency errors:

```bash
npm install --legacy-peer-deps
```

---

### 2️⃣ Setup environment variables

Create a `.env` file:

```
HUGGINGFACE_API_KEY=your_huggingface_key
PINECONE_API_KEY=your_pinecone_key
PINECONE_INDEX_NAME=your_index_name
GROQ_API_KEY=your_groq_key
```

---

## 📥 Step 1: Ingest PDF into Pinecone

Run:

```bash
node index.js
```

### What happens:

* Loads PDF (`dsa.pdf`)
* Splits into chunks (1000 size, 200 overlap)
* Converts into embeddings (384-dim)
* Stores in Pinecone vector DB

---

## 💬 Step 2: Ask Questions

Run:

```bash
node query.js
```

Example:

```
Ask me anything --> what is avl tree
```

---

## 🧠 How It Works

### 🔹 1. Document Processing

* PDF is loaded using LangChain
* Split into smaller chunks for better retrieval

### 🔹 2. Embeddings

* Model: `BAAI/bge-small-en-v1.5`
* Converts text → vector (384 dimensions)

### 🔹 3. Vector Database

* Pinecone stores embeddings
* Performs similarity search

### 🔹 4. Retrieval

* Top 5 most relevant chunks are fetched

### 🔹 5. Generation

* Groq LLM (`llama-3.1-8b-instant`)
* Generates answer using context

---

## 🧪 Example Output

```
🧠 Answer:

An AVL tree is a self-balancing binary search tree where the height difference between left and right subtrees is at most 1.
```

---

## ⚠️ Common Issues & Fixes

### ❌ Pinecone dimension error

✔ Fix: Ensure index dimension = **384**

---

### ❌ Dependency errors

✔ Fix:

```bash
npm install --legacy-peer-deps
```

---

### ❌ API errors

✔ Check:

* API keys in `.env`
* Internet connection
* Pinecone index name

---

## 🚀 Future Improvements

* 🔁 Chat memory (multi-turn conversation)
* 📚 Multiple PDFs support
* 🌐 Web UI (React / Next.js)
* ⚡ Streaming responses
* 🎯 Better retrieval (reranking)

---

## 🧠 Tech Stack

* Node.js
* LangChain
* Pinecone
* HuggingFace
* Groq (Llama 3.1)

---

## 📜 License

MIT

---

## 🙌 Acknowledgements

* LangChain
* Pinecone
* HuggingFace
* Groq

---

## 💡 Author Note

This project demonstrates a **production-ready RAG pipeline**.
Great for learning AI apps, semantic search, and chatbot systems.

---
