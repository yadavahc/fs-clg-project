import { NextRequest, NextResponse } from "next/server";
import { DocumentAnalysis } from "@/lib/firestore";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  let body: { text?: string; language?: string; userId?: string; documentId?: string; fileName?: string } = {};

  try {
    body = await request.json();
    const { text, language = "en", documentId } = body;

    if (!text || text.trim().length < 20) {
      return NextResponse.json({ error: "No usable text extracted from document" }, { status: 400 });
    }

    const { isGeminiConfigured, analyzeDocumentGemini } = await import("@/lib/gemini");

    if (!isGeminiConfigured()) {
      return NextResponse.json({ error: "AI not configured" }, { status: 503 });
    }

    const analysis: DocumentAnalysis = await analyzeDocumentGemini(text, language);
    return NextResponse.json({ success: true, analysis, documentId });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("Analysis error:", msg);
    return NextResponse.json({ error: `Analysis failed: ${msg}` }, { status: 500 });
  }
}
