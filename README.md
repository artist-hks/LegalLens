# ⚖️ LegalLens — AI Legal Document Analyzer for Indian SMEs

**LegalLens** is a fully client-side, AI-style legal document risk analyzer built for Indian small & medium businesses. Upload a contract (PDF / DOCX / TXT) and instantly get risk-clause detection, a 0–100 risk score, plain-language summaries in **English & हिंदी**, and an exportable PDF report. **Zero backend, zero API keys, no signup.**

---

## 🚀 Currently Completed Features

| Feature | Status |
|---|---|
| Landing page with hero, feature pills & SME stats | ✅ |
| Drag & drop upload zone (PDF / DOCX / TXT, 10MB limit) | ✅ |
| **"Try with Demo Agreement"** — instant demo with a realistic Jaipur commercial rental agreement | ✅ |
| PDF parsing via **pdf.js 3.11.174** (CDN worker), DOCX via **mammoth**, TXT via FileReader | ✅ |
| **Clause detection engine** — 11 rules (6 high / 3 medium / 2 info), keyword-based, case-insensitive, first-match-per-rule with ±150-char context snippets | ✅ |
| **Risk scoring** — `high×28 + medium×12 + info×3`, clamped to 100, with LOW/MEDIUM/HIGH bands | ✅ |
| Animated loading overlay (2.5 s) with spinning scale icon, progress bar & 4 cycling status messages | ✅ |
| **Custom SVG semicircle risk gauge** with animated arc + gold needle | ✅ |
| **Risk breakdown donut** (pure SVG, animated) with issue counts | ✅ |
| Sidebar: document info, re-analyze, quick stats (parties / value / jurisdiction) | ✅ |
| **Clause Analysis tab** — severity-sorted cards, left border accent, matched-keyword highlight, expandable "What this means / What to do" + Hindi explanations, staggered entry animation | ✅ |
| **Plain Summary tab** — English ⇄ हिंदी toggle, highlight cards, Top 3 risks list | ✅ |
| **Full Text tab** — monospace view with yellow (high) / orange (medium) sentence highlights, char/word count | ✅ |
| **Export PDF Report** via jsPDF — branded header, score bar, all clauses with explanations & recommendations, disclaimer footer | ✅ |
| Error states: empty file, unsupported format, parse error, >10MB, "no risks found" green state | ✅ |
| Responsive layout (sidebar stacks on mobile), legal disclaimer footer on every screen | ✅ |

## 🔗 Functional Entry Points

| Path | Description |
|---|---|
| `index.html` | Single-page app — the only entry point. All flows (landing → loading → analysis) are client-side state transitions. |

No URL parameters or backend endpoints — everything runs in the browser.

## 🏗️ Architecture Note (Build-Free React)

The original spec targeted Vite + npm. Because this project is deployed as a **static website**, the identical app is implemented **build-free**:

- **React 18 (UMD)** + **Babel Standalone** for JSX — no `npm install` needed
- **Tailwind CSS (CDN)** with the spec's custom theme (navy/risk colors, Inter + Playfair Display)
- **Framer Motion replaced** by equivalent CSS keyframe animations (fade-up, stagger `0.08s`, expand/collapse, gauge/donut transitions)
- **Recharts replaced** by a hand-rolled pure-SVG donut (same visual result, fewer dependency risks)
- **lucide-react replaced** by inline SVG icons using lucide's path data
- pdf.js, mammoth and jsPDF load from CDN exactly as specified

### File Structure
```
index.html               app shell + CDN imports
favicon.svg              navy/gold scale icon
css/style.css            design-system variables, cards, animations
src/
├── App.jsx              root state machine (landing|loading|analysis)
├── data/sampleDoc.js    demo rental agreement
├── utils/
│   ├── clauseEngine.js  CLAUSE_RULES + detectClauses + calculateRiskScore
│   ├── summarizer.js    generateSummary (parties/date/amount/jurisdiction regex)
│   ├── pdfParser.js     parseFile → PDF/DOCX/TXT
│   └── exportReport.js  jsPDF report generator
└── components/
    ├── Icons.jsx        inline lucide-style SVG icons
    ├── Header.jsx       Sidebar.jsx       RiskGauge.jsx     RiskDonut.jsx
    ├── LandingScreen.jsx UploadZone.jsx   LoadingOverlay.jsx
    ├── AnalysisScreen.jsx ClauseList.jsx  ClauseCard.jsx
    ├── SummaryPanel.jsx  FullTextPanel.jsx
```

## 📊 Data Models & Storage

- **No persistent storage** — analysis is ephemeral and in-memory (privacy-friendly: documents never leave the browser).
- `DetectedClause`: `{ ruleId, name, severity, matchedKeyword, snippetText, explanation, recommendation, hindiExplanation, hindiRecommendation }`
- `Summary`: `{ englishSummary, hindiSummary, parties[], date, amount, jurisdiction, highRiskCount, mediumRiskCount, infoCount, topRisks[] }`
- `RiskInfo`: `{ score, riskLevel, label, color, labelBg, counts:{high,medium,info} }`

## 🧪 Verified (headless browser)

- Demo flow renders analysis screen ✅ · 10 clauses detected on sample doc (6 high, 2 medium, 2 info → score 100, HIGH RISK) ✅ · gauge & donut render ✅ · card expand works ✅ · Hindi/English toggle works ✅ · full-text highlights (8 marked sentences) ✅ · no console errors ✅

## 🔮 Features Not Yet Implemented / Next Steps

1. **OCR for scanned PDFs** (tesseract.js) — current parser only reads text-layer PDFs
2. **More clause rules** — e.g., security deposit, lock-in period, GST liability, force majeure
3. **Regex-based rules with fuzzy matching** for paraphrased clauses
4. **Clause comparison** against a "fair standard" template library
5. **Save analysis history** using the RESTful Table API
6. **More Indian languages** — Tamil, Telugu, Bengali, Marathi summaries
7. **Share report via link** (URL-encoded analysis state)

## ⚠️ Disclaimer

LegalLens is an AI tool for awareness only. Always consult a qualified lawyer before signing. **Not legal advice.**

## 🌐 Deployment

To publish the site, use the **Publish tab** — it deploys with one click and gives you the live URL.
