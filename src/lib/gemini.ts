import { GoogleGenerativeAI } from "@google/generative-ai";
import { DocumentAnalysis } from "./firestore";

// Try models in order — each has its own separate quota bucket on the free tier
const FREE_KEY = process.env.GEMINI_API_FREE_MODEL || "";
const MODELS: { name: string; apiVersion: string }[] = [
  { name: "gemini-2.5-flash", apiVersion: "v1beta" },
  { name: "gemini-2.5-flash-lite", apiVersion: "v1beta" },
  { name: "gemini-2.0-flash", apiVersion: "v1beta" },
  { name: "gemini-2.0-flash-lite", apiVersion: "v1beta" },
];

const LANG_INSTRUCTION: Record<string, string> = {
  en: "Respond in English.",
  hi: "Respond in Hindi language.",
  kn: "Respond in Kannada language.",
  ta: "Respond in Tamil language.",
  te: "Respond in Telugu language.",
};

function getLangInstruction(language: string): string {
  return LANG_INSTRUCTION[language] || LANG_INSTRUCTION.en;
}

export function isGeminiConfigured(): boolean {
  return Boolean(FREE_KEY);
}

async function generate(prompt: string): Promise<string> {
  if (!FREE_KEY) throw new Error("GEMINI_API_FREE_MODEL key not set");
  const genAI = new GoogleGenerativeAI(FREE_KEY);

  for (const { name, apiVersion } of MODELS) {
    try {
      const model = genAI.getGenerativeModel({ model: name }, { apiVersion });
      const result = await model.generateContent(prompt);
      return result.response.text().trim();
    } catch (err) {
      const msg = (err as Error).message;
      const isQuota = msg.includes("429") || msg.includes("quota") || msg.includes("RESOURCE_EXHAUSTED");
      const isNotFound = msg.includes("404") || msg.includes("is not found for API version");
      console.warn(`${name} failed: ${msg}`);
      if (isQuota || isNotFound) {
        continue;
      }
      throw err; // non-quota, non-404 error — bubble up
    }
  }
  throw new Error("All Gemini models are rate-limited. Please try again in a few minutes.");
}

export async function analyzeDocumentGemini(
  text: string,
  language: string = "en"
): Promise<DocumentAnalysis> {
  const prompt = `You are a legal expert helping rural and low-literacy users in India understand legal documents.
${getLangInstruction(language)}

IMPORTANT: Analyze the ACTUAL document text provided below. Base ALL insights on the real content — do NOT give generic responses.

Output ONLY a raw JSON object. No markdown, no code fences, no explanation — just the JSON:
{
  "summary": "2-3 sentence plain-language summary of THIS specific document",
  "keyClauses": ["3-5 key clauses extracted from the actual document in simple language"],
  "riskLevel": "low|medium|high",
  "riskyPoints": [{"clause":"exact clause or phrase from document","risk":"why it is risky","severity":"low|medium|high","alternative":"safer wording suggestion"}],
  "safePoints": ["favorable or protective clauses found in this document"],
  "ifYouSign": "specific consequences based on this document's terms",
  "ifYouDontSign": "specific consequences of NOT signing based on this document",
  "recommendations": ["actionable advice specific to this document"],
  "simplifiedExplanation": "one paragraph a person with basic literacy can understand, about THIS document"
}

Document text:
${text.substring(0, 8000)}`;

  const raw = await generate(prompt);
  let cleaned = raw.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start !== -1 && end !== -1) cleaned = cleaned.slice(start, end + 1);
  return JSON.parse(cleaned) as DocumentAnalysis;
}

export async function chatWithDocumentGemini(
  question: string,
  context: string = "",
  history: { role: "user" | "assistant"; content: string }[],
  language: string = "en"
): Promise<string> {
  const systemPrompt = `You are "Legal Saathi", a helpful legal assistant for rural and low-literacy users in India.
${getLangInstruction(language)}
- Explain legal concepts in very simple terms using everyday analogies (farming, markets, etc.)
- Be empathetic and supportive. Warn about risks clearly. Suggest consulting a lawyer when needed.
- Write grammatically correct, clear sentences. Avoid jargon.
${context ? `\nDocument context:\n${context.substring(0, 4000)}` : ""}`;

  const historyText = history
    .slice(-6)
    .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
    .join("\n");

  const fullPrompt = `${systemPrompt}\n\n${historyText ? `Previous conversation:\n${historyText}\n\n` : ""}User: ${question}\nAssistant:`;
  return generate(fullPrompt);
}

export async function translateTextGemini(text: string, targetLanguage: string): Promise<string> {
  const langMap: Record<string, string> = {
    kn: "Kannada", hi: "Hindi", ta: "Tamil", te: "Telugu", en: "English",
  };
  const lang = langMap[targetLanguage] || "English";
  return generate(`Translate to ${lang}. Keep legal terms accurate but explanation simple:\n\n${text}`);
}

export async function generateEmbeddingGemini(text: string): Promise<number[]> {
  if (!FREE_KEY) throw new Error("No embedding key configured");
  const genAI = new GoogleGenerativeAI(FREE_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-embedding-001" }, { apiVersion: "v1beta" });
  const result = await model.embedContent(text.substring(0, 8000));
  return result.embedding.values;
}
