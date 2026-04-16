export type Language = "en" | "hi" | "kn";

export const LANGUAGES = [
  { code: "en" as Language, name: "English", nativeName: "English", flag: "🇬🇧" },
  { code: "hi" as Language, name: "Hindi", nativeName: "हिंदी", flag: "🇮🇳" },
  { code: "kn" as Language, name: "Kannada", nativeName: "ಕನ್ನಡ", flag: "🇮🇳" },
];

type TranslationKey =
  | "appName"
  | "appTagline"
  | "uploadDocument"
  | "analyzeDocument"
  | "chatWithSaathi"
  | "voiceAssistant"
  | "dashboard"
  | "guides"
  | "login"
  | "signup"
  | "logout"
  | "uploadHint"
  | "analyzing"
  | "analysisComplete"
  | "riskLevel"
  | "high"
  | "medium"
  | "low"
  | "ifYouSign"
  | "ifYouDontSign"
  | "safePoints"
  | "riskyPoints"
  | "recommendations"
  | "askQuestion"
  | "typeMessage"
  | "send"
  | "startVoice"
  | "stopVoice"
  | "listening"
  | "speaking"
  | "hello"
  | "welcome"
  | "myDocuments"
  | "noDocuments"
  | "uploadFirst"
  | "keyClauses"
  | "summary"
  | "simplifiedExplanation"
  | "selectLanguage"
  | "documentGuides"
  | "processing"
  | "completed"
  | "error"
  | "retry"
  | "delete"
  | "view"
  | "chat"
  | "name"
  | "email"
  | "password"
  | "confirmPassword"
  | "forgotPassword"
  | "noAccount"
  | "hasAccount"
  | "createAccount"
  | "signingIn"
  | "heroTitle"
  | "heroSubtitle"
  | "getStarted"
  | "learnMore"
  | "features"
  | "featureVoice"
  | "featureMultilingual"
  | "featureRisk"
  | "featureRAG"
  | "recording"
  | "voiceInput"
  | "readAloud"
  | "stopReading"
  | "tapToSpeak"
  | "autoSpeak"
  | "newAnalysis"
  | "searchGuides"
  | "quickActions"
  | "totalDocuments"
  | "analyzedDocs"
  | "addNew"
  | "suggestedQuestions"
  | "pressEnterHint"
  | "noRisksFound"
  | "safeDocument"
  | "consultLawyer"
  | "listenAnalysis"
  | "guideSubtitle"
  | "analyzeSubtitle"
  | "loadingDocument"
  | "riskExplanation"
  | "saferAlternative"
  | "risksFound"
  | "decisionSubtitle"
  | "tabOverview"
  | "tabRisks"
  | "tabDecision"
  | "tabAdvice"
  | "voiceNotSupported"
  | "highRiskAlert"
  | "highRiskAlertDesc";

type Translations = Record<Language, Record<TranslationKey, string>>;

export const translations: Translations = {
  en: {
    appName: "Legal Saathi",
    appTagline: "Your Legal Friend",
    uploadDocument: "Upload Document",
    analyzeDocument: "Analyze Document",
    chatWithSaathi: "Chat with Saathi",
    voiceAssistant: "Voice Assistant",
    dashboard: "Dashboard",
    guides: "Guides",
    login: "Login",
    signup: "Sign Up",
    logout: "Logout",
    uploadHint: "Drop your document here or click to browse\nSupports PDF, DOC, DOCX, Images",
    analyzing: "Analyzing your document...",
    analysisComplete: "Analysis Complete",
    riskLevel: "Risk Level",
    high: "High Risk",
    medium: "Medium Risk",
    low: "Low Risk",
    ifYouSign: "If You Sign",
    ifYouDontSign: "If You Don't Sign",
    safePoints: "Safe Points",
    riskyPoints: "Risky Clauses",
    recommendations: "Recommendations",
    askQuestion: "Ask a question about your document",
    typeMessage: "Type your message...",
    send: "Send",
    startVoice: "Start Voice",
    stopVoice: "Stop Voice",
    listening: "Listening...",
    speaking: "Speaking...",
    hello: "Hello",
    welcome: "Welcome to Legal Saathi",
    myDocuments: "My Documents",
    noDocuments: "No documents yet",
    uploadFirst: "Upload your first document to get started",
    keyClauses: "Key Clauses",
    summary: "Summary",
    simplifiedExplanation: "Simple Explanation",
    selectLanguage: "Select Language",
    documentGuides: "Document Guides",
    processing: "Processing",
    completed: "Completed",
    error: "Error",
    retry: "Retry",
    delete: "Delete",
    view: "View",
    chat: "Chat",
    name: "Full Name",
    email: "Email Address",
    password: "Password",
    confirmPassword: "Confirm Password",
    forgotPassword: "Forgot Password?",
    noAccount: "Don't have an account?",
    hasAccount: "Already have an account?",
    createAccount: "Create Account",
    signingIn: "Signing in...",
    heroTitle: "Understand Any Legal Document",
    heroSubtitle: "Voice-first legal AI that explains complex documents in your language",
    getStarted: "Get Started Free",
    learnMore: "Learn More",
    features: "Features",
    featureVoice: "Voice-First Interaction",
    featureMultilingual: "Multilingual Support",
    featureRisk: "Risk Analysis",
    featureRAG: "Smart Legal Memory",
    recording: "Recording...",
    voiceInput: "Voice Input",
    readAloud: "Read aloud",
    stopReading: "Stop reading",
    tapToSpeak: "Tap to speak",
    autoSpeak: "Auto-speak replies",
    newAnalysis: "New Analysis",
    searchGuides: "Search guides...",
    quickActions: "Quick Actions",
    totalDocuments: "Total Documents",
    analyzedDocs: "Analyzed",
    addNew: "Add New",
    suggestedQuestions: "Suggested questions:",
    pressEnterHint: "Enter to send • Shift+Enter for new line",
    noRisksFound: "No major risks found",
    safeDocument: "This document appears to be safe",
    consultLawyer: "Always consult a qualified lawyer before signing any legal document.",
    listenAnalysis: "Listen to analysis",
    guideSubtitle: "Step-by-step guides for common legal processes in India",
    analyzeSubtitle: "Upload any legal document for instant AI analysis",
    loadingDocument: "Loading document...",
    riskExplanation: "Risk Explanation",
    saferAlternative: "Safer Alternative",
    risksFound: "found",
    decisionSubtitle: "Understand the consequences before making your decision",
    tabOverview: "Overview",
    tabRisks: "Risks",
    tabDecision: "Decision",
    tabAdvice: "Advice",
    voiceNotSupported: "Voice input not supported in this browser",
    highRiskAlert: "High-Risk Documents Need Attention",
    highRiskAlertDesc: "You have high-risk document(s). Review before signing.",
  },
  hi: {
    appName: "लीगल साथी",
    appTagline: "आपका क़ानूनी दोस्त",
    uploadDocument: "दस्तावेज़ अपलोड करें",
    analyzeDocument: "दस्तावेज़ विश्लेषण करें",
    chatWithSaathi: "साथी से बात करें",
    voiceAssistant: "आवाज़ सहायक",
    dashboard: "डैशबोर्ड",
    guides: "गाइड",
    login: "लॉगिन",
    signup: "साइन अप",
    logout: "लॉगआउट",
    uploadHint: "यहाँ अपना दस्तावेज़ छोड़ें\nPDF, DOC, DOCX, Images",
    analyzing: "आपका दस्तावेज़ विश्लेषण हो रहा है...",
    analysisComplete: "विश्लेषण पूर्ण",
    riskLevel: "जोखिम स्तर",
    high: "उच्च जोखिम",
    medium: "मध्यम जोखिम",
    low: "कम जोखिम",
    ifYouSign: "अगर आप हस्ताक्षर करते हैं",
    ifYouDontSign: "अगर आप हस्ताक्षर नहीं करते",
    safePoints: "सुरक्षित बिंदु",
    riskyPoints: "जोखिम वाली धाराएँ",
    recommendations: "सुझाव",
    askQuestion: "दस्तावेज़ के बारे में प्रश्न पूछें",
    typeMessage: "संदेश लिखें...",
    send: "भेजें",
    startVoice: "आवाज़ शुरू करें",
    stopVoice: "आवाज़ बंद करें",
    listening: "सुन रहा है...",
    speaking: "बोल रहा है...",
    hello: "नमस्ते",
    welcome: "लीगल साथी में आपका स्वागत है",
    myDocuments: "मेरे दस्तावेज़",
    noDocuments: "अभी कोई दस्तावेज़ नहीं",
    uploadFirst: "शुरू करने के लिए पहला दस्तावेज़ अपलोड करें",
    keyClauses: "मुख्य धाराएँ",
    summary: "सारांश",
    simplifiedExplanation: "सरल व्याख्या",
    selectLanguage: "भाषा चुनें",
    documentGuides: "दस्तावेज़ गाइड",
    processing: "प्रसंस्करण",
    completed: "पूर्ण",
    error: "त्रुटि",
    retry: "पुनः प्रयास",
    delete: "हटाएं",
    view: "देखें",
    chat: "चैट",
    name: "पूरा नाम",
    email: "ईमेल पता",
    password: "पासवर्ड",
    confirmPassword: "पासवर्ड की पुष्टि करें",
    forgotPassword: "पासवर्ड भूल गए?",
    noAccount: "खाता नहीं है?",
    hasAccount: "पहले से खाता है?",
    createAccount: "खाता बनाएं",
    signingIn: "लॉगिन हो रहा है...",
    heroTitle: "कोई भी क़ानूनी दस्तावेज़ समझें",
    heroSubtitle: "आवाज़-प्रथम क़ानूनी AI जो जटिल दस्तावेज़ों को आपकी भाषा में समझाता है",
    getStarted: "मुफ्त शुरू करें",
    learnMore: "अधिक जानें",
    features: "विशेषताएं",
    featureVoice: "आवाज़-प्रथम इंटरैक्शन",
    featureMultilingual: "बहुभाषी समर्थन",
    featureRisk: "जोखिम विश्लेषण",
    featureRAG: "स्मार्ट क़ानूनी मेमोरी",
    recording: "रिकॉर्ड हो रहा है...",
    voiceInput: "आवाज़ इनपुट",
    readAloud: "ज़ोर से पढ़ें",
    stopReading: "पढ़ना बंद करें",
    tapToSpeak: "बोलने के लिए टैप करें",
    autoSpeak: "उत्तर स्वतः बोलें",
    newAnalysis: "नया विश्लेषण",
    searchGuides: "गाइड खोजें...",
    quickActions: "त्वरित क्रियाएं",
    totalDocuments: "कुल दस्तावेज़",
    analyzedDocs: "विश्लेषित",
    addNew: "नया जोड़ें",
    suggestedQuestions: "सुझाए गए प्रश्न:",
    pressEnterHint: "Enter से भेजें • Shift+Enter नई लाइन",
    noRisksFound: "कोई बड़ा जोखिम नहीं मिला",
    safeDocument: "यह दस्तावेज़ सुरक्षित लगता है",
    consultLawyer: "किसी भी क़ानूनी दस्तावेज़ पर हस्ताक्षर करने से पहले वकील से सलाह लें।",
    listenAnalysis: "विश्लेषण सुनें",
    guideSubtitle: "भारत में सामान्य क़ानूनी प्रक्रियाओं के लिए चरण-दर-चरण गाइड",
    analyzeSubtitle: "तत्काल AI विश्लेषण के लिए कोई भी क़ानूनी दस्तावेज़ अपलोड करें",
    loadingDocument: "दस्तावेज़ लोड हो रहा है...",
    riskExplanation: "जोखिम विवरण",
    saferAlternative: "सुरक्षित विकल्प",
    risksFound: "मिले",
    decisionSubtitle: "निर्णय लेने से पहले परिणाम समझें",
    tabOverview: "अवलोकन",
    tabRisks: "जोखिम",
    tabDecision: "निर्णय",
    tabAdvice: "सलाह",
    voiceNotSupported: "इस ब्राउज़र में आवाज़ इनपुट समर्थित नहीं है",
    highRiskAlert: "उच्च जोखिम वाले दस्तावेज़ों पर ध्यान दें",
    highRiskAlertDesc: "आपके पास उच्च जोखिम वाले दस्तावेज़ हैं। हस्ताक्षर करने से पहले समीक्षा करें।",
  },
  kn: {
    appName: "ಲೀಗಲ್ ಸಾಥಿ",
    appTagline: "ನಿಮ್ಮ ಕಾನೂನು ಸ್ನೇಹಿತ",
    uploadDocument: "ದಾಖಲೆ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    analyzeDocument: "ದಾಖಲೆ ವಿಶ್ಲೇಷಿಸಿ",
    chatWithSaathi: "ಸಾಥಿಯೊಂದಿಗೆ ಮಾತನಾಡಿ",
    voiceAssistant: "ಧ್ವನಿ ಸಹಾಯಕ",
    dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    guides: "ಮಾರ್ಗದರ್ಶಿ",
    login: "ಲಾಗಿನ್",
    signup: "ಸೈನ್ ಅಪ್",
    logout: "ಲಾಗ್‌ಔಟ್",
    uploadHint: "ಇಲ್ಲಿ ದಾಖಲೆ ಹಾಕಿ\nPDF, DOC, DOCX, Images",
    analyzing: "ನಿಮ್ಮ ದಾಖಲೆ ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...",
    analysisComplete: "ವಿಶ್ಲೇಷಣೆ ಪೂರ್ಣ",
    riskLevel: "ಅಪಾಯದ ಮಟ್ಟ",
    high: "ಹೆಚ್ಚಿನ ಅಪಾಯ",
    medium: "ಮಧ್ಯಮ ಅಪಾಯ",
    low: "ಕಡಿಮೆ ಅಪಾಯ",
    ifYouSign: "ನೀವು ಸಹಿ ಮಾಡಿದರೆ",
    ifYouDontSign: "ನೀವು ಸಹಿ ಮಾಡದಿದ್ದರೆ",
    safePoints: "ಸುರಕ್ಷಿತ ಅಂಶಗಳು",
    riskyPoints: "ಅಪಾಯಕಾರಿ ಷರತ್ತುಗಳು",
    recommendations: "ಸಲಹೆಗಳು",
    askQuestion: "ದಾಖಲೆ ಬಗ್ಗೆ ಪ್ರಶ್ನೆ ಕೇಳಿ",
    typeMessage: "ಸಂದೇಶ ಟೈಪ್ ಮಾಡಿ...",
    send: "ಕಳುಹಿಸಿ",
    startVoice: "ಧ್ವನಿ ಪ್ರಾರಂಭಿಸಿ",
    stopVoice: "ಧ್ವನಿ ನಿಲ್ಲಿಸಿ",
    listening: "ಕೇಳುತ್ತಿದೆ...",
    speaking: "ಮಾತನಾಡುತ್ತಿದೆ...",
    hello: "ನಮಸ್ಕಾರ",
    welcome: "ಲೀಗಲ್ ಸಾಥಿಗೆ ಸ್ವಾಗತ",
    myDocuments: "ನನ್ನ ದಾಖಲೆಗಳು",
    noDocuments: "ಇನ್ನೂ ದಾಖಲೆಗಳಿಲ್ಲ",
    uploadFirst: "ಪ್ರಾರಂಭಿಸಲು ಮೊದಲ ದಾಖಲೆ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    keyClauses: "ಮುಖ್ಯ ಷರತ್ತುಗಳು",
    summary: "ಸಾರಾಂಶ",
    simplifiedExplanation: "ಸರಳ ವಿವರಣೆ",
    selectLanguage: "ಭಾಷೆ ಆಯ್ಕೆ ಮಾಡಿ",
    documentGuides: "ದಾಖಲೆ ಮಾರ್ಗದರ್ಶಿ",
    processing: "ಪ್ರಕ್ರಿಯೆ",
    completed: "ಪೂರ್ಣ",
    error: "ದೋಷ",
    retry: "ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ",
    delete: "ಅಳಿಸಿ",
    view: "ನೋಡಿ",
    chat: "ಚಾಟ್",
    name: "ಪೂರ್ಣ ಹೆಸರು",
    email: "ಇಮೇಲ್ ವಿಳಾಸ",
    password: "ಪಾಸ್‌ವರ್ಡ್",
    confirmPassword: "ಪಾಸ್‌ವರ್ಡ್ ಖಚಿತಪಡಿಸಿ",
    forgotPassword: "ಪಾಸ್‌ವರ್ಡ್ ಮರೆತಿರಾ?",
    noAccount: "ಖಾತೆ ಇಲ್ಲವೇ?",
    hasAccount: "ಈಗಾಗಲೇ ಖಾತೆ ಇದೆಯೇ?",
    createAccount: "ಖಾತೆ ರಚಿಸಿ",
    signingIn: "ಲಾಗಿನ್ ಆಗುತ್ತಿದೆ...",
    heroTitle: "ಯಾವುದೇ ಕಾನೂನು ದಾಖಲೆ ಅರ್ಥ ಮಾಡಿಕೊಳ್ಳಿ",
    heroSubtitle: "ಧ್ವನಿ-ಮೊದಲ ಕಾನೂನು AI ಸಂಕೀರ್ಣ ದಾಖಲೆಗಳನ್ನು ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ವಿವರಿಸುತ್ತದೆ",
    getStarted: "ಉಚಿತ ಪ್ರಾರಂಭಿಸಿ",
    learnMore: "ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ",
    features: "ವೈಶಿಷ್ಟ್ಯಗಳು",
    featureVoice: "ಧ್ವನಿ-ಮೊದಲ ಸಂವಾದ",
    featureMultilingual: "ಬಹುಭಾಷಾ ಬೆಂಬಲ",
    featureRisk: "ಅಪಾಯ ವಿಶ್ಲೇಷಣೆ",
    featureRAG: "ಸ್ಮಾರ್ಟ್ ಕಾನೂನು ಮೆಮೊರಿ",
    recording: "ರೆಕಾರ್ಡ್ ಆಗುತ್ತಿದೆ...",
    voiceInput: "ಧ್ವನಿ ಇನ್‌ಪುಟ್",
    readAloud: "ಗಟ್ಟಿಯಾಗಿ ಓದಿ",
    stopReading: "ಓದುವುದನ್ನು ನಿಲ್ಲಿಸಿ",
    tapToSpeak: "ಮಾತನಾಡಲು ಟ್ಯಾಪ್ ಮಾಡಿ",
    autoSpeak: "ಉತ್ತರ ಸ್ವಯಂ ಮಾತನಾಡಿ",
    newAnalysis: "ಹೊಸ ವಿಶ್ಲೇಷಣೆ",
    searchGuides: "ಮಾರ್ಗದರ್ಶಿ ಹುಡುಕಿ...",
    quickActions: "ತ್ವರಿತ ಕ್ರಿಯೆಗಳು",
    totalDocuments: "ಒಟ್ಟು ದಾಖಲೆಗಳು",
    analyzedDocs: "ವಿಶ್ಲೇಷಿಸಲಾಗಿದೆ",
    addNew: "ಹೊಸದು ಸೇರಿಸಿ",
    suggestedQuestions: "ಸೂಚಿಸಿದ ಪ್ರಶ್ನೆಗಳು:",
    pressEnterHint: "ಕಳುಹಿಸಲು Enter • ಹೊಸ ಸಾಲಿಗೆ Shift+Enter",
    noRisksFound: "ಯಾವುದೇ ಅಪಾಯ ಕಾಣಿಸಲಿಲ್ಲ",
    safeDocument: "ಈ ದಾಖಲೆ ಸುರಕ್ಷಿತವಾಗಿ ತೋರುತ್ತಿದೆ",
    consultLawyer: "ಯಾವುದೇ ಕಾನೂನು ದಾಖಲೆಗೆ ಸಹಿ ಮಾಡುವ ಮೊದಲು ವಕೀಲರನ್ನು ಸಂಪರ್ಕಿಸಿ.",
    listenAnalysis: "ವಿಶ್ಲೇಷಣೆ ಕೇಳಿ",
    guideSubtitle: "ಭಾರತದಲ್ಲಿ ಸಾಮಾನ್ಯ ಕಾನೂನು ಪ್ರಕ್ರಿಯೆಗಳಿಗೆ ಹಂತ-ಹಂತ ಮಾರ್ಗದರ್ಶಿ",
    analyzeSubtitle: "ತ್ವರಿತ AI ವಿಶ್ಲೇಷಣೆಗಾಗಿ ಯಾವುದೇ ಕಾನೂನು ದಾಖಲೆ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    loadingDocument: "ದಾಖಲೆ ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
    riskExplanation: "ಅಪಾಯದ ವಿವರಣೆ",
    saferAlternative: "ಸುರಕ್ಷಿತ ಪರ್ಯಾಯ",
    risksFound: "ಕಾಣಿಸಿದೆ",
    decisionSubtitle: "ನಿರ್ಧಾರ ತೆಗೆದುಕೊಳ್ಳುವ ಮೊದಲು ಪರಿಣಾಮ ಅರ್ಥ ಮಾಡಿಕೊಳ್ಳಿ",
    tabOverview: "ಅವಲೋಕನ",
    tabRisks: "ಅಪಾಯಗಳು",
    tabDecision: "ನಿರ್ಧಾರ",
    tabAdvice: "ಸಲಹೆ",
    voiceNotSupported: "ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಧ್ವನಿ ಇನ್‌ಪುಟ್ ಬೆಂಬಲಿಸುವುದಿಲ್ಲ",
    highRiskAlert: "ಅಧಿಕ ಅಪಾಯದ ದಾಖಲೆಗಳಿಗೆ ಗಮನ ನೀಡಿ",
    highRiskAlertDesc: "ನಿಮ್ಮಲ್ಲಿ ಅಧಿಕ ಅಪಾಯದ ದಾಖಲೆಗಳಿವೆ. ಸಹಿ ಮಾಡುವ ಮೊದಲು ಪರಿಶೀಲಿಸಿ.",
  },
};

export function t(key: TranslationKey, language: Language = "en"): string {
  return translations[language]?.[key] || translations.en[key] || key;
}
