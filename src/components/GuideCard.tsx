"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, CheckCircle2, AlertCircle, FileText, ArrowRight, Volume2, VolumeX } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useTTS } from "@/lib/useTTS";
import type { Language } from "@/lib/translations";

interface GuideStep {
  title: string;
  description: string;
  documents?: string[];
  warnings?: string[];
}

interface Guide {
  id: string;
  title: string;
  titleHi?: string;
  titleKn?: string;
  titleTa?: string;
  titleTe?: string;
  icon: string;
  description: string;
  descriptionHi?: string;
  descriptionKn?: string;
  descriptionTa?: string;
  descriptionTe?: string;
  steps: GuideStep[];
  stepsHi?: GuideStep[];
  stepsKn?: GuideStep[];
  stepsTa?: GuideStep[];
  stepsTe?: GuideStep[];
  estimatedTime: string;
  difficulty: "easy" | "medium" | "hard";
}

interface GuideCardProps {
  guide: Guide;
  language?: Language;
}

export default function GuideCard({ guide, language = "en" }: GuideCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const { t } = useLanguage();
  const { speak, stop, isSpeaking } = useTTS();

  const title =
    language === "hi" && guide.titleHi ? guide.titleHi
    : language === "kn" && guide.titleKn ? guide.titleKn
    : language === "ta" && guide.titleTa ? guide.titleTa
    : language === "te" && guide.titleTe ? guide.titleTe
    : guide.title;

  const description =
    language === "hi" && guide.descriptionHi ? guide.descriptionHi
    : language === "kn" && guide.descriptionKn ? guide.descriptionKn
    : language === "ta" && guide.descriptionTa ? guide.descriptionTa
    : language === "te" && guide.descriptionTe ? guide.descriptionTe
    : guide.description;

  const steps =
    language === "hi" && guide.stepsHi ? guide.stepsHi
    : language === "kn" && guide.stepsKn ? guide.stepsKn
    : language === "ta" && guide.stepsTa ? guide.stepsTa
    : language === "te" && guide.stepsTe ? guide.stepsTe
    : guide.steps;

  const difficultyColor = {
    easy: "text-green-700 bg-green-100",
    medium: "text-amber-700 bg-amber-100",
    hard: "text-red-700 bg-red-100",
  };

  const difficultyLabel = {
    easy: t("difficultyEasy"),
    medium: t("difficultyMedium"),
    hard: t("difficultyHard"),
  };

  return (
    <div className="bg-white rounded-2xl border border-saathi-100 shadow-sm overflow-hidden hover:shadow-saathi transition-all">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-5 text-left flex items-start gap-4"
      >
        <div className="text-3xl flex-shrink-0">{guide.icon}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-stone-800 text-base leading-tight">{title}</h3>
            {expanded ? (
              <ChevronUp className="w-5 h-5 text-saathi-400 flex-shrink-0 mt-0.5" />
            ) : (
              <ChevronDown className="w-5 h-5 text-saathi-400 flex-shrink-0 mt-0.5" />
            )}
          </div>
          <p className="text-sm text-stone-500 mt-1">{description}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs text-stone-400">⏱ {guide.estimatedTime}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${difficultyColor[guide.difficulty]}`}>
              {difficultyLabel[guide.difficulty]}
            </span>
            <span className="text-xs text-stone-400">{steps.length} {t("stepsLabel")}</span>
          </div>
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="border-t border-saathi-100 p-5">
              <div className="flex gap-1 mb-4 overflow-x-auto pb-1">
                {steps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveStep(i)}
                    className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      activeStep === i
                        ? "bg-saathi-700 text-white"
                        : "bg-saathi-50 text-saathi-600 hover:bg-saathi-100"
                    }`}
                  >
                    {t("stepLabel")} {i + 1}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-3"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-saathi-700 text-white rounded-lg flex items-center justify-center text-xs font-bold">
                      {activeStep + 1}
                    </div>
                    <h4 className="font-semibold text-stone-800">{steps[activeStep].title}</h4>
                  </div>

                  <p className="text-sm text-stone-600 leading-relaxed pl-9">
                    {steps[activeStep].description}
                  </p>

                  {steps[activeStep].documents && steps[activeStep].documents!.length > 0 && (
                    <div className="pl-9">
                      <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-2 flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5" /> {t("requiredDocuments")}
                      </p>
                      <div className="space-y-1">
                        {steps[activeStep].documents!.map((doc, j) => (
                          <div key={j} className="flex items-center gap-2 text-sm text-stone-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                            {doc}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {steps[activeStep].warnings && steps[activeStep].warnings!.length > 0 && (
                    <div className="pl-9">
                      <p className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-2 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {t("watchOut")}
                      </p>
                      <div className="space-y-1">
                        {steps[activeStep].warnings!.map((warn, j) => (
                          <div key={j} className="flex items-start gap-2 text-sm text-red-700 bg-red-50 rounded-lg p-2">
                            <AlertCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                            {warn}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-between items-center mt-4 pt-3 border-t border-saathi-100">
                <button
                  onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                  disabled={activeStep === 0}
                  className="text-sm text-saathi-600 hover:text-saathi-800 disabled:opacity-30 transition-colors"
                >
                  ← {t("previous")}
                </button>

                {/* Listen button */}
                <button
                  onClick={() => {
                    const stepData = steps[activeStep];
                    const textToRead = `${stepData.title}. ${stepData.description}`;
                    speak(textToRead, language);
                  }}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                    isSpeaking
                      ? "bg-red-100 text-red-700 hover:bg-red-200"
                      : "bg-saathi-100 text-saathi-700 hover:bg-saathi-200"
                  }`}
                  title={isSpeaking ? t("stopReading") : t("readAloud")}
                >
                  {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  {isSpeaking ? t("stopReading") : t("readAloud")}
                </button>

                {activeStep < steps.length - 1 ? (
                  <button
                    onClick={() => setActiveStep(activeStep + 1)}
                    className="flex items-center gap-1 text-sm text-saathi-700 font-medium hover:text-saathi-900 transition-colors"
                  >
                    {t("nextStep")} <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <span className="flex items-center gap-1 text-sm text-green-600 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {t("complete")}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export type { Guide };
