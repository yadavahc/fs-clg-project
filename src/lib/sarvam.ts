// Sarvam AI — specialised for Indian languages (hi, kn, ta, te, bn, mr, gu, pa, ml, od)
// Docs: https://docs.sarvam.ai

const SARVAM_BASE = "https://api.sarvam.ai";
const API_KEY = process.env.SARVAM_API_KEY || "";

// Maps our language codes → Sarvam BCP-47 locale codes
const LANG_TO_SARVAM: Record<string, string> = {
  hi: "hi-IN",
  kn: "kn-IN",
  ta: "ta-IN",
  te: "te-IN",
  en: "en-IN",
};

// Sarvam speaker IDs per language (valid bulbul:v2 speakers)
const SPEAKER_MAP: Record<string, string> = {
  hi: "anushka",
  kn: "anushka",
  ta: "kavitha",
  te: "manisha",
  en: "anushka",
};

export function isSarvamConfigured(): boolean {
  return Boolean(API_KEY);
}

export function isSarvamLanguage(language: string): boolean {
  return Boolean(LANG_TO_SARVAM[language]);
}

/**
 * Text-to-speech using Sarvam AI.
 * Returns a base64-encoded WAV audio string (data URI ready).
 */
export async function sarvamTTS(text: string, language: string): Promise<string> {
  if (!API_KEY) throw new Error("Sarvam API key not configured");

  const locale = LANG_TO_SARVAM[language] || "hi-IN";
  const speaker = SPEAKER_MAP[language] || "meera";

  const res = await fetch(`${SARVAM_BASE}/text-to-speech`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-subscription-key": API_KEY,
    },
    body: JSON.stringify({
      inputs: [text.substring(0, 500)],
      target_language_code: locale,
      speaker,
      pitch: 0,
      pace: 1.0,
      loudness: 1.5,
      speech_sample_rate: 22050,
      enable_preprocessing: true,
      model: "bulbul:v2",
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Sarvam TTS failed: ${err}`);
  }

  const data = await res.json();
  // Sarvam returns { audios: ["<base64-wav>", ...] }
  const audioB64: string = data.audios?.[0];
  if (!audioB64) throw new Error("Sarvam returned no audio");
  return `data:audio/wav;base64,${audioB64}`;
}

/**
 * Speech-to-text using Sarvam AI.
 * Accepts a Blob of audio data and returns the transcribed text.
 */
export async function sarvamSTT(audioBlob: Blob, language: string): Promise<string> {
  if (!API_KEY) throw new Error("Sarvam API key not configured");

  const locale = LANG_TO_SARVAM[language] || "hi-IN";
  const formData = new FormData();
  formData.append("file", audioBlob, "audio.wav");
  formData.append("language_code", locale);
  formData.append("model", "saarika:v1");
  formData.append("with_timestamps", "false");

  const res = await fetch(`${SARVAM_BASE}/speech-to-text`, {
    method: "POST",
    headers: { "api-subscription-key": API_KEY },
    body: formData,
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Sarvam STT failed: ${err}`);
  }

  const data = await res.json();
  return data.transcript || "";
}
