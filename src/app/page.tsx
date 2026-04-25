"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Scale, Mic, Globe2, ShieldCheck, Brain, ArrowRight,
  FileSearch, BookOpen, Sparkles, ChevronRight
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function LandingPage() {
  const { user, loading } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [user, loading, router]);

  const features = [
    { icon: Mic, color: "bg-amber-100 text-amber-700", title: t("featureVoiceTitle"), desc: t("featureVoiceDesc") },
    { icon: ShieldCheck, color: "bg-green-100 text-green-700", title: t("featureRiskTitle"), desc: t("featureRiskDesc") },
    { icon: Globe2, color: "bg-blue-100 text-blue-700", title: t("featureMultilingualTitle"), desc: t("featureMultilingualDesc") },
    { icon: Brain, color: "bg-purple-100 text-purple-700", title: t("featureAIMemoryTitle"), desc: t("featureAIMemoryDesc") },
    { icon: FileSearch, color: "bg-saathi-100 text-saathi-700", title: t("featureOCRTitle"), desc: t("featureOCRDesc") },
    { icon: BookOpen, color: "bg-teal-100 text-teal-700", title: t("featureLegalGuidesTitle"), desc: t("featureLegalGuidesDesc") },
  ];

  const stats = [
    { value: "10,000+", label: t("statDocuments") },
    { value: "5", label: t("statLanguages") },
    { value: "95%", label: t("statSatisfaction") },
    { value: t("statRural"), label: t("ruralFirstFocus") },
  ];

  const howItWorksSteps = [
    { step: "01", icon: "📤", title: t("stepUploadTitle"), desc: t("stepUploadDesc") },
    { step: "02", icon: "🧠", title: t("stepAITitle"), desc: t("stepAIDesc") },
    { step: "03", icon: "🎙️", title: t("stepVoiceTitle"), desc: t("stepVoiceDesc") },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-saathi-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-10 h-10 border-3 border-saathi-700 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-saathi-50">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-cream-100/95 backdrop-blur-md border-b border-saathi-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-saathi-700 rounded-xl flex items-center justify-center shadow-saathi">
                <Scale className="w-5 h-5 text-saathi-100" />
              </div>
              <div>
                <span className="font-bold text-saathi-800 text-lg leading-none block">{t("appName")}</span>
                <span className="text-xs text-saathi-500 leading-none">{t("appTagline")}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <LanguageSelector />
              <Link href="/login" className="text-sm font-medium text-saathi-700 hover:text-saathi-900 px-3 py-2 transition-colors">
                {t("login")}
              </Link>
              <Link href="/signup" className="btn-primary">
                {t("getStarted")} <ArrowRight className="w-4 h-4 ml-1 inline" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-hero-pattern">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-saathi-200/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 relative">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="inline-flex items-center gap-2 bg-saathi-100 border border-saathi-200 px-4 py-2 rounded-full text-sm font-medium text-saathi-700 mb-6"
            >
              <Sparkles className="w-4 h-4 text-saathi-500" />
              {t("heroBadge")}
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-saathi-900 leading-tight"
            >
              {t("heroTitle")}
              <span className="block text-saathi-600 mt-1">{t("heroInYourLanguage")}</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="mt-5 text-lg sm:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed"
            >
              {t("heroSubtitle")}
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/signup"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-saathi-700 text-white rounded-2xl font-bold text-base hover:bg-saathi-600 transition-all shadow-saathi-lg hover:shadow-xl active:scale-95"
              >
                <Scale className="w-5 h-5" />
                {t("getStarted")} {t("itsFree")}
              </Link>
              <Link
                href="#features"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white text-saathi-700 rounded-2xl font-bold text-base border-2 border-saathi-200 hover:border-saathi-400 hover:bg-saathi-50 transition-all"
              >
                {t("learnMore")} <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
            >
              {[
                "🇮🇳 ಕನ್ನಡ",
                "🇮🇳 हिंदी",
                "🇮🇳 தமிழ்",
                "🇮🇳 తెలుగు",
                "🇬🇧 English",
              ].map((lang) => (
                <span key={lang} className="px-4 py-2 bg-white border border-saathi-200 rounded-full text-sm font-medium text-saathi-700 shadow-sm">
                  {lang}
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={5}
            className="mt-16 max-w-3xl mx-auto"
          >
            <div className="bg-white rounded-3xl shadow-saathi-lg border border-saathi-200 overflow-hidden">
              <div className="bg-saathi-100 px-4 py-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 bg-red-400 rounded-full" />
                  <div className="w-3 h-3 bg-amber-400 rounded-full" />
                  <div className="w-3 h-3 bg-green-400 rounded-full" />
                </div>
                <div className="flex-1 mx-4 bg-white rounded-lg px-3 py-1.5 text-xs text-stone-400">
                  legal-saathi.app
                </div>
              </div>

              <div className="p-6 bg-cream-50">
                <div className="flex gap-4">
                  <div className="w-1/2 bg-white rounded-2xl p-4 border-2 border-dashed border-saathi-300">
                    <div className="text-center py-4">
                      <div className="text-3xl mb-2">📄</div>
                      <p className="text-sm font-medium text-saathi-700">Land_Agreement.pdf</p>
                      <p className="text-xs text-saathi-500 mt-1">2.3 MB • Uploaded</p>
                      <div className="mt-3 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full inline-block">
                        ✅ {t("analysisComplete")}
                      </div>
                    </div>
                  </div>

                  <div className="w-1/2 space-y-3">
                    <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                      <p className="text-xs font-bold text-red-700 mb-1">🚨 {t("high")}</p>
                      <p className="text-xs text-red-600">{t("riskyPoints")}</p>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                      <p className="text-xs font-bold text-green-700 mb-1">✅ {t("safePoints")}</p>
                      <p className="text-xs text-green-600">{t("safeDocument")}</p>
                    </div>
                    <div className="bg-saathi-50 border border-saathi-200 rounded-xl p-3">
                      <div className="flex items-center gap-2">
                        <Mic className="w-3.5 h-3.5 text-saathi-600" />
                        <p className="text-xs text-saathi-600">{t("askQuestion")}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-saathi-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="text-center"
              >
                <p className="text-3xl font-extrabold text-white">{stat.value}</p>
                <p className="text-saathi-300 text-sm mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-title">{t("features")}</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            {t("featuresSubtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              className="card p-6 hover:shadow-saathi-lg transition-all group"
            >
              <div className={`w-12 h-12 ${feature.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-stone-800 mb-2 text-lg">{feature.title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-saathi-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="section-title">{t("howItWorks")}</h2>
            <p className="section-subtitle">{t("howItWorksSubtitle")}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorksSteps.map((step, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="relative"
              >
                <div className="card p-6 text-center">
                  <div className="text-5xl mb-4">{step.icon}</div>
                  <div className="absolute top-4 right-4 text-6xl font-black text-saathi-100 leading-none select-none">
                    {step.step}
                  </div>
                  <h3 className="font-bold text-stone-800 mb-2 text-lg">{step.title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
                {i < 2 && (
                  <div className="hidden md:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ChevronRight className="w-8 h-8 text-saathi-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-saathi-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              {t("ctaTitle")}
            </h2>
            <p className="text-saathi-200 text-lg mb-8 max-w-2xl mx-auto">
              {t("ctaSubtitle")}
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-10 py-4 bg-white text-saathi-700 rounded-2xl font-bold text-lg hover:bg-saathi-50 transition-all shadow-saathi-lg"
            >
              <Scale className="w-5 h-5" />
              {t("startFreeToday")}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-saathi-300 text-sm mt-4">{t("noCreditCard")}</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-saathi-900 text-saathi-300 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-saathi-700 rounded-xl flex items-center justify-center">
                <Scale className="w-4 h-4 text-saathi-200" />
              </div>
              <span className="font-bold text-saathi-100">{t("appName")}</span>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="hover:text-saathi-100 transition-colors">{t("privacyPolicy")}</a>
              <a href="#" className="hover:text-saathi-100 transition-colors">{t("termsOfService")}</a>
              <a href="#" className="hover:text-saathi-100 transition-colors">{t("contactUs")}</a>
            </div>
            <p className="text-sm">{t("footerTagline")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
