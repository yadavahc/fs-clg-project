import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(request: NextRequest) {
  try {
    const { text, language = "en" } = await request.json();
    if (!text) return NextResponse.json({ error: "No text provided" }, { status: 400 });

    const { isSarvamConfigured, isSarvamLanguage, sarvamTTS } = await import("@/lib/sarvam");

    // Use Sarvam for Indian languages when configured
    if (isSarvamConfigured() && isSarvamLanguage(language)) {
      const audioDataUri = await sarvamTTS(text, language);
      return NextResponse.json({ audio: audioDataUri, provider: "sarvam" });
    }

    // Signal client to use browser's Web Speech API
    return NextResponse.json({ audio: null, provider: "browser" });
  } catch (error) {
    console.error("TTS error:", error);
    // On any error, fall back to browser TTS
    return NextResponse.json({ audio: null, provider: "browser" });
  }
}
