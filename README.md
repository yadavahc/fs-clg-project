# Legal Saathi — AI-Powered Legal Assistant

> A full-stack project aimed at democratizing legal literacy for everyone.

Legal Saathi is an application designed to bridge the gap between complex legal documents and the general public. Users can upload legal documents, get instant AI-powered risk analysis, ask questions in their native language, receive plain-language explanations, and generate ready-to-use legal forms.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Deployment](#deployment)

---

## Features

- **Document Upload**: Supports PDF, DOCX, images (PNG/JPG), and plain text.
- **AI-Powered Analysis**: Identifies risky clauses, assesses risk levels, and provides summaries of documents.
- **Multilingual Support**: UI and AI responses available in Kannada, Hindi, Telugu, and English.
- **Voice Interaction**: Supports voice input (Speech-to-Text) and output (Text-to-Speech) in multiple Indian languages.
- **RAG-Based Chat**: Uses a Vector Database for Retrieval-Augmented Generation to provide accurate, context-aware answers.
- **Legal Form Builder**: Generates common legal documents from templates.
- **Authentication**: Secure user authentication and data storage with Firebase.

---

## Tech Stack

- **Framework**: Next.js 15 (App Router, TypeScript)
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth
- **Database**: Cloud Firestore
- **AI / LLM**: Google Gemini
- **Voice STT/TTS**: Browser Web Speech API & Sarvam AI
- **Vector DB**: Qdrant Cloud (for RAG)
- **PDF Generation**: jsPDF
- **OCR**: Tesseract.js

---

## Getting Started

### Prerequisites

- Node.js 18+
- A Firebase project (with Firestore and Auth enabled)
- API keys for Google Gemini, Sarvam AI, and Qdrant.

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yadavahc/fs-clg-project.git
    cd fs-clg-project
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Set up your environment variables by creating a `.env.local` file. See the [Environment Variables](#environment-variables) section for details.

4.  Run the development server:
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:3000`.

---

## Environment Variables

Create a `.env.local` file in the root of your project and add the following variables:

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Gemini AI
GEMINI_API_KEY=

# Sarvam AI (TTS/STT for Indian languages)
SARVAM_API_KEY=

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

---

## Project Structure

The project follows a standard Next.js App Router structure.

```
src/
├── app/
│   ├── (auth)/         # Auth pages (login, signup)
│   ├── (app)/          # Main application pages
│   └── api/            # API routes for backend logic
├── components/         # Reusable React components
├── lib/                # Helper functions and third-party clients
├── context/            # React context providers
└── models/             # TypeScript models/types
```

---

## Deployment

This application is ready to be deployed on Vercel.

1.  Push your code to a Git repository.
2.  Import the repository on Vercel.
3.  Add the required environment variables in the Vercel project settings.
4.  Deploy!

---

## License

This project is licensed under the MIT License.
