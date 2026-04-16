# Legal Saathi — AI-Powered Legal Assistant for Rural India

> Built for **HackBLR 2024** — Democratizing legal literacy for farmers, shopkeepers, and rural families across India.

Legal Saathi bridges the gap between complex legal documents and the millions of Indians who struggle to understand them. Upload any legal document, get instant AI-powered risk analysis, ask questions by voice in your language, and receive plain-language explanations — all in Kannada, Hindi, or English.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Vapi Voice AI Integration](#vapi-voice-ai-integration)
- [Qdrant Vector Database (RAG)](#qdrant-vector-database-rag)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [API Routes](#api-routes)
- [Deployment](#deployment)

---

## Features

| Feature | Description |
|---|---|
| **Document Upload** | PDF, DOC, DOCX, images (PNG/JPG), and plain text — up to 10MB |
| **OCR Support** | Tesseract.js extracts text from scanned documents and photos in English, Hindi, and Kannada |
| **AI Risk Analysis** | GPT-4o identifies risky clauses, safe clauses, risk level (low/medium/high), and what happens if you sign or don't |
| **Multilingual** | Full UI and AI responses in Kannada (ಕನ್ನಡ), Hindi (हिंदी), and English |
| **Voice Assistant** | Vapi-powered real-time voice AI — speak questions and get spoken answers |
| **RAG Chat** | Qdrant vector search retrieves the most relevant document chunks to ground AI answers |
| **Legal Guides** | Step-by-step plain-language guides for home loans, land documents, education loans, and more |
| **Auth & History** | Firebase Authentication + Firestore to save documents and chat history per user |

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 15 (App Router, TypeScript) |
| **Styling** | Tailwind CSS + Framer Motion |
| **Authentication** | Firebase Auth (email/password) |
| **Database** | Cloud Firestore |
| **AI / LLM** | OpenAI GPT-4o (analysis + chat), text-embedding-3-small (embeddings) |
| **Voice AI** | Vapi (real-time voice conversations) |
| **Vector DB** | Qdrant Cloud (semantic document search / RAG) |
| **OCR** | Tesseract.js (multi-language OCR) |
| **PDF Parsing** | pdf-parse |
| **Word Parsing** | mammoth |

---

## Architecture

```
User Browser
     │
     ├── Firebase Auth  (client-side login/signup)
     ├── Firestore      (client-side reads/writes — authenticated)
     └── Next.js App
          │
          ├── /api/upload     → Extract text (pdf-parse / mammoth / Tesseract)
          │                     Store embeddings → Qdrant Cloud
          │
          ├── /api/analyze    → GPT-4o risk analysis → update Firestore
          │
          └── /api/chat       → Embed question → Qdrant semantic search (RAG)
                                → GPT-4o answer with retrieved context
```

**Key design decision:** Firestore writes happen client-side (where Firebase Auth context exists). The API routes only perform compute-heavy tasks (text extraction, embeddings, LLM calls) so they never need admin credentials.

---

## Vapi Voice AI Integration

[Vapi](https://vapi.ai) powers the real-time voice assistant that lets users **speak questions** about their documents and **hear answers** — no typing required, crucial for low-literacy users.

### How it works

1. User clicks the microphone button in the floating `VoiceAssistant` widget.
2. The browser establishes a real-time WebRTC call with Vapi's infrastructure.
3. Vapi transcribes speech → sends it to GPT-4o with a custom system prompt that includes the document context.
4. GPT-4o's text response is spoken back using ElevenLabs TTS voices.
5. The transcript is surfaced in the UI so users can follow along.

### Language support

| Language | Voice (ElevenLabs) |
|---|---|
| English | `21m00Tcm4TlvDq8ikWAM` (Rachel) |
| Hindi | `pNInz6obpgDQGcFmaJgB` (Adam) |
| Kannada | English voice with Kannada system prompt |

### Configuration

```env
NEXT_PUBLIC_VAPI_PUBLIC_KEY=your_vapi_public_key
VAPI_PRIVATE_KEY=your_vapi_private_key
```

The assistant is initialized lazily in [`src/components/VoiceAssistant.tsx`](src/components/VoiceAssistant.tsx) using the `@vapi-ai/web` SDK. The Vapi call config is built at runtime and injects up to 1000 characters of document context into the system prompt so the assistant has grounding for questions about the uploaded document.

```ts
// Simplified from VoiceAssistant.tsx
vapi.start({
  model: {
    provider: "openai",
    model: "gpt-4o",
    messages: [{
      role: "system",
      content: `You are Legal Saathi. ${langInstruction}
                Document context: ${documentContext.substring(0, 1000)}`
    }]
  },
  voice: { provider: "11labs", voiceId: "..." },
  firstMessage: "Hello! I'm Legal Saathi. How can I help you today?"
});
```

---

## Qdrant Vector Database (RAG)

[Qdrant](https://qdrant.tech) is a high-performance vector database used to implement **Retrieval-Augmented Generation (RAG)** — giving the AI accurate, document-grounded answers instead of hallucinations.

### Cluster

- **Cluster ID:** `bd3b26b1-5767-4676-80ae-26529c205eea`
- **Endpoint:** `https://bd3b26b1-5767-4676-80ae-26529c205eea.eu-west-2-0.aws.cloud.qdrant.io`
- **Collection:** `legal_saathi_docs`
- **Vector size:** `1536` (OpenAI `text-embedding-3-small`)
- **Distance metric:** Cosine similarity

### Upload pipeline

When a document is uploaded (`/api/upload`):

1. Text is extracted from the file (PDF / DOCX / image / TXT).
2. Text is chunked into ~300-word segments with 50-word overlap using `chunkText()`.
3. Up to 20 chunks are embedded via OpenAI `text-embedding-3-small`.
4. Chunks + embeddings are upserted into Qdrant with metadata: `{ documentId, userId, chunkIndex, text, fileName }`.

### RAG chat retrieval

When a user asks a question (`/api/chat`):

1. The question is embedded using the same `text-embedding-3-small` model.
2. Qdrant performs a vector similarity search filtered by `userId` and optionally `documentId`.
3. The top-3 most relevant chunks are prepended to the GPT-4o context window.
4. GPT-4o answers with accurate, document-specific information.

```ts
// From src/lib/qdrant.ts
const embedding = await generateEmbedding(question);
const chunks = await searchSimilarChunks(embedding, userId, documentId, 3);
const ragContext = chunks.map(c => c.text).join("\n\n");
// ragContext is passed as part of the GPT-4o system prompt
```

### Configuration

```env
QDRANT_URL=https://bd3b26b1-5767-4676-80ae-26529c205eea.eu-west-2-0.aws.cloud.qdrant.io
QDRANT_API_KEY=your_qdrant_api_key
QDRANT_COLLECTION=legal_saathi_docs
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- Firebase project (Firestore + Auth enabled)
- OpenAI API key
- Vapi account
- Qdrant Cloud cluster (or local Qdrant instance)

### Installation

```bash
git clone https://github.com/yadavahc/Hack-Blr.git
cd Hack-Blr
npm install
```

### Configure environment

Copy the example below into `.env.local` and fill in your keys:

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# OpenAI
OPENAI_API_KEY=

# Vapi
NEXT_PUBLIC_VAPI_PUBLIC_KEY=
VAPI_PRIVATE_KEY=

# Qdrant
QDRANT_URL=
QDRANT_API_KEY=
QDRANT_COLLECTION=legal_saathi_docs

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Deploy Firestore indexes

```bash
npx firebase-tools deploy --only firestore:indexes --project YOUR_PROJECT_ID
```

### Run

```bash
npm run dev
# Open http://localhost:3000
```

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_FIREBASE_*` | Yes | Firebase client config (Auth + Firestore) |
| `OPENAI_API_KEY` | Yes | GPT-4o for analysis/chat, text-embedding-3-small for RAG |
| `NEXT_PUBLIC_VAPI_PUBLIC_KEY` | Yes | Vapi public key for browser-side voice calls |
| `VAPI_PRIVATE_KEY` | Yes | Vapi private key for server-side operations |
| `QDRANT_URL` | Yes | Qdrant cluster HTTP endpoint |
| `QDRANT_API_KEY` | Yes | Qdrant API key |
| `QDRANT_COLLECTION` | No | Collection name (default: `legal_saathi_docs`) |
| `NEXT_PUBLIC_APP_URL` | No | App base URL |

> Without `OPENAI_API_KEY`, the app falls back to mock analysis and mock chat responses so it still runs for demo purposes.

---

## Project Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/          # Login page
│   │   └── signup/         # Signup page
│   ├── (app)/              # Authenticated layout
│   ├── analyze/            # Document upload + risk analysis
│   ├── chat/               # Standalone chat page
│   ├── dashboard/          # User document history
│   ├── guide/              # Legal guides
│   └── api/
│       ├── upload/         # Text extraction + Qdrant embedding
│       ├── analyze/        # GPT-4o document analysis
│       └── chat/           # RAG chat with Qdrant + GPT-4o
├── components/
│   ├── DocumentUpload.tsx  # Dropzone + Firestore save (client-side)
│   ├── RiskAnalysis.tsx    # Analysis results display
│   ├── ChatInterface.tsx   # Text chat UI
│   ├── VoiceAssistant.tsx  # Vapi voice widget
│   ├── AppShell.tsx        # Authenticated layout shell
│   └── Navbar.tsx
├── lib/
│   ├── firebase.ts         # Firebase client init
│   ├── firestore.ts        # Firestore CRUD helpers
│   ├── openai.ts           # GPT-4o + embeddings
│   └── qdrant.ts           # Qdrant vector store helpers
└── context/
    ├── AuthContext.tsx     # Firebase Auth state
    └── LanguageContext.tsx # i18n (en / hi / kn)
```

---

## API Routes

### `POST /api/upload`

Extracts text from uploaded files and stores embeddings in Qdrant.

**Request:** `multipart/form-data` — `file`, `userId`, `documentId`

**Response:**
```json
{
  "success": true,
  "documentId": "abc123",
  "text": "extracted document text...",
  "textLength": 4200
}
```

### `POST /api/analyze`

Runs GPT-4o risk analysis on extracted document text.

**Request:** `{ text, language, userId, documentId }`

**Response:** Full `DocumentAnalysis` object with `summary`, `keyClauses`, `riskLevel`, `riskyPoints`, `safePoints`, `ifYouSign`, `ifYouDontSign`, `recommendations`, `simplifiedExplanation`.

### `POST /api/chat`

Answers user questions using RAG (Qdrant) + GPT-4o.

**Request:** `{ question, context, history, language, userId, documentId }`

**Response:** `{ answer: "..." }`

---

## Deployment

The app is built with Next.js and can be deployed to **Vercel** (recommended):

```bash
npx vercel --prod
```

Set all environment variables in the Vercel dashboard. The Firestore indexes are pre-deployed via `firestore.indexes.json`.

---

## License

MIT — Built with love for rural India at HackBLR 2024.
