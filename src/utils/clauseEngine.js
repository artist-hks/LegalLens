// ═══════════════════════════════════════════
// LegalLens — Clause Detection Engine
// ═══════════════════════════════════════════

window.CLAUSE_RULES = [

  // ── HIGH RISK ──────────────────────────────────────────────
  {
    id: "unilateral_termination",
    name: "Unilateral Termination",
    severity: "high",
    keywords: [
      "terminate at sole discretion",
      "without cause",
      "without notice",
      "without reason",
      "immediate termination",
      "immediately terminate",
      "no right to challenge"
    ],
    explanation: "The other party can end this contract anytime without giving you any reason or advance notice. You have no legal recourse.",
    recommendation: "Negotiate for mutual termination rights. Both parties should give minimum 30 days written notice. Add 'for cause only' clause.",
    hindiExplanation: "दूसरा पक्ष बिना किसी कारण के कभी भी अनुबंध समाप्त कर सकता है।",
    hindiRecommendation: "दोनों पक्षों के लिए 30 दिन का नोटिस अनिवार्य करें।"
  },
  {
    id: "unlimited_liability",
    name: "Unlimited Liability",
    severity: "high",
    keywords: [
      "unlimited liability",
      "indemnify against all",
      "all losses",
      "all damages whatsoever",
      "all claims",
      "consequential indirect and punitive",
      "full liability"
    ],
    explanation: "You are personally responsible for ALL possible losses with no upper limit. This can exceed the contract value many times over.",
    recommendation: "Always cap your liability to the contract value or 3 months of fees. Exclude consequential and punitive damages explicitly.",
    hindiExplanation: "आपकी जिम्मेदारी असीमित है — अनुबंध मूल्य से कहीं अधिक नुकसान भी आपको भरना पड़ सकता है।",
    hindiRecommendation: "देनदारी को अनुबंध मूल्य तक सीमित करें।"
  },
  {
    id: "auto_renewal",
    name: "Auto-Renewal Trap",
    severity: "high",
    keywords: [
      "automatically renewed",
      "deemed renewed",
      "automatically extended",
      "auto-renew",
      "unless terminated 90 days",
      "unless terminated 60 days",
      "automatically continue"
    ],
    explanation: "The contract silently renews itself unless you send notice 90+ days before expiry. Missing this deadline locks you in for another full term.",
    recommendation: "Reduce the notice window to 30 days. Add a calendar reminder immediately. Better: negotiate for opt-in renewal instead of opt-out.",
    hindiExplanation: "90 दिन पहले नोटिस न देने पर अनुबंध अपने आप नवीनीकृत हो जाएगा।",
    hindiRecommendation: "नोटिस विंडो को 30 दिन करें।"
  },
  {
    id: "ip_grab",
    name: "IP Ownership Grab",
    severity: "high",
    keywords: [
      "all intellectual property",
      "work for hire",
      "assign all rights",
      "all inventions",
      "all developments belong",
      "intellectual property created during",
      "improvements shall become property"
    ],
    explanation: "Any work, ideas, or improvements you create during this contract automatically belong to the other party — not you.",
    recommendation: "Add a schedule listing your pre-existing IP that is excluded. Limit assignment only to work specifically contracted for.",
    hindiExplanation: "आपके द्वारा बनाई गई कोई भी चीज़ दूसरे पक्ष की संपत्ति बन जाएगी।",
    hindiRecommendation: "पूर्व-मौजूद IP को बाहर रखें।"
  },
  {
    id: "non_compete",
    name: "Broad Non-Compete Clause",
    severity: "high",
    keywords: [
      "shall not compete",
      "non-compete",
      "not engage in similar",
      "prohibited from working",
      "similar business operations",
      "not carry on business"
    ],
    explanation: "You cannot work in a similar field within a wide area for years after this contract ends. This can severely restrict your livelihood.",
    recommendation: "Limit geographic scope to the exact premises only, not a 50km radius. Reduce duration to 6 months maximum. Courts often strike down broad non-competes.",
    hindiExplanation: "आप इस अनुबंध के बाद वर्षों तक इसी क्षेत्र में काम नहीं कर सकते।",
    hindiRecommendation: "क्षेत्र सीमित करें, अवधि 6 महीने से अधिक न हो।"
  },
  {
    id: "penalty_clause",
    name: "Excessive Penalty",
    severity: "high",
    keywords: [
      "penalty not less than",
      "penalty of",
      "liquidated damages",
      "forfeit",
      "immediate forfeiture",
      "penalty at discretion",
      "18% per annum"
    ],
    explanation: "The penalty rate is extremely high and can be applied at the other party's sole judgment. This can result in disproportionate financial losses.",
    recommendation: "Negotiate a fixed, reasonable penalty cap. 18% annual interest is excessive — standard RBI rate is 6-8%. Ensure penalties are mutual.",
    hindiExplanation: "जुर्माना बहुत अधिक है और एकतरफा लागू किया जा सकता है।",
    hindiRecommendation: "जुर्माने की एक निश्चित और उचित सीमा तय करें।"
  },

  // ── MEDIUM RISK ────────────────────────────────────────────
  {
    id: "payment_terms",
    name: "Unfavorable Payment Terms",
    severity: "medium",
    keywords: [
      "net 90",
      "net 120",
      "payment within 90 days",
      "payment within 60 days",
      "60 days after receipt",
      "90 days of invoice"
    ],
    explanation: "You will wait 90 days to receive payment. This creates serious cash flow problems, especially for small businesses.",
    recommendation: "Standard Indian SME practice is Net 30. Negotiate for advance payment or milestone-based payments. Net 60 is the maximum acceptable.",
    hindiExplanation: "भुगतान में 90 दिन की देरी आपके नकदी प्रवाह को प्रभावित करेगी।",
    hindiRecommendation: "Net 30 पर जोर दें।"
  },
  {
    id: "foreign_jurisdiction",
    name: "Foreign Jurisdiction",
    severity: "medium",
    keywords: [
      "courts of england",
      "new york courts",
      "singapore courts",
      "foreign jurisdiction",
      "laws of united states",
      "laws of singapore",
      "laws of uk",
      "governed by english law"
    ],
    explanation: "Legal disputes must be resolved in a foreign country under foreign law. This means expensive international travel and legal fees.",
    recommendation: "Insist on Indian jurisdiction, preferably the courts of your city. The governing law must be Indian law.",
    hindiExplanation: "विवाद विदेश में सुलझाना बहुत महंगा और असुविधाजनक होगा।",
    hindiRecommendation: "अपने शहर के भारतीय न्यायालय पर जोर दें।"
  },
  {
    id: "perpetual_confidentiality",
    name: "Perpetual Confidentiality",
    severity: "medium",
    keywords: [
      "perpetual confidentiality",
      "forever confidential",
      "survive termination",
      "all information disclosed",
      "any information whatsoever"
    ],
    explanation: "You must keep information confidential forever with no end date, even after the contract ends. This is overly broad.",
    recommendation: "Limit confidentiality to 3-5 years post-termination. Define specifically what qualifies as 'confidential information'.",
    hindiExplanation: "गोपनीयता की अनंत काल की बाध्यता बहुत अधिक है।",
    hindiRecommendation: "गोपनीयता की अवधि 3-5 वर्ष तक सीमित करें।"
  },

  // ── INFO / SAFE ────────────────────────────────────────────
  {
    id: "indian_jurisdiction",
    name: "Indian Jurisdiction (Good)",
    severity: "info",
    keywords: [
      "laws of india",
      "indian courts",
      "jurisdiction of courts in india",
      "governed by indian law",
      "courts in jaipur",
      "courts in mumbai",
      "courts in delhi"
    ],
    explanation: "Disputes will be resolved in Indian courts under Indian law. This is favorable for you as an Indian SME.",
    recommendation: "Good clause. No action needed. Verify the specific city is convenient for you.",
    hindiExplanation: "विवाद भारतीय न्यायालय में सुलझेगा — यह अनुकूल है।",
    hindiRecommendation: "यह खंड आपके पक्ष में है।"
  },
  {
    id: "dispute_resolution",
    name: "Dispute Resolution",
    severity: "info",
    keywords: [
      "arbitration",
      "mediation",
      "dispute resolution",
      "conciliation"
    ],
    explanation: "The contract has a defined dispute resolution process. Arbitration is usually faster and cheaper than court proceedings.",
    recommendation: "Check that the arbitration venue is in your city. Ensure arbitrators are neutral and not appointed unilaterally.",
    hindiExplanation: "विवाद समाधान की एक निर्धारित प्रक्रिया है।",
    hindiRecommendation: "मध्यस्थता स्थान आपके शहर में सुनिश्चित करें।"
  }
];

// ── Detection ───────────────────────────────────────────────
// 1. Lowercase the full document text
// 2. For each rule, check if ANY keyword exists in the text
// 3. If found, capture the surrounding context (150 chars before/after)
// 4. Return only FIRST match per rule (no duplicates)
window.detectClauses = function detectClauses(docText) {
  if (!docText) return [];
  const lowerText = docText.toLowerCase();
  const results = [];

  for (const rule of window.CLAUSE_RULES) {
    let matched = null;
    for (const keyword of rule.keywords) {
      const idx = lowerText.indexOf(keyword.toLowerCase());
      if (idx !== -1) {
        const start = Math.max(0, idx - 150);
        const end = Math.min(docText.length, idx + keyword.length + 150);
        let snippet = docText.slice(start, end).replace(/\s+/g, " ").trim();
        if (start > 0) snippet = "…" + snippet;
        if (end < docText.length) snippet = snippet + "…";
        matched = {
          ruleId: rule.id,
          name: rule.name,
          severity: rule.severity,
          matchedKeyword: keyword,
          snippetText: snippet,
          explanation: rule.explanation,
          recommendation: rule.recommendation,
          hindiExplanation: rule.hindiExplanation,
          hindiRecommendation: rule.hindiRecommendation
        };
        break; // first match per rule only
      }
    }
    if (matched) results.push(matched);
  }
  return results;
};

// ── Risk Scoring ────────────────────────────────────────────
// score = (high × 28) + (medium × 12) + (info × 3), clamped to 100
window.calculateRiskScore = function calculateRiskScore(clauses) {
  const high = clauses.filter(c => c.severity === "high").length;
  const medium = clauses.filter(c => c.severity === "medium").length;
  const info = clauses.filter(c => c.severity === "info").length;
  const score = Math.min(100, high * 28 + medium * 12 + info * 3);

  let riskLevel, label, color, labelBg;
  if (score <= 30) {
    riskLevel = "low"; label = "LOW RISK"; color = "#059669"; labelBg = "#ECFDF5";
  } else if (score <= 65) {
    riskLevel = "medium"; label = "MEDIUM RISK"; color = "#D97706"; labelBg = "#FFFBEB";
  } else {
    riskLevel = "high"; label = "HIGH RISK"; color = "#DC2626"; labelBg = "#FEF2F2";
  }
  return { score, riskLevel, label, color, labelBg, counts: { high, medium, info } };
};
