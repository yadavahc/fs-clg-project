"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText, Home, GraduationCap, ShieldAlert, Stamp,
  BadgeCheck, Users, Building2, Bell, Wallet, ChevronRight,
  ArrowLeft, Download, Printer, CheckCircle2
} from "lucide-react";
import {
  LEGAL_TEMPLATES,
  TEMPLATE_TITLES,
  TEMPLATE_DESCRIPTIONS,
  TemplateDefinition,
} from "@/lib/legalTemplates";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  Property: Home,
  Finance: Wallet,
  Legal: ShieldAlert,
  Government: BadgeCheck,
};

const TEMPLATE_ICONS: Record<string, React.ElementType> = {
  "land-purchase": Building2,
  "house-rent": Home,
  "education-loan": GraduationCap,
  "police-complaint": ShieldAlert,
  affidavit: Stamp,
  "income-certificate": BadgeCheck,
  "caste-certificate": Users,
  "property-dispute": Building2,
  "tenant-notice": Bell,
  "loan-repayment": Wallet,
};

const CATEGORY_COLORS: Record<string, string> = {
  Property: "bg-blue-50 text-blue-700 border-blue-200",
  Finance: "bg-green-50 text-green-700 border-green-200",
  Legal: "bg-red-50 text-red-700 border-red-200",
  Government: "bg-purple-50 text-purple-700 border-purple-200",
};

type Step = "select" | "form" | "preview";

export default function FormsPage() {
  const { user, loading } = useAuth();
  const { t, language } = useLanguage();
  const router = useRouter();
  const [step, setStep] = useState<Step>("select");
  const [selected, setSelected] = useState<TemplateDefinition | null>(null);
  const [values, setValues] = useState<Record<string, string>>({});
  const [generatedText, setGeneratedText] = useState("");
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  if (loading || !user) return null;

  const getCategoryLabel = (cat: string) => {
    const map: Record<string, ReturnType<typeof t>> = {
      Property: t("formsCategoryProperty"),
      Finance: t("formsCategoryFinance"),
      Legal: t("formsCategoryLegal"),
      Government: t("formsCategoryGovernment"),
    };
    return map[cat] || cat;
  };

  const getTemplateTitle = (tpl: TemplateDefinition) =>
    TEMPLATE_TITLES[tpl.id]?.[language] || tpl.title;

  const getTemplateDescription = (tpl: TemplateDefinition) =>
    TEMPLATE_DESCRIPTIONS[tpl.id]?.[language] || tpl.description;

  const selectTemplate = (tpl: TemplateDefinition) => {
    setSelected(tpl);
    setValues({});
    setGeneratedText("");
    setStep("form");
  };

  const handleChange = (id: string, value: string) => {
    setValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleGenerate = () => {
    if (!selected) return;
    const missing = selected.fields
      .filter((f) => f.required && !values[f.id]?.trim())
      .map((f) => f.label);
    if (missing.length > 0) {
      toast.error(`Please fill: ${missing.slice(0, 3).join(", ")}${missing.length > 3 ? "..." : ""}`);
      return;
    }
    setGenerating(true);
    setTimeout(() => {
      const text = selected.generate(values);
      setGeneratedText(text);
      setStep("preview");
      setGenerating(false);
    }, 400);
  };

  const handleDownloadPDF = async () => {
    if (!generatedText || !selected) return;
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ unit: "mm", format: "a4" });
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 20;
      const maxWidth = pageWidth - margin * 2;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);

      const lines = doc.splitTextToSize(generatedText, maxWidth);
      let y = margin;
      const lineHeight = 6;
      const pageHeight = doc.internal.pageSize.getHeight() - margin;

      for (const line of lines) {
        if (y + lineHeight > pageHeight) {
          doc.addPage();
          y = margin;
        }
        const isHeading = /^[A-Z][A-Z\s\/]+:?\s*$/.test(line.trim()) && line.trim().length > 3;
        if (isHeading) {
          doc.setFont("helvetica", "bold");
          doc.setFontSize(11);
        } else {
          doc.setFont("helvetica", "normal");
          doc.setFontSize(10);
        }
        doc.text(line, margin, y);
        y += isHeading ? lineHeight + 1 : lineHeight;
      }

      doc.save(`${selected.id}-${Date.now()}.pdf`);
      toast.success("PDF downloaded!");
    } catch {
      toast.error("PDF generation failed. Please try printing instead.");
    }
  };

  const handlePrint = () => {
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`
      <html><head><title>${selected?.title}</title>
      <style>
        body { font-family: 'Courier New', monospace; font-size: 12px; margin: 40px; line-height: 1.7; white-space: pre-wrap; color: #111; }
        @media print { body { margin: 20mm; } }
      </style></head>
      <body>${generatedText.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</body></html>
    `);
    win.document.close();
    win.focus();
    setTimeout(() => win.print(), 300);
  };

  const categories = [...new Set(LEGAL_TEMPLATES.map((tpl) => tpl.category))];

  return (
    <div className="min-h-screen bg-cream-50">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="mb-8">
          {step !== "select" && (
            <button
              onClick={() => setStep(step === "preview" ? "form" : "select")}
              className="flex items-center gap-1.5 text-sm text-saathi-600 hover:text-saathi-800 mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> {t("formsBack")}
            </button>
          )}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-saathi-700 rounded-xl flex items-center justify-center shadow-saathi">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-saathi-800">
                {step === "select"
                  ? t("formsTitle")
                  : step === "form"
                  ? (selected ? getTemplateTitle(selected) : "")
                  : t("formsDocumentPreview")}
              </h1>
              <p className="text-sm text-saathi-500">
                {step === "select"
                  ? t("formsSubtitle")
                  : step === "form"
                  ? t("formsFillDetails")
                  : t("formsReviewDownload")}
              </p>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* STEP 1: Template Selection */}
          {step === "select" && (
            <motion.div key="select" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
              {categories.map((cat) => {
                const CatIcon = CATEGORY_ICONS[cat] || FileText;
                const templates = LEGAL_TEMPLATES.filter((tpl) => tpl.category === cat);
                return (
                  <div key={cat} className="mb-8">
                    <div className="flex items-center gap-2 mb-3">
                      <CatIcon className="w-4 h-4 text-saathi-600" />
                      <h2 className="text-sm font-semibold text-saathi-600 uppercase tracking-wide">
                        {getCategoryLabel(cat)}
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {templates.map((tpl) => {
                        const Icon = TEMPLATE_ICONS[tpl.id] || FileText;
                        const colorCls = CATEGORY_COLORS[tpl.category] || "bg-saathi-50 text-saathi-700 border-saathi-200";
                        return (
                          <motion.button
                            key={tpl.id}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => selectTemplate(tpl)}
                            className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-saathi-100 hover:border-saathi-300 hover:shadow-md transition-all text-left group"
                          >
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border flex-shrink-0 ${colorCls}`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-saathi-800 text-sm group-hover:text-saathi-900">
                                {getTemplateTitle(tpl)}
                              </p>
                              <p className="text-xs text-saathi-500 mt-0.5 leading-relaxed">
                                {getTemplateDescription(tpl)}
                              </p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-saathi-400 group-hover:text-saathi-600 flex-shrink-0 mt-1 transition-colors" />
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}

          {/* STEP 2: Form Fields */}
          {step === "form" && selected && (
            <motion.div key="form" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
              <div className="bg-white rounded-2xl border border-saathi-100 shadow-sm overflow-hidden">
                <div className="bg-saathi-700 px-6 py-4">
                  <p className="text-white font-semibold">{getTemplateTitle(selected)}</p>
                  <p className="text-saathi-200 text-xs mt-0.5">{t("formsRequiredNote")}</p>
                </div>
                <div className="p-6 space-y-5">
                  {selected.fields.map((field) => (
                    <div key={field.id}>
                      <label className="block text-sm font-medium text-saathi-700 mb-1.5">
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                      {field.type === "textarea" ? (
                        <textarea
                          rows={3}
                          placeholder={field.placeholder}
                          value={values[field.id] || ""}
                          onChange={(e) => handleChange(field.id, e.target.value)}
                          className="w-full px-4 py-2.5 text-sm border border-saathi-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-saathi-400 focus:border-transparent resize-none text-saathi-800 placeholder-saathi-400 bg-cream-50"
                        />
                      ) : field.type === "select" ? (
                        <select
                          value={values[field.id] || ""}
                          onChange={(e) => handleChange(field.id, e.target.value)}
                          className="w-full px-4 py-2.5 text-sm border border-saathi-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-saathi-400 focus:border-transparent text-saathi-800 bg-cream-50"
                        >
                          <option value="">{t("formsSelectOption")}</option>
                          {field.options?.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          value={values[field.id] || ""}
                          onChange={(e) => handleChange(field.id, e.target.value)}
                          className="w-full px-4 py-2.5 text-sm border border-saathi-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-saathi-400 focus:border-transparent text-saathi-800 placeholder-saathi-400 bg-cream-50"
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div className="px-6 pb-6">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={handleGenerate}
                    disabled={generating}
                    className="w-full py-3.5 bg-saathi-700 text-white rounded-xl font-semibold text-sm hover:bg-saathi-600 disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-saathi"
                  >
                    {generating ? (
                      <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> {t("formsGenerating")}</>
                    ) : (
                      <><CheckCircle2 className="w-4 h-4" /> {t("formsGenerate")}</>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Preview */}
          {step === "preview" && selected && (
            <motion.div key="preview" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
              {/* Action Bar */}
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDownloadPDF}
                  className="flex items-center gap-2 px-5 py-2.5 bg-saathi-700 text-white rounded-xl font-semibold text-sm hover:bg-saathi-600 transition-all shadow-saathi"
                >
                  <Download className="w-4 h-4" /> {t("formsDownloadPDF")}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white border border-saathi-200 text-saathi-700 rounded-xl font-semibold text-sm hover:bg-saathi-50 transition-all"
                >
                  <Printer className="w-4 h-4" /> {t("formsPrint")}
                </motion.button>
                <button
                  onClick={() => setStep("form")}
                  className="flex items-center gap-2 px-5 py-2.5 text-saathi-600 hover:text-saathi-800 text-sm font-medium transition-colors"
                >
                  {t("formsEditFields")}
                </button>
              </div>

              {/* Document Preview */}
              <div className="bg-white rounded-2xl border border-saathi-100 shadow-sm overflow-hidden">
                <div className="bg-saathi-50 border-b border-saathi-100 px-6 py-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-saathi-600" />
                  <span className="text-sm font-medium text-saathi-700">{getTemplateTitle(selected)}</span>
                  <span className="ml-auto text-xs text-saathi-400">{t("formsPreviewLabel")}</span>
                </div>
                <div className="p-6 sm:p-8 overflow-auto">
                  <pre className="font-mono text-[11px] sm:text-xs text-saathi-800 whitespace-pre-wrap leading-relaxed">
                    {generatedText}
                  </pre>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
