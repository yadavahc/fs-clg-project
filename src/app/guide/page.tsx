"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Search } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import GuideCard from "@/components/GuideCard";
import AppShell from "@/components/AppShell";
import { GUIDES } from "@/lib/guides";
import type { Guide } from "@/components/GuideCard";


function GuideContent() {
  const { t, language } = useLanguage();
  const [search, setSearch] = useState("");

  const getTitle = (g: Guide) => {
    if (language === "hi" && g.titleHi) return g.titleHi;
    if (language === "kn" && g.titleKn) return g.titleKn;
    if (language === "ta" && g.titleTa) return g.titleTa;
    if (language === "te" && g.titleTe) return g.titleTe;
    return g.title;
  };

  const filtered = GUIDES.filter((g) =>
    !search ||
    getTitle(g).toLowerCase().includes(search.toLowerCase()) ||
    g.title.toLowerCase().includes(search.toLowerCase()) ||
    g.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-bold text-saathi-800 flex items-center gap-2">
          <BookOpen className="w-6 h-6" /> {t("documentGuides")}
        </h1>
        <p className="text-stone-500 text-sm mt-1">{t("guideSubtitle")}</p>
      </motion.div>

      <div className="relative mb-6">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t("searchGuides")} className="input-field pl-10" />
      </div>

      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="card p-8 text-center">
            <BookOpen className="w-10 h-10 text-saathi-300 mx-auto mb-3" />
            <p className="text-stone-500">{t("noGuidesFound")} "{search}"</p>
          </div>
        ) : (
          filtered.map((guide, i) => (
            <motion.div key={guide.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
              <GuideCard guide={guide} language={language} />
            </motion.div>
          ))
        )}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-8 bg-saathi-50 border border-saathi-200 rounded-2xl p-5">
        <p className="text-sm text-saathi-700">
          💡 <strong>{t("needPersonalizedHelp")}</strong> {t("needPersonalizedHelpDesc")}
        </p>
      </motion.div>
    </div>
  );
}

export default function GuidePage() {
  return <AppShell><GuideContent /></AppShell>;
}
