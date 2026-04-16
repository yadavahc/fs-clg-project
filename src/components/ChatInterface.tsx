"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Loader2, Mic, MicOff, RefreshCw, Sparkles, Volume2, VolumeX } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { saveChatMessage } from "@/lib/firestore";
import toast from "react-hot-toast";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  documentContext?: string;
  documentId?: string;
  initialMessage?: string;
}

const SUGGESTED_QUESTIONS = {
  en: [
    "Is this document safe to sign?",
    "What are the main risks?",
    "Explain in simple words",
    "What happens if I don't sign?",
  ],
  hi: [
    "क्या यह दस्तावेज़ सुरक्षित है?",
    "मुख्य जोखिम क्या हैं?",
    "सरल शब्दों में समझाएं",
    "अगर मैं हस्ताक्षर न करूँ?",
  ],
  kn: [
    "ಈ ದಾಖಲೆ ಸುರಕ್ಷಿತವೇ?",
    "ಮುಖ್ಯ ಅಪಾಯಗಳೇನು?",
    "ಸರಳ ಭಾಷೆಯಲ್ಲಿ ವಿವರಿಸಿ",
    "ಸಹಿ ಮಾಡದಿದ್ದರೆ?",
  ],
};

const LANG_CODE: Record<string, string> = {
  en: "en-US",
  hi: "hi-IN",
  kn: "kn-IN",
};

function stripMarkdown(text: string): string {
  return text
    .replace(/#{1,6}\s/g, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/`(.*?)`/g, "$1")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/^\s*[-*+]\s/gm, "")
    .replace(/^\s*\d+\.\s/gm, "")
    .trim();
}

export default function ChatInterface({ documentContext, documentId, initialMessage }: ChatInterfaceProps) {
  const { t, language } = useLanguage();
  const { user } = useAuth();

  const welcomeMsg = () => ({
    id: "welcome",
    role: "assistant" as const,
    content:
      language === "kn"
        ? "ನಮಸ್ಕಾರ! ನಾನು ಲೀಗಲ್ ಸಾಥಿ. ನಿಮ್ಮ ಕಾನೂನು ದಾಖಲೆ ಬಗ್ಗೆ ಯಾವ ಪ್ರಶ್ನೆ ಬೇಕಾದರೂ ಕೇಳಿ!"
        : language === "hi"
        ? "नमस्ते! मैं लीगल साथी हूँ। अपने क़ानूनी दस्तावेज़ के बारे में कुछ भी पूछें!"
        : "Hello! I'm Legal Saathi, your legal assistant. Ask me anything about your document!",
    timestamp: new Date(),
  });

  const [messages, setMessages] = useState<Message[]>([welcomeMsg()]);
  const [input, setInput] = useState(initialMessage || "");
  const [loading, setLoading] = useState(false);

  // Voice input state
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<unknown>(null);

  // TTS state
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [autoSpeak, setAutoSpeak] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const suggestions = SUGGESTED_QUESTIONS[language as keyof typeof SUGGESTED_QUESTIONS] || SUGGESTED_QUESTIONS.en;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (initialMessage) setInput(initialMessage);
  }, [initialMessage]);

  // Reset welcome message when language changes
  useEffect(() => {
    setMessages((prev) => {
      if (prev[0]?.id === "welcome") {
        return [welcomeMsg(), ...prev.slice(1)];
      }
      return prev;
    });
    // Stop any ongoing TTS when language changes
    window.speechSynthesis?.cancel();
    setSpeakingId(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  // ── TTS ────────────────────────────────────────────────
  const speak = useCallback((text: string, id: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    if (speakingId === id) {
      setSpeakingId(null);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(stripMarkdown(text));
    utterance.lang = LANG_CODE[language] || "en-US";
    utterance.rate = 0.9;

    // Pick a voice that matches the language if available
    const voices = window.speechSynthesis.getVoices();
    const match = voices.find((v) => v.lang.startsWith(utterance.lang.split("-")[0]));
    if (match) utterance.voice = match;

    utterance.onstart = () => setSpeakingId(id);
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    window.speechSynthesis.speak(utterance);
  }, [language, speakingId]);

  const stopSpeaking = useCallback(() => {
    window.speechSynthesis?.cancel();
    setSpeakingId(null);
  }, []);

  // ── Voice Input ────────────────────────────────────────
  const startListening = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      toast.error(t("voiceNotSupported"));
      return;
    }

    stopSpeaking();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const recognition = new SR() as any;
    recognition.lang = LANG_CODE[language] || "en-US";
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onstart = () => setIsListening(true);

    recognition.onresult = (event: { results: SpeechRecognitionResultList }) => {
      const transcript = Array.from(event.results)
        .map((r) => r[0].transcript)
        .join("");
      setInput(transcript);

      if (event.results[event.results.length - 1].isFinal) {
        setIsListening(false);
        // Auto-send the voice input
        if (transcript.trim()) {
          sendMessage(transcript.trim());
          setInput("");
        }
      }
    };

    recognition.onerror = () => {
      setIsListening(false);
      toast.error("Voice input failed. Try again.");
    };

    recognition.onend = () => setIsListening(false);

    recognition.start();
    recognitionRef.current = recognition;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, stopSpeaking]);

  const stopListening = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (recognitionRef.current as any)?.stop();
    setIsListening(false);
  }, []);

  // ── Send message ───────────────────────────────────────
  const sendMessage = async (content: string) => {
    if (!content.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    stopSpeaking();

    if (user) {
      saveChatMessage({
        userId: user.uid,
        documentId,
        role: "user",
        content: content.trim(),
        language,
      }).catch(console.error);
    }

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: content.trim(),
          context: documentContext || "",
          history: messages.slice(-6).map((m) => ({ role: m.role, content: m.content })),
          language,
          userId: user?.uid,
          documentId,
        }),
      });

      if (!res.ok) throw new Error("Chat failed");
      const data = await res.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.answer,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Auto-speak the response if enabled
      if (autoSpeak) {
        setTimeout(() => speak(data.answer, assistantMessage.id), 300);
      }

      if (user) {
        saveChatMessage({
          userId: user.uid,
          documentId,
          role: "assistant",
          content: data.answer,
          language,
        }).catch(console.error);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to get response");
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            language === "hi"
              ? "माफ़ करें, मैं आपका प्रश्न नहीं समझ सका। कृपया फिर से प्रयास करें।"
              : language === "kn"
              ? "ಕ್ಷಮಿಸಿ, ನಿಮ್ಮ ಪ್ರಶ್ನೆ ಅರ್ಥವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ."
              : "Sorry, I couldn't process your question. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const clearChat = () => {
    stopSpeaking();
    stopListening();
    setMessages([welcomeMsg()]);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-saathi-100 shadow-saathi overflow-hidden">
      {/* Header */}
      <div className="bg-saathi-700 px-4 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-saathi-600 rounded-xl flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-saathi-200" />
          </div>
          <div>
            <p className="font-semibold text-white text-sm">{t("chatWithSaathi")}</p>
            <p className="text-xs text-saathi-300">AI Legal Assistant</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Auto-speak toggle */}
          <button
            onClick={() => setAutoSpeak((v) => !v)}
            title={t("autoSpeak")}
            className={`p-1.5 rounded-lg transition-colors text-xs flex items-center gap-1 ${
              autoSpeak
                ? "bg-saathi-500 text-white"
                : "text-saathi-300 hover:text-white hover:bg-saathi-600"
            }`}
          >
            {autoSpeak ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline text-xs">{t("autoSpeak")}</span>
          </button>

          {/* Clear chat */}
          <button
            onClick={clearChat}
            className="p-1.5 text-saathi-300 hover:text-white hover:bg-saathi-600 rounded-lg transition-colors"
            title="Clear chat"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-cream-50" style={{ minHeight: 0 }}>
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  message.role === "assistant" ? "bg-saathi-700" : "bg-saathi-200"
                }`}
              >
                {message.role === "assistant" ? (
                  <Bot className="w-4 h-4 text-white" />
                ) : (
                  <User className="w-4 h-4 text-saathi-700" />
                )}
              </div>

              {/* Bubble */}
              <div
                className={`max-w-[80%] ${
                  message.role === "user" ? "items-end" : "items-start"
                } flex flex-col`}
              >
                <div
                  className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    message.role === "user"
                      ? "bg-saathi-700 text-white rounded-tr-sm"
                      : "bg-white border border-saathi-100 text-stone-800 rounded-tl-sm shadow-sm"
                  }`}
                >
                  {message.role === "assistant" ? (
                    <ReactMarkdown className="prose prose-sm prose-stone max-w-none prose-p:my-0.5 prose-li:my-0">
                      {message.content}
                    </ReactMarkdown>
                  ) : (
                    message.content
                  )}
                </div>

                {/* Timestamp + TTS for assistant */}
                <div
                  className={`flex items-center gap-2 mt-1 px-1 ${
                    message.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <span className="text-xs text-stone-400">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>

                  {message.role === "assistant" && (
                    <button
                      onClick={() => speak(message.content, message.id)}
                      title={speakingId === message.id ? t("stopReading") : t("readAloud")}
                      className={`p-1 rounded-md transition-colors ${
                        speakingId === message.id
                          ? "text-saathi-600 bg-saathi-100"
                          : "text-stone-300 hover:text-saathi-500"
                      }`}
                    >
                      {speakingId === message.id ? (
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </motion.div>
                      ) : (
                        <Volume2 className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Loading indicator */}
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3"
            >
              <div className="w-8 h-8 rounded-xl bg-saathi-700 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white border border-saathi-100 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                <div className="flex gap-1 items-center">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-saathi-400 rounded-full"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested questions */}
      {messages.length <= 2 && !loading && (
        <div className="px-4 py-2 border-t border-saathi-50 bg-cream-50">
          <p className="text-xs text-stone-400 mb-2">{t("suggestedQuestions")}</p>
          <div className="flex flex-wrap gap-1.5">
            {suggestions.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="px-3 py-1.5 bg-saathi-50 hover:bg-saathi-100 text-saathi-700 text-xs rounded-full border border-saathi-200 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-3 border-t border-saathi-100 bg-white">
        {/* Listening indicator bar */}
        <AnimatePresence>
          {isListening && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-2 flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-3 py-2"
            >
              <motion.div
                className="w-2.5 h-2.5 bg-red-500 rounded-full"
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <span className="text-xs font-medium text-red-700 flex-1">{t("recording")}</span>
              {/* Live waveform bars */}
              <div className="flex gap-0.5 items-center h-4">
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    className="w-0.5 bg-red-400 rounded-full"
                    animate={{ height: [4, 12 + Math.random() * 6, 4] }}
                    transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.08 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="flex gap-2 items-end">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isListening ? t("recording") : t("typeMessage")}
            rows={1}
            disabled={isListening}
            className="flex-1 resize-none rounded-xl border border-saathi-200 px-3.5 py-2.5 text-sm focus:outline-none focus:border-saathi-500 focus:ring-1 focus:ring-saathi-500 bg-cream-50 text-stone-800 placeholder-stone-400 max-h-32 disabled:opacity-60"
            style={{ minHeight: "42px" }}
          />

          {/* Mic button */}
          <button
            type="button"
            onClick={isListening ? stopListening : startListening}
            disabled={loading}
            title={isListening ? t("stopVoice") : t("tapToSpeak")}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all flex-shrink-0 ${
              isListening
                ? "bg-red-500 hover:bg-red-600 text-white shadow-lg"
                : "bg-saathi-100 hover:bg-saathi-200 text-saathi-700 disabled:opacity-50"
            }`}
          >
            {isListening ? (
              <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 0.8, repeat: Infinity }}>
                <MicOff className="w-4 h-4" />
              </motion.div>
            ) : (
              <Mic className="w-4 h-4" />
            )}
          </button>

          {/* Send button */}
          <button
            type="submit"
            disabled={!input.trim() || loading || isListening}
            className="w-10 h-10 bg-saathi-700 text-white rounded-xl flex items-center justify-center hover:bg-saathi-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </form>

        <p className="text-xs text-stone-400 mt-1.5 text-center">{t("pressEnterHint")}</p>
      </div>
    </div>
  );
}
