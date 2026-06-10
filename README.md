<div align="center">

<img src="https://raw.githubusercontent.com/artist-hks/LegalLens/main/favicon.svg" alt="LegalLens Logo" width="80" height="80" />

# ⚖️ LegalLens

### AI-Powered Legal Document Risk Analyzer for Indian SMEs

**Instant risk detection · Plain-language summaries · English & हिंदी · Zero backend · No signup**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-legal--lens--hks.vercel.app-0F2342?style=for-the-badge)](https://legal-lens-hks.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-gold?style=for-the-badge)](LICENSE)
[![Built With React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org)
[![No Build Required](https://img.shields.io/badge/Build_Free-✓-brightgreen?style=for-the-badge)](#️-architecture)

</div>

---

## 📖 Overview

**LegalLens** is a fully client-side legal document analyzer designed specifically for Indian small and medium enterprises (SMEs). Upload any contract — rental agreements, vendor contracts, service agreements — and instantly receive:

- 🔍 **Clause-by-clause risk detection** across 11 predefined legal risk rules
- 📊 **A 0–100 risk score** with LOW / MEDIUM / HIGH bands
- 🌐 **Plain-language summaries in English and हिंदी**
- 📄 **Exportable PDF reports** with branded formatting
- 🔒 **Complete privacy** — your documents never leave the browser

> 🇮🇳 Built for India's ~63 million SMEs who navigate complex legal documents without in-house legal counsel.

---

## ✨ Features

### 📤 Document Upload & Parsing
| Feature | Details |
|---|---|
| **Supported formats** | PDF, DOCX, TXT |
| **Max file size** | 10 MB |
| **Upload method** | Drag & drop or click to browse |
| **PDF parsing** | pdf.js 3.11.174 (text-layer extraction) |
| **DOCX parsing** | Mammoth.js |
| **TXT parsing** | Native FileReader API |
| **Demo mode** | One-click sample Jaipur commercial rental agreement |

### 🔍 Clause Detection Engine
The engine scans documents against **11 predefined risk rules** (6 High · 3 Medium · 2 Info), extracting ±150-character context snippets per match:

| Severity | Count | Score Weight |
|---|---|---|
| 🔴 High Risk | 6 rules | ×28 per match |
| 🟡 Medium Risk | 3 rules | ×12 per match |
| 🟢 Info | 2 rules | ×3 per match |

Risk score formula: `(high × 28) + (medium × 12) + (info × 3)`, clamped to **100**.

### 📊 Visual Analytics
- **Animated semicircle risk gauge** — custom SVG with a gold needle and smooth animation
- **Risk breakdown donut chart** — pure SVG, animated, showing issue counts per severity
- **Staggered clause cards** — sorted by severity with colored left-border accents and keyword highlights

### 🌐 Bilingual Summaries
Every detected clause includes:
- Plain-English explanation of what the clause means
- Actionable recommendation ("What to do")
- Full **हिंदी translation** of both, toggled instantly

### 📄 PDF Export
Generates a branded, jsPDF-powered report containing:
- Header with LegalLens branding and document name
- Visual risk score bar
- All detected clauses with full explanations and recommendations
- Legal disclaimer footer

---

## 🖥️ Live Demo

> **Try it now:** [legal-lens-hks.vercel.app](https://legal-lens-hks.vercel.app)

Click **"Try with Demo Agreement"** to instantly analyze a realistic Jaipur commercial rental agreement — no upload needed.

**Sample output on demo doc:**
- 10 clauses detected (6 High · 2 Medium · 2 Info)
- Risk Score: **100 / 100 — HIGH RISK**
- 8 sentences highlighted in full-text view

---

## 🏗️ Architecture

LegalLens is a **build-free single-page application**. No npm, no Webpack, no bundler — just open `index.html`.

```
index.html               ← App shell + CDN script imports
favicon.svg              ← Navy/gold scale icon
css/
└── style.css            ← Design system variables, cards, animations
src/
├── App.jsx              ← Root state machine (landing | loading | analysis)
├── data/
│   └── sampleDoc.js     ← Demo Jaipur rental agreement text
├── utils/
│   ├── clauseEngine.js  ← CLAUSE_RULES + detectClauses() + calculateRiskScore()
│   ├── summarizer.js    ← generateSummary() — regex extraction for parties, date, amount, jurisdiction
│   ├── pdfParser.js     ← parseFile() — dispatches to PDF / DOCX / TXT handler
│   └── exportReport.js  ← jsPDF branded report generator
└── components/
    ├── Icons.jsx         ← Inline lucide-style SVG icons
    ├── Header.jsx        ← Top navigation bar
    ├── Sidebar.jsx       ← Document info, quick stats, re-analyze
    ├── RiskGauge.jsx     ← Animated SVG semicircle gauge
    ├── RiskDonut.jsx     ← Animated SVG donut chart
    ├── LandingScreen.jsx ← Hero section, feature pills, SME stats
    ├── UploadZone.jsx    ← Drag & drop upload area
    ├── LoadingOverlay.jsx← 2.5s animated loading with cycling status messages
    ├── AnalysisScreen.jsx← Tabbed analysis layout
    ├── ClauseList.jsx    ← Clause cards container
    ├── ClauseCard.jsx    ← Individual expandable clause with EN/HI content
    ├── SummaryPanel.jsx  ← English ⇄ हिंदी summary toggle
    └── FullTextPanel.jsx ← Monospace full-text with sentence highlights
```

### Technology Choices

| Spec'd Library | Deployed As | Reason |
|---|---|---|
| Vite + npm | Build-free CDN | Static deployment, zero toolchain |
| Framer Motion | CSS keyframe animations | No bundler dependency |
| Recharts | Hand-rolled SVG donut | Zero external JS for charts |
| lucide-react | Inline SVG paths | No import resolution needed |
| React 18 (ESM) | React 18 UMD + Babel Standalone | JSX without a build step |

### CDN Dependencies

```html
React 18 UMD          cdn.jsdelivr.net
Babel Standalone       cdn.jsdelivr.net
Tailwind CSS (CDN)    cdn.tailwindcss.com
pdf.js 3.11.174       cdnjs.cloudflare.com
mammoth 1.6.0         cdn.jsdelivr.net
jsPDF 2.5.1           cdn.jsdelivr.net
Inter + Playfair Display  fonts.googleapis.com
```

---

## 📐 Data Models

All data is **in-memory and ephemeral** — no localStorage, no cookies, no server. Documents are processed entirely in the browser.

```js
// Detected clause from the engine
DetectedClause {
  ruleId: string,
  name: string,
  severity: "high" | "medium" | "info",
  matchedKeyword: string,
  snippetText: string,           // ±150 chars around match
  explanation: string,           // English: what this means
  recommendation: string,        // English: what to do
  hindiExplanation: string,      // हिंदी explanation
  hindiRecommendation: string,   // हिंदी recommendation
}

// Document summary
Summary {
  englishSummary: string,
  hindiSummary: string,
  parties: string[],
  date: string,
  amount: string,
  jurisdiction: string,
  highRiskCount: number,
  mediumRiskCount: number,
  infoCount: number,
  topRisks: string[],
}

// Risk scoring result
RiskInfo {
  score: number,                 // 0–100
  riskLevel: "LOW" | "MEDIUM" | "HIGH",
  label: string,
  color: string,
  labelBg: string,
  counts: { high, medium, info }
}
```

---

## 🚀 Getting Started

### Option 1 — Run Locally (Zero Setup)

```bash
git clone https://github.com/artist-hks/LegalLens.git
cd LegalLens
# Open in browser — no npm install, no build step needed
open index.html
```

> ⚠️ Some browsers block local `file://` cross-origin script loads. If you see errors, use a local server (see Option 2).

### Option 2 — Local Dev Server

```bash
# Using Python (built-in)
python -m http.server 8080
# Then open http://localhost:8080

# Or using Node.js
npx serve .
# Then open http://localhost:3000
```

### Option 3 — Deploy to Vercel / Netlify

This is a static site — just connect your GitHub repo. No build command or output directory configuration is needed.

```
Build Command:    (leave empty)
Output Directory: (leave empty or set to /)
```

---

## 🗺️ Roadmap

| # | Feature | Status |
|---|---|---|
| 1 | OCR for scanned PDFs (tesseract.js) | 🔜 Planned |
| 2 | Expanded clause rule library (security deposit, lock-in, GST liability, force majeure) | 🔜 Planned |
| 3 | Regex + fuzzy matching for paraphrased clauses | 🔜 Planned |
| 4 | Clause comparison against a "fair standard" template library | 💡 Idea |
| 5 | Saved analysis history | 💡 Idea |
| 6 | Additional Indian language summaries (Tamil, Telugu, Bengali, Marathi) | 💡 Idea |
| 7 | Shareable report links (URL-encoded analysis state) | 💡 Idea |

---

## ⚠️ Disclaimer

**LegalLens is an informational tool only.** Risk detection is keyword-based and does not constitute legal advice. Analysis results are for awareness purposes and should not be relied upon as a substitute for professional legal consultation.

**Always consult a qualified lawyer before signing any contract.**

---

## 📄 License

Distributed under the [MIT License](LICENSE). You are free to use, modify, and distribute this project with attribution.

---

## 🙌 Contributing

Contributions are welcome! To add clause rules, improve Hindi translations, or expand language support:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-clause-rules`
3. Edit `src/utils/clauseEngine.js` to add rules or `src/utils/summarizer.js` for extraction improvements
4. Open a Pull Request with a clear description

---

<div align="center">

Made with ❤️ for India's SMEs &nbsp;|&nbsp; Built in Jaipur, Rajasthan

[🌐 Live App](https://legal-lens-hks.vercel.app) &nbsp;·&nbsp; [🐛 Report a Bug](https://github.com/artist-hks/LegalLens/issues) &nbsp;·&nbsp; [💡 Request a Feature](https://github.com/artist-hks/LegalLens/issues)

</div>
