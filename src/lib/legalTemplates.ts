import type { Language } from "./translations";

type LangMap = Record<Language, string>;

export const TEMPLATE_TITLES: Record<string, LangMap> = {
  "land-purchase":  { en: "Land Purchase Agreement",    hi: "भूमि खरीद समझौता",          kn: "ಭೂಮಿ ಖರೀದಿ ಒಪ್ಪಂದ",        ta: "நில கொள்முதல் ஒப்பந்தம்",       te: "భూమి కొనుగోలు ఒప్పందం" },
  "house-rent":    { en: "House Rent Agreement",        hi: "किराया समझौता",              kn: "ಮನೆ ಬಾಡಿಗೆ ಒಪ್ಪಂದ",         ta: "வீட்டு வாடகை ஒப்பந்தம்",        te: "ఇంటి అద్దె ఒప్పందం" },
  "education-loan":{ en: "Education Loan Application",  hi: "शिक्षा ऋण आवेदन",            kn: "ಶಿಕ್ಷಣ ಸಾಲ ಅರ್ಜಿ",           ta: "கல்வி கடன் விண்ணப்பம்",         te: "విద్యా రుణ దరఖాస్తు" },
  "police-complaint":{ en: "Police Complaint (FIR)",    hi: "पुलिस शिकायत (FIR)",         kn: "ಪೊಲೀಸ್ ದೂರು (FIR)",           ta: "போலீஸ் புகார் (FIR)",           te: "పోలీసు ఫిర్యాదు (FIR)" },
  "affidavit":     { en: "General Affidavit",           hi: "सामान्य शपथपत्र",            kn: "ಸಾಮಾನ್ಯ ಪ್ರಮಾಣಪತ್ರ",         ta: "பொது உறுதிமொழி",               te: "సాధారణ అఫిడవిట్" },
  "income-certificate":{ en: "Income Certificate Request", hi: "आय प्रमाण पत्र आवेदन",    kn: "ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ ಅರ್ಜಿ",     ta: "வருமான சான்றிதழ் கோரிக்கை",    te: "ఆదాయ ధృవపత్ర అభ్యర్థన" },
  "caste-certificate":{ en: "Caste Certificate Application", hi: "जाति प्रमाण पत्र",     kn: "ಜಾತಿ ಪ್ರಮಾಣಪತ್ರ ಅರ್ಜಿ",     ta: "சாதி சான்றிதழ் விண்ணப்பம்",    te: "కుల ధృవపత్ర దరఖాస్తు" },
  "property-dispute":{ en: "Property Dispute Complaint", hi: "संपत्ति विवाद शिकायत",     kn: "ಆಸ್ತಿ ವಿವಾದ ದೂರು",           ta: "சொத்து தகராறு புகார்",          te: "ఆస్తి వివాద ఫిర్యాదు" },
  "tenant-notice": { en: "Tenant Eviction Notice",      hi: "किरायेदार निष्कासन नोटिस",   kn: "ಬಾಡಿಗೆದಾರ ಖಾಲಿ ನೋಟಿಸ್",      ta: "வாடகைதாரர் வெளியேற்ற அறிவிப்பு", te: "అద్దెదారు నోటీసు" },
  "loan-repayment":{ en: "Loan Repayment Agreement",    hi: "ऋण चुकौती समझौता",           kn: "ಸಾಲ ಮರುಪಾವತಿ ಒಪ್ಪಂದ",        ta: "கடன் திருப்பிச் செலுத்தும் ஒப்பந்தம்", te: "రుణ చెల్లింపు ఒప్పందం" },
};

export const TEMPLATE_DESCRIPTIONS: Record<string, LangMap> = {
  "land-purchase":  { en: "Agreement between buyer and seller for purchase of land/plot", hi: "भूमि/प्लॉट खरीद के लिए क्रेता और विक्रेता के बीच समझौता", kn: "ಭೂಮಿ/ನಿವೇಶನ ಖರೀದಿಗಾಗಿ ಕ್ರೇತೃ ಮತ್ತು ವಿಕ್ರೇತೃ ನಡುವಿನ ಒಪ್ಪಂದ", ta: "நிலம்/மனை வாங்குவதற்கான வாங்குபவர் மற்றும் விற்பவர் இடையே ஒப்பந்தம்", te: "భూమి/స్థలం కొనుగోలుకు కొనుగోలుదారు మరియు విక్రయదారు మధ్య ఒప్పందం" },
  "house-rent":    { en: "Rental agreement between landlord and tenant for residential property", hi: "आवासीय संपत्ति के लिए मकान मालिक और किरायेदार के बीच किराया समझौता", kn: "ಮನೆ/ಅಪಾರ್ಟ್‌ಮೆಂಟ್‌ಗಾಗಿ ಮಾಲೀಕ ಮತ್ತು ಬಾಡಿಗೆದಾರ ನಡುವಿನ ಒಪ್ಪಂದ", ta: "குடியிருப்பு சொத்துக்கான வீட்டுடையவர் மற்றும் வாடகைதாரர் ஒப்பந்தம்", te: "నివాస ఆస్తికి యజమాని మరియు అద్దెదారు మధ్య ఒప్పందం" },
  "education-loan":{ en: "Formal application for education loan from bank/financial institution", hi: "बैंक/वित्तीय संस्था से शिक्षा ऋण के लिए औपचारिक आवेदन", kn: "ಬ್ಯಾಂಕ್/ಹಣಕಾಸು ಸಂಸ್ಥೆಯಿಂದ ಶಿಕ್ಷಣ ಸಾಲಕ್ಕಾಗಿ ಅಧಿಕೃತ ಅರ್ಜಿ", ta: "வங்கி/நிதி நிறுவனத்திடமிருந்து கல்வி கடனுக்கான முறையான விண்ணப்பம்", te: "బ్యాంకు నుండి విద్యా రుణం కోసం అధికారిక దరఖాస్తు" },
  "police-complaint":{ en: "Written complaint to police station for filing First Information Report", hi: "FIR दर्ज करने के लिए थाने में लिखित शिकायत", kn: "ಠಾಣೆಯಲ್ಲಿ FIR ದಾಖಲಿಸಲು ಲಿಖಿತ ದೂರು", ta: "FIR பதிவுசெய்ய காவல்நிலையத்தில் எழுத்துப்பூர்வமான புகார்", te: "FIR నమోదు చేయడానికి పోలీస్ స్టేషన్‌కు లిఖిత ఫిర్యాదు" },
  "affidavit":     { en: "Sworn affidavit for official declarations and verifications", hi: "आधिकारिक घोषणाओं के लिए शपथपत्र", kn: "ಅಧಿಕೃತ ಘೋಷಣೆಗಳಿಗಾಗಿ ಪ್ರಮಾಣಪತ್ರ", ta: "அதிகாரப்பூர்வ அறிவிப்புகளுக்கான உறுதிமொழி", te: "అధికారిక ప్రకటనలకు ప్రమాణ పత్రం" },
  "income-certificate":{ en: "Application to Tahsildar for issuance of income certificate", hi: "तहसीलदार को आय प्रमाण पत्र के लिए आवेदन", kn: "ತಹಶೀಲ್ದಾರ್‌ಗೆ ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ ನೀಡುವಂತೆ ಅರ್ಜಿ", ta: "தாசில்தாருக்கு வருமான சான்றிதழ் வழங்க விண்ணப்பம்", te: "తహసీల్దార్‌కు ఆదాయ ధృవపత్రం కోసం దరఖాస్తు" },
  "caste-certificate":{ en: "Application to Tahsildar for caste/community certificate", hi: "तहसीलदार को जाति/समुदाय प्रमाण पत्र के लिए आवेदन", kn: "ತಹಶೀಲ್ದಾರ್‌ಗೆ ಜಾತಿ/ಸಮುದಾಯ ಪ್ರಮಾಣಪತ್ರ ನೀಡುವಂತೆ ಅರ್ಜಿ", ta: "தாசில்தாருக்கு சாதி/சமூக சான்றிதழ் வழங்க விண்ணப்பம்", te: "తహసీల్దార్‌కు కుల/సమాజ ధృవపత్రం కోసం దరఖాస్తు" },
  "property-dispute":{ en: "Complaint to civil authority regarding property encroachment or dispute", hi: "भूमि विवाद या अतिक्रमण के लिए सरकारी अधिकारी को शिकायत", kn: "ಆಸ್ತಿ ಅತಿಕ್ರಮಣ ಅಥವಾ ವಿವಾದಕ್ಕಾಗಿ ಸರ್ಕಾರಿ ಅಧಿಕಾರಿಗೆ ದೂರು", ta: "சொத்து ஆக்கிரமிப்பு அல்லது தகராறுக்காக அரசு அதிகாரிக்கு புகார்", te: "ఆస్తి ఆక్రమణకు సివిల్ అధికారికి ఫిర్యాదు" },
  "tenant-notice": { en: "Legal notice from landlord to tenant requesting vacation of premises", hi: "मकान मालिक से किरायेदार को मकान खाली करने का नोटिस", kn: "ಮಾಲೀಕರಿಂದ ಬಾಡಿಗೆದಾರರಿಗೆ ಮನೆ ಖಾಲಿ ಮಾಡಲು ನೋಟಿಸ್", ta: "வீட்டுடையவரிடமிருந்து வாடகைதாரருக்கு வெளியேற அறிவிப்பு", te: "యజమాని నుండి అద్దెదారుకు ఖాళీ నోటీసు" },
  "loan-repayment":{ en: "Agreement between lender and borrower for repayment of personal loan", hi: "ऋणदाता और उधारकर्ता के बीच व्यक्तिगत ऋण चुकौती समझौता", kn: "ಸಾಲದಾತ ಮತ್ತು ಸಾಲಗಾರ ನಡುವೆ ವ್ಯಕ್ತಿಗತ ಸಾಲ ಮರುಪಾವತಿ ಒಪ್ಪಂದ", ta: "கடனளிப்பவர் மற்றும் கடன் வாங்கியவர் இடையே கடன் திருப்பிச் செலுத்தும் ஒப்பந்தம்", te: "రుణదాత మరియు రుణగ్రహీత మధ్య వ్యక్తిగత రుణ చెల్లింపు ఒప్పందం" },
};

export interface FieldDef {
  id: string;
  label: string;
  type: "text" | "textarea" | "date" | "number" | "select";
  placeholder?: string;
  required?: boolean;
  options?: string[];
}

export interface TemplateDefinition {
  id: string;
  title: string;
  description: string;
  category: string;
  fields: FieldDef[];
  generate: (values: Record<string, string>) => string;
}

const today = () => new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });

const v = (values: Record<string, string>, key: string, fallback = `[${key.toUpperCase()}]`) =>
  values[key]?.trim() || fallback;

export const LEGAL_TEMPLATES: TemplateDefinition[] = [
  {
    id: "land-purchase",
    title: "Land Purchase Agreement",
    description: "Agreement between buyer and seller for purchase of land/plot",
    category: "Property",
    fields: [
      { id: "seller_name", label: "Seller Full Name", type: "text", placeholder: "Ramesh Kumar", required: true },
      { id: "seller_address", label: "Seller Address", type: "textarea", placeholder: "123, MG Road, Bengaluru", required: true },
      { id: "buyer_name", label: "Buyer Full Name", type: "text", placeholder: "Suresh Patel", required: true },
      { id: "buyer_address", label: "Buyer Address", type: "textarea", placeholder: "45, Brigade Road, Bengaluru", required: true },
      { id: "land_description", label: "Land Description / Survey No.", type: "text", placeholder: "Survey No. 123/4, Village Doddaballapur", required: true },
      { id: "land_area", label: "Land Area", type: "text", placeholder: "1200 sq ft / 0.5 acres", required: true },
      { id: "location", label: "Location / Taluk / District", type: "text", placeholder: "Doddaballapur, Bengaluru Rural", required: true },
      { id: "sale_amount", label: "Sale Amount (₹)", type: "number", placeholder: "2500000", required: true },
      { id: "advance_amount", label: "Advance / Token Amount (₹)", type: "number", placeholder: "250000", required: true },
      { id: "completion_date", label: "Agreement Completion Date", type: "date", required: true },
      { id: "witness1", label: "Witness 1 Name", type: "text", placeholder: "Ganesh Sharma", required: true },
      { id: "witness2", label: "Witness 2 Name", type: "text", placeholder: "Priya Nair" },
    ],
    generate: (values) => `LAND PURCHASE AGREEMENT

This Agreement is made and executed on ${today()}.

BETWEEN:

SELLER: ${v(values, "seller_name")}, residing at ${v(values, "seller_address")} (hereinafter called "the Seller").

AND

BUYER: ${v(values, "buyer_name")}, residing at ${v(values, "buyer_address")} (hereinafter called "the Buyer").

WHEREAS the Seller is the absolute owner of the land described below:

PROPERTY DESCRIPTION:
Survey / Khasra No.: ${v(values, "land_description")}
Area: ${v(values, "land_area")}
Location: ${v(values, "location")}

NOW THEREFORE, both parties agree as follows:

1. SALE CONSIDERATION: The Seller agrees to sell and the Buyer agrees to purchase the above-described land for a total consideration of Rs. ${v(values, "sale_amount")}/- (Rupees ${v(values, "sale_amount")} only).

2. ADVANCE PAYMENT: The Buyer has paid an advance/token amount of Rs. ${v(values, "advance_amount")}/- at the time of execution of this Agreement, the receipt of which the Seller hereby acknowledges.

3. BALANCE PAYMENT: The remaining balance amount of Rs. ${(parseInt(v(values, "sale_amount", "0")) - parseInt(v(values, "advance_amount", "0"))).toLocaleString("en-IN")}/- shall be paid by the Buyer at the time of registration of the Sale Deed.

4. COMPLETION DATE: The parties agree to complete the sale transaction and execute the Sale Deed on or before ${v(values, "completion_date")}.

5. CLEAR TITLE: The Seller warrants that the property has a clear and marketable title, free from all encumbrances, mortgages, litigation, and third-party claims.

6. POSSESSION: Physical possession of the land shall be handed over to the Buyer upon full payment of the sale consideration and registration of the Sale Deed.

7. REGISTRATION EXPENSES: Stamp duty, registration charges, and all related expenses shall be borne by the Buyer.

8. DEFAULT: If the Seller defaults, the advance amount shall be returned in double. If the Buyer defaults, the advance amount shall be forfeited.

IN WITNESS WHEREOF, the parties have signed this Agreement on the date first mentioned above.

SELLER:                                    BUYER:
${v(values, "seller_name")}                ${v(values, "buyer_name")}
Signature: _______________                 Signature: _______________
Date: ${today()}                           Date: ${today()}

WITNESSES:
1. ${v(values, "witness1")}                2. ${v(values, "witness2", "________________")}
   Signature: ____________                    Signature: ____________

Place: ${v(values, "location")}
Date: ${today()}`,
  },

  {
    id: "house-rent",
    title: "House Rent Agreement",
    description: "Rental agreement between landlord and tenant for residential property",
    category: "Property",
    fields: [
      { id: "landlord_name", label: "Landlord Full Name", type: "text", placeholder: "Mohan Rao", required: true },
      { id: "landlord_address", label: "Landlord Permanent Address", type: "textarea", placeholder: "12, Jayanagar, Bengaluru", required: true },
      { id: "tenant_name", label: "Tenant Full Name", type: "text", placeholder: "Anil Kumar", required: true },
      { id: "tenant_address", label: "Tenant Permanent Address", type: "textarea", placeholder: "78, Koramangala, Bengaluru", required: true },
      { id: "property_address", label: "Property Address (to be rented)", type: "textarea", placeholder: "Flat No. 204, XYZ Apartments, Marathahalli, Bengaluru", required: true },
      { id: "monthly_rent", label: "Monthly Rent (₹)", type: "number", placeholder: "15000", required: true },
      { id: "security_deposit", label: "Security Deposit (₹)", type: "number", placeholder: "45000", required: true },
      { id: "start_date", label: "Tenancy Start Date", type: "date", required: true },
      { id: "duration_months", label: "Agreement Duration (Months)", type: "number", placeholder: "11", required: true },
      { id: "lock_in_months", label: "Lock-in Period (Months)", type: "number", placeholder: "3" },
      { id: "notice_period_days", label: "Notice Period (Days)", type: "number", placeholder: "30" },
    ],
    generate: (values) => `HOUSE RENT AGREEMENT

This Rental Agreement is made on ${today()}.

BETWEEN:

LANDLORD: ${v(values, "landlord_name")}, residing at ${v(values, "landlord_address")} (hereinafter called "the Landlord").

AND

TENANT: ${v(values, "tenant_name")}, residing at ${v(values, "tenant_address")} (hereinafter called "the Tenant").

PROPERTY: The Landlord hereby agrees to let out the following premises to the Tenant:
${v(values, "property_address")}

TERMS AND CONDITIONS:

1. TENANCY PERIOD: This agreement is for a period of ${v(values, "duration_months")} months commencing from ${v(values, "start_date")}.

2. MONTHLY RENT: The Tenant agrees to pay a monthly rent of Rs. ${v(values, "monthly_rent")}/- on or before the 5th of every month.

3. SECURITY DEPOSIT: The Tenant has paid a security deposit of Rs. ${v(values, "security_deposit")}/-, which shall be refunded within 30 days of vacating the premises, after deducting any dues.

4. USE OF PREMISES: The premises shall be used for residential purposes only. Sub-letting is strictly prohibited without written consent of the Landlord.

5. UTILITIES: The Tenant shall pay electricity, water, and maintenance charges separately as applicable.

6. MAINTENANCE: The Tenant shall maintain the premises in good condition and shall not make any structural alterations without written consent.

7. LOCK-IN PERIOD: The lock-in period is ${v(values, "lock_in_months", "3")} months from the commencement date. Neither party shall terminate the agreement during this period.

8. NOTICE PERIOD: Either party may terminate this agreement by giving ${v(values, "notice_period_days", "30")} days written notice after the lock-in period.

9. RENEWAL: The agreement may be renewed by mutual consent with revised terms.

10. LEGAL COMPLIANCE: The Tenant shall abide by all society rules, local laws, and shall not engage in any illegal activities on the premises.

LANDLORD:                                  TENANT:
${v(values, "landlord_name")}              ${v(values, "tenant_name")}
Signature: _______________                 Signature: _______________
Date: ${today()}                           Date: ${today()}

Place: ${v(values, "property_address").split(",")[1] || "Bengaluru"}
Date: ${today()}`,
  },

  {
    id: "education-loan",
    title: "Education Loan Application",
    description: "Formal application for education loan from bank/financial institution",
    category: "Finance",
    fields: [
      { id: "applicant_name", label: "Applicant Full Name", type: "text", placeholder: "Priya Sharma", required: true },
      { id: "applicant_dob", label: "Date of Birth", type: "date", required: true },
      { id: "applicant_address", label: "Permanent Address", type: "textarea", placeholder: "42, Rajajinagar, Bengaluru - 560010", required: true },
      { id: "applicant_mobile", label: "Mobile Number", type: "text", placeholder: "9876543210", required: true },
      { id: "parent_name", label: "Parent/Guardian Name", type: "text", placeholder: "Rajesh Sharma", required: true },
      { id: "parent_occupation", label: "Parent Occupation & Annual Income", type: "text", placeholder: "Teacher, Rs. 4,00,000 per year", required: true },
      { id: "institution_name", label: "Institution/College Name", type: "text", placeholder: "Indian Institute of Technology, Bengaluru", required: true },
      { id: "course_name", label: "Course/Programme", type: "text", placeholder: "B.Tech Computer Science", required: true },
      { id: "course_duration", label: "Course Duration (Years)", type: "number", placeholder: "4", required: true },
      { id: "total_fees", label: "Total Course Fees (₹)", type: "number", placeholder: "800000", required: true },
      { id: "loan_amount", label: "Loan Amount Required (₹)", type: "number", placeholder: "700000", required: true },
      { id: "bank_name", label: "Bank / Financial Institution", type: "text", placeholder: "State Bank of India, Jayanagar Branch", required: true },
    ],
    generate: (values) => `EDUCATION LOAN APPLICATION

Date: ${today()}

The Branch Manager
${v(values, "bank_name")}

Subject: Application for Education Loan for Higher Studies

Respected Sir/Madam,

I, ${v(values, "applicant_name")}, son/daughter of ${v(values, "parent_name")}, residing at ${v(values, "applicant_address")}, hereby submit this application for an Education Loan to pursue higher education.

PERSONAL DETAILS:
Name: ${v(values, "applicant_name")}
Date of Birth: ${v(values, "applicant_dob")}
Mobile: ${v(values, "applicant_mobile")}
Address: ${v(values, "applicant_address")}

PARENT/GUARDIAN DETAILS:
Name: ${v(values, "parent_name")}
Occupation & Income: ${v(values, "parent_occupation")}

EDUCATIONAL DETAILS:
Institution: ${v(values, "institution_name")}
Course: ${v(values, "course_name")}
Duration: ${v(values, "course_duration")} Year(s)
Total Course Fees: Rs. ${v(values, "total_fees")}/-

LOAN DETAILS REQUESTED:
Loan Amount: Rs. ${v(values, "loan_amount")}/-
Purpose: To fund tuition fees, hostel, books, and related academic expenses

DECLARATION:
I hereby declare that the information provided above is true and correct to the best of my knowledge. I undertake to repay the loan along with interest as per the repayment schedule agreed upon. I agree to submit all necessary documents including fee receipts, admission letter, academic records, and income proof as required by the bank.

I request you to kindly consider my application and sanction the education loan at the earliest.

Thanking You,

Yours faithfully,

Applicant Signature: _______________        Co-applicant (Parent) Signature: _______________
Name: ${v(values, "applicant_name")}        Name: ${v(values, "parent_name")}
Date: ${today()}                            Date: ${today()}

Enclosures:
1. Admission/Offer Letter from Institution
2. Fee Structure / Schedule
3. Applicant's Academic Records (10th, 12th Marksheets)
4. Identity Proof (Aadhaar/PAN)
5. Address Proof
6. Parent's Income Proof
7. Passport-size Photographs`,
  },

  {
    id: "police-complaint",
    title: "Police Complaint (FIR Request)",
    description: "Written complaint to police station for filing First Information Report",
    category: "Legal",
    fields: [
      { id: "complainant_name", label: "Your Full Name (Complainant)", type: "text", placeholder: "Sunita Reddy", required: true },
      { id: "complainant_address", label: "Your Address", type: "textarea", placeholder: "89, HSR Layout, Bengaluru - 560102", required: true },
      { id: "complainant_mobile", label: "Your Mobile Number", type: "text", placeholder: "9845012345", required: true },
      { id: "police_station", label: "Police Station Name", type: "text", placeholder: "HSR Layout Police Station", required: true },
      { id: "accused_name", label: "Name of Accused (if known)", type: "text", placeholder: "Unknown / Vijay Kumar" },
      { id: "accused_address", label: "Address of Accused (if known)", type: "textarea", placeholder: "123, BTM Layout, Bengaluru" },
      { id: "incident_date", label: "Date of Incident", type: "date", required: true },
      { id: "incident_location", label: "Location / Place of Incident", type: "text", placeholder: "Near Agara Lake, HSR Layout", required: true },
      { id: "incident_description", label: "Describe the Incident in Detail", type: "textarea", placeholder: "On the above date, at approximately 8 PM...", required: true },
      { id: "loss_description", label: "Property Lost / Harm Caused", type: "textarea", placeholder: "Mobile phone worth Rs. 25,000, wallet with Rs. 3,000 cash" },
      { id: "witness_name", label: "Witness Name (if any)", type: "text", placeholder: "Ramesh (neighbor)" },
    ],
    generate: (values) => `POLICE COMPLAINT

Date: ${today()}

To,
The Station House Officer (SHO),
${v(values, "police_station")}

Subject: Written Complaint Requesting Registration of FIR

Respected Sir/Madam,

I, ${v(values, "complainant_name")}, residing at ${v(values, "complainant_address")}, Mobile: ${v(values, "complainant_mobile")}, hereby lodge this complaint and request you to register a First Information Report (FIR) against the accused person(s).

DETAILS OF THE INCIDENT:

Date of Incident: ${v(values, "incident_date")}
Place of Incident: ${v(values, "incident_location")}

DETAILS OF ACCUSED:
Name: ${v(values, "accused_name", "Unknown")}
Address: ${v(values, "accused_address", "Unknown")}

DESCRIPTION OF INCIDENT:
${v(values, "incident_description")}

LOSS / HARM CAUSED:
${v(values, "loss_description", "As described above")}

WITNESS (if any):
${v(values, "witness_name", "None known at this time")}

I request you to take immediate cognizance of the matter, register an FIR under appropriate sections of the Indian Penal Code / Bharatiya Nyaya Sanhita (BNS), investigate the matter, and take necessary action against the accused.

I declare that the facts stated above are true and correct to the best of my knowledge and belief.

Complainant:
Name: ${v(values, "complainant_name")}
Signature: _______________
Date: ${today()}

For Official Use:
FIR No.: _______________
Date Received: _______________
Receiving Officer: _______________`,
  },

  {
    id: "affidavit",
    title: "General Affidavit",
    description: "Sworn affidavit for official declarations and verifications",
    category: "Legal",
    fields: [
      { id: "deponent_name", label: "Deponent Full Name", type: "text", placeholder: "Kavitha Nair", required: true },
      { id: "deponent_age", label: "Age", type: "number", placeholder: "35", required: true },
      { id: "deponent_occupation", label: "Occupation", type: "text", placeholder: "Teacher", required: true },
      { id: "deponent_address", label: "Residential Address", type: "textarea", placeholder: "56, Malleswaram, Bengaluru - 560003", required: true },
      { id: "statement_purpose", label: "Purpose of Affidavit", type: "text", placeholder: "Change of Name / Address Proof / Declaration of Facts", required: true },
      { id: "statement_content", label: "Statement / Declaration (detailed)", type: "textarea", placeholder: "I solemnly affirm that my name in the school records is Kavitha while my correct name is Kavitha Nair...", required: true },
      { id: "place", label: "Place of Execution", type: "text", placeholder: "Bengaluru", required: true },
    ],
    generate: (values) => `AFFIDAVIT

I, ${v(values, "deponent_name")}, aged ${v(values, "deponent_age")} years, ${v(values, "deponent_occupation")}, residing at ${v(values, "deponent_address")}, do hereby solemnly affirm and declare as under:

PURPOSE: ${v(values, "statement_purpose")}

DECLARATION:

${v(values, "statement_content")}

I further declare that the above statements are true and correct to the best of my knowledge, information, and belief. Nothing has been concealed or misrepresented.

VERIFICATION:

Verified at ${v(values, "place")} on ${today()} that the contents of the above affidavit are true and correct to the best of my knowledge and belief and nothing material has been concealed therefrom.

                                           Deponent:
                                           Name: ${v(values, "deponent_name")}
                                           Signature: _______________
                                           Date: ${today()}
                                           Place: ${v(values, "place")}

Solemnly affirmed before me on ${today()} at ${v(values, "place")}.

Notary / Oath Commissioner:
Name: _______________
Registration No.: _______________
Seal & Signature: _______________
Date: ${today()}`,
  },

  {
    id: "income-certificate",
    title: "Income Certificate Request",
    description: "Application to Tahsildar for issuance of income certificate",
    category: "Government",
    fields: [
      { id: "applicant_name", label: "Applicant Full Name", type: "text", placeholder: "Basavraj Patil", required: true },
      { id: "applicant_dob", label: "Date of Birth", type: "date", required: true },
      { id: "applicant_address", label: "Permanent Address (Village/Ward, Taluk, District)", type: "textarea", placeholder: "Hoskote Village, Hoskote Taluk, Bengaluru Rural - 562114", required: true },
      { id: "applicant_mobile", label: "Mobile Number", type: "text", placeholder: "9900112233", required: true },
      { id: "father_name", label: "Father's/Husband's Name", type: "text", placeholder: "Siddappa Patil", required: true },
      { id: "annual_income", label: "Annual Family Income (₹)", type: "number", placeholder: "120000", required: true },
      { id: "income_source", label: "Source of Income", type: "text", placeholder: "Agriculture / Daily Wages / Business", required: true },
      { id: "purpose", label: "Purpose of Income Certificate", type: "text", placeholder: "Scholarship / Caste Certificate / Bank Loan", required: true },
      { id: "tahsildar_office", label: "Tahsildar Office / Revenue Department", type: "text", placeholder: "Office of Tahsildar, Hoskote, Bengaluru Rural", required: true },
    ],
    generate: (values) => `APPLICATION FOR INCOME CERTIFICATE

Date: ${today()}

To,
The Tahsildar,
${v(values, "tahsildar_office")}

Subject: Application for Issuance of Annual Income Certificate

Respected Sir/Madam,

I, ${v(values, "applicant_name")}, son/daughter/wife of ${v(values, "father_name")}, residing at ${v(values, "applicant_address")}, Mobile: ${v(values, "applicant_mobile")}, hereby submit this application for issuance of an Income Certificate.

PERSONAL DETAILS:
Name: ${v(values, "applicant_name")}
Date of Birth: ${v(values, "applicant_dob")}
Father's/Husband's Name: ${v(values, "father_name")}
Address: ${v(values, "applicant_address")}
Mobile: ${v(values, "applicant_mobile")}

INCOME DETAILS:
Annual Family Income: Rs. ${v(values, "annual_income")}/- (Rupees ${v(values, "annual_income")} only)
Source of Income: ${v(values, "income_source")}

PURPOSE: ${v(values, "purpose")}

DECLARATION:
I hereby declare that the above information is true and correct. I have not suppressed any material facts. I undertake to provide any additional information or documents as required by your office.

I request you to kindly verify the details and issue the Income Certificate at the earliest.

Thanking You,

Yours faithfully,

Applicant Signature: _______________
Name: ${v(values, "applicant_name")}
Date: ${today()}

Enclosures:
1. Aadhaar Card (copy)
2. Ration Card (copy)
3. Self-declaration of income
4. Passbook copy (if any)
5. Passport-size photograph`,
  },

  {
    id: "caste-certificate",
    title: "Caste Certificate Application",
    description: "Application to Tahsildar for caste/community certificate",
    category: "Government",
    fields: [
      { id: "applicant_name", label: "Applicant Full Name", type: "text", placeholder: "Ravi Gowda", required: true },
      { id: "applicant_dob", label: "Date of Birth", type: "date", required: true },
      { id: "applicant_address", label: "Permanent Address", type: "textarea", placeholder: "Nelamangala, Bengaluru Rural - 562123", required: true },
      { id: "applicant_mobile", label: "Mobile Number", type: "text", placeholder: "9741236789", required: true },
      { id: "father_name", label: "Father's Name", type: "text", placeholder: "Nanjunda Gowda", required: true },
      { id: "caste_name", label: "Caste / Community Name", type: "text", placeholder: "Vokkaliga / SC / ST / OBC", required: true },
      { id: "sub_caste", label: "Sub-Caste (if applicable)", type: "text", placeholder: "Morasu Vokkaliga" },
      { id: "religion", label: "Religion", type: "text", placeholder: "Hindu", required: true },
      { id: "purpose", label: "Purpose", type: "text", placeholder: "Admission / Government Job / Scholarship", required: true },
      { id: "tahsildar_office", label: "Tahsildar Office", type: "text", placeholder: "Office of Tahsildar, Nelamangala Taluk", required: true },
    ],
    generate: (values) => `APPLICATION FOR CASTE / COMMUNITY CERTIFICATE

Date: ${today()}

To,
The Tahsildar,
${v(values, "tahsildar_office")}

Subject: Application for Issuance of Caste/Community Certificate

Respected Sir/Madam,

I, ${v(values, "applicant_name")}, son/daughter of ${v(values, "father_name")}, residing at ${v(values, "applicant_address")}, Mobile: ${v(values, "applicant_mobile")}, hereby request the issuance of a Caste / Community Certificate.

PERSONAL DETAILS:
Name: ${v(values, "applicant_name")}
Date of Birth: ${v(values, "applicant_dob")}
Father's Name: ${v(values, "father_name")}
Address: ${v(values, "applicant_address")}
Mobile: ${v(values, "applicant_mobile")}

COMMUNITY DETAILS:
Caste/Community: ${v(values, "caste_name")}
Sub-Caste: ${v(values, "sub_caste", "N/A")}
Religion: ${v(values, "religion")}

PURPOSE: ${v(values, "purpose")}

DECLARATION:
I hereby solemnly declare that I belong to the ${v(values, "caste_name")} community. The information provided is true and correct. I have not obtained a caste certificate by misrepresentation or fraud. I understand that providing false information is a punishable offence under the law.

I request your kind office to verify the details and issue the Caste Certificate at the earliest.

Thanking You,

Yours faithfully,

Applicant Signature: _______________
Name: ${v(values, "applicant_name")}
Date: ${today()}

Enclosures:
1. Aadhaar Card (copy)
2. Father's Caste Certificate (copy)
3. School Records / Transfer Certificate (copy)
4. Ration Card (copy)
5. Passport-size photograph`,
  },

  {
    id: "property-dispute",
    title: "Property Dispute Complaint",
    description: "Complaint to civil authority regarding property encroachment or dispute",
    category: "Property",
    fields: [
      { id: "complainant_name", label: "Your Full Name", type: "text", placeholder: "Malathi Devi", required: true },
      { id: "complainant_address", label: "Your Address", type: "textarea", placeholder: "14, Vijayanagar, Bengaluru - 560040", required: true },
      { id: "complainant_mobile", label: "Your Mobile", type: "text", placeholder: "9560012345", required: true },
      { id: "authority_name", label: "Authority / Office Name", type: "text", placeholder: "Revenue Divisional Officer / BBMP Grievance Cell", required: true },
      { id: "opponent_name", label: "Name of Opposite Party", type: "text", placeholder: "Suresh Nayak", required: true },
      { id: "opponent_address", label: "Address of Opposite Party", type: "textarea", placeholder: "16, Vijayanagar, Bengaluru", required: true },
      { id: "property_description", label: "Disputed Property Description", type: "textarea", placeholder: "Site No. 47, Survey No. 12/3, Vijayanagar, Bengaluru - 560040", required: true },
      { id: "dispute_description", label: "Details of Dispute / Encroachment", type: "textarea", placeholder: "The opposite party has illegally encroached upon 2 feet of my property boundary wall...", required: true },
      { id: "documents_held", label: "Documents in Your Possession", type: "text", placeholder: "Sale deed, Khata, Tax receipts, Survey sketch", required: true },
      { id: "relief_sought", label: "Relief / Action Requested", type: "textarea", placeholder: "Kindly conduct a spot inspection and direct removal of unauthorized construction", required: true },
    ],
    generate: (values) => `PROPERTY DISPUTE COMPLAINT

Date: ${today()}

To,
The ${v(values, "authority_name")}

Subject: Complaint Regarding Property Dispute / Encroachment

Respected Sir/Madam,

I, ${v(values, "complainant_name")}, residing at ${v(values, "complainant_address")}, Mobile: ${v(values, "complainant_mobile")}, hereby submit this complaint against ${v(values, "opponent_name")}, residing at ${v(values, "opponent_address")}, regarding an illegal encroachment/dispute over my property.

PROPERTY DETAILS:
${v(values, "property_description")}

DETAILS OF DISPUTE:
${v(values, "dispute_description")}

DOCUMENTS IN MY POSSESSION:
${v(values, "documents_held")}

RELIEF SOUGHT:
${v(values, "relief_sought")}

I humbly request your good office to:
1. Take cognizance of this complaint
2. Conduct a spot inspection of the disputed property
3. Issue appropriate directions to the opposite party to stop encroachment
4. Restore the status quo and protect my legal rights over the property

I am ready to cooperate fully with the investigation and will provide all required documents.

Thanking You,

Yours faithfully,

Complainant Signature: _______________
Name: ${v(values, "complainant_name")}
Date: ${today()}

Enclosures:
1. Copy of Sale Deed / Title Document
2. Property Tax Receipts
3. Khata Certificate
4. Survey Sketch
5. Photographs of encroachment (if any)`,
  },

  {
    id: "tenant-notice",
    title: "Tenant Eviction Notice",
    description: "Legal notice from landlord to tenant requesting vacation of premises",
    category: "Property",
    fields: [
      { id: "landlord_name", label: "Landlord Full Name", type: "text", placeholder: "Govind Rao", required: true },
      { id: "landlord_address", label: "Landlord Address", type: "textarea", placeholder: "5, Indiranagar, Bengaluru - 560038", required: true },
      { id: "tenant_name", label: "Tenant Full Name", type: "text", placeholder: "Ashok Singh", required: true },
      { id: "property_address", label: "Property to be Vacated", type: "textarea", placeholder: "Flat No. 101, Galaxy Apartments, Indiranagar, Bengaluru", required: true },
      { id: "notice_days", label: "Notice Period (Days)", type: "number", placeholder: "30", required: true },
      { id: "vacate_by_date", label: "Date to Vacate By", type: "date", required: true },
      { id: "reason", label: "Reason for Eviction", type: "select", required: true, options: ["Non-payment of rent", "Expiry of lease agreement", "Breach of agreement terms", "Landlord requires premises for personal use", "Illegal activities on premises", "Sub-letting without permission", "Damage to property"] },
      { id: "arrears_amount", label: "Pending Rent Arrears (₹, if any)", type: "number", placeholder: "0" },
      { id: "additional_details", label: "Additional Details", type: "textarea", placeholder: "Despite multiple reminders, no rent has been paid for 3 months..." },
    ],
    generate: (values) => `LEGAL NOTICE TO VACATE PREMISES

Date: ${today()}

FROM:
${v(values, "landlord_name")}
${v(values, "landlord_address")}

TO:
${v(values, "tenant_name")}
(Tenant at the premises mentioned below)

NOTICE FOR: ${v(values, "reason")}

Dear ${v(values, "tenant_name")},

TAKE NOTICE that you are hereby called upon to vacate and hand over peaceful possession of the following premises:

PREMISES: ${v(values, "property_address")}

REASON FOR THIS NOTICE:
${v(values, "reason")}

${v(values, "additional_details") ? `DETAILS:\n${v(values, "additional_details")}\n` : ""}
${parseInt(v(values, "arrears_amount", "0")) > 0 ? `ARREARS: You are also liable to pay the pending rent arrears of Rs. ${v(values, "arrears_amount")}/- immediately.\n` : ""}
You are hereby required to:
1. Vacate the above-mentioned premises on or before ${v(values, "vacate_by_date")}
2. Clear all outstanding dues including rent, electricity, water, and maintenance charges
3. Restore the premises to its original condition and remove all personal belongings
4. Hand over all keys and access cards/fobs to the landlord upon vacation

Please note that this is a legal notice as required under applicable tenancy laws. If you fail to comply with this notice within the stipulated period, I shall be constrained to initiate legal proceedings against you for eviction, recovery of dues, and damages, at your cost and risk.

This notice is issued without prejudice to all other rights and remedies available under law.

Landlord:
Name: ${v(values, "landlord_name")}
Signature: _______________
Date: ${today()}`,
  },

  {
    id: "loan-repayment",
    title: "Loan Repayment Agreement",
    description: "Agreement between lender and borrower for repayment of personal loan",
    category: "Finance",
    fields: [
      { id: "lender_name", label: "Lender Full Name", type: "text", placeholder: "Venkatesh Murthy", required: true },
      { id: "lender_address", label: "Lender Address", type: "textarea", placeholder: "22, Sadashivanagar, Bengaluru - 560080", required: true },
      { id: "borrower_name", label: "Borrower Full Name", type: "text", placeholder: "Kiran Kumar", required: true },
      { id: "borrower_address", label: "Borrower Address", type: "textarea", placeholder: "34, Rajajinagar, Bengaluru - 560010", required: true },
      { id: "loan_amount", label: "Loan Amount (₹)", type: "number", placeholder: "100000", required: true },
      { id: "loan_date", label: "Date Loan Was Provided", type: "date", required: true },
      { id: "interest_rate", label: "Interest Rate (% per annum, 0 if none)", type: "number", placeholder: "12", required: true },
      { id: "repayment_start", label: "Repayment Start Date", type: "date", required: true },
      { id: "emi_amount", label: "Monthly EMI Amount (₹)", type: "number", placeholder: "10000", required: true },
      { id: "total_installments", label: "Total Number of Installments", type: "number", placeholder: "12", required: true },
      { id: "repayment_mode", label: "Mode of Repayment", type: "select", options: ["Bank Transfer / NEFT", "Cash", "Cheque", "UPI"], required: true },
      { id: "collateral", label: "Collateral / Security (if any)", type: "text", placeholder: "None / Gold jewelry / Property documents" },
    ],
    generate: (values) => `LOAN REPAYMENT AGREEMENT

This Loan Repayment Agreement is made on ${today()}.

BETWEEN:

LENDER: ${v(values, "lender_name")}, residing at ${v(values, "lender_address")} (hereinafter called "the Lender").

AND

BORROWER: ${v(values, "borrower_name")}, residing at ${v(values, "borrower_address")} (hereinafter called "the Borrower").

WHEREAS the Lender had advanced a sum of Rs. ${v(values, "loan_amount")}/- to the Borrower on ${v(values, "loan_date")}.

NOW THEREFORE, the parties agree to the following repayment terms:

1. LOAN AMOUNT: Rs. ${v(values, "loan_amount")}/- (Rupees ${v(values, "loan_amount")} only)

2. INTEREST: ${parseInt(v(values, "interest_rate", "0")) > 0 ? `Interest shall be charged at ${v(values, "interest_rate")}% per annum on the outstanding principal.` : "This is an interest-free loan."}

3. REPAYMENT SCHEDULE:
   - Monthly EMI: Rs. ${v(values, "emi_amount")}/-
   - Number of Installments: ${v(values, "total_installments")}
   - Starting From: ${v(values, "repayment_start")}
   - Total Repayment Amount: Rs. ${(parseInt(v(values, "emi_amount", "0")) * parseInt(v(values, "total_installments", "0"))).toLocaleString("en-IN")}/-

4. MODE OF PAYMENT: ${v(values, "repayment_mode")}

5. COLLATERAL / SECURITY: ${v(values, "collateral", "None")}

6. DEFAULT: If the Borrower fails to pay any installment within 7 days of the due date, the entire outstanding amount shall become immediately due and payable. The Lender reserves the right to take legal action for recovery.

7. PREPAYMENT: The Borrower may prepay the loan in full or in part at any time without penalty.

8. DISPUTE RESOLUTION: Any disputes arising from this agreement shall be resolved through mutual discussion, failing which through legal recourse in courts having jurisdiction over ${v(values, "lender_address").split(",")[1]?.trim() || "Bengaluru"}.

IN WITNESS WHEREOF, both parties have signed this Agreement on the date mentioned above.

LENDER:                                    BORROWER:
${v(values, "lender_name")}                ${v(values, "borrower_name")}
Signature: _______________                 Signature: _______________
Date: ${today()}                           Date: ${today()}

WITNESS:
Name: _______________
Signature: _______________
Date: ${today()}`,
  },
];
