"use client";

import { useState, useCallback, useRef } from "react";

export function useTTS() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const stop = useCallback(() => {
    // Stop Sarvam audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    // Stop browser speech
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  }, []);

  const speak = useCallback(
    async (text: string, language: string) => {
      if (isSpeaking) { stop(); return; }

      setIsSpeaking(true);
      try {
        // Try Sarvam TTS via API for Indian languages
        if (language !== "en") {
          const res = await fetch("/api/tts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text, language }),
          });
          const data = await res.json();

          if (data.audio && data.provider === "sarvam") {
            const audio = new Audio(data.audio);
            audioRef.current = audio;
            audio.onended = () => { setIsSpeaking(false); audioRef.current = null; };
            audio.onerror = () => { setIsSpeaking(false); audioRef.current = null; };
            await audio.play();
            return;
          }
        }

        // Fallback: browser Web Speech API
        if (!window.speechSynthesis) { setIsSpeaking(false); return; }
        const langMap: Record<string, string> = {
          en: "en-IN", hi: "hi-IN", kn: "kn-IN", ta: "ta-IN", te: "te-IN",
        };
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = langMap[language] || "en-IN";
        utterance.rate = 0.9;
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
      } catch {
        setIsSpeaking(false);
      }
    },
    [isSpeaking, stop]
  );

  return { speak, stop, isSpeaking };
}
