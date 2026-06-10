// ═══════════════════════════════════════════
// LegalLens — Plain Language Summarizer
// ═══════════════════════════════════════════

window.generateSummary = function generateSummary(text, clauses) {
  const safeText = text || "";

  // 1. Parties — via "hereinafter referred to as" quoted names + "between X," pattern
  let parties = [];
  const betweenMatch = safeText.match(/between\s+([A-Z][^,]+),/);
  const hereinafterRe = /hereinafter[^"“]*?["“]([^"”]+)["”]/g;
  let m;
  const roleNames = [];
  while ((m = hereinafterRe.exec(safeText)) !== null) {
    roleNames.push(m[1]);
  }
  // Try to capture full entity names: "M/s XYZ ... Ltd." patterns
  const entityRe = /M\/s\s+[A-Z][A-Za-z0-9.&\s]+?(?=,|\s+having)/g;
  let e;
  while ((e = entityRe.exec(safeText)) !== null) {
    const name = e[0].trim();
    if (!parties.includes(name)) parties.push(name);
  }
  if (parties.length === 0 && betweenMatch) parties.push(betweenMatch[1].trim());
  if (parties.length === 0) parties = roleNames.length ? roleNames : ["Party A", "Party B"];
  parties = parties.slice(0, 2);

  // 2. Dates
  const dateMatches = safeText.match(/\d{1,2}(?:st|nd|rd|th)?\s+\w+\s+\d{4}/g) || [];
  const date = dateMatches[0] || "Not specified";

  // 3. Monetary values
  const moneyMatches = safeText.match(/(?:Rs\.?|₹)\s*[\d,]+/g) || [];
  const amount = moneyMatches[0] ? moneyMatches[0].replace(/\s+/g, " ").trim() : "Not specified";

  // 4. Governing law / jurisdiction
  let jurisdiction = "Not specified";
  const cityMatch = safeText.match(/courts?\s+(?:in|of|at)\s+([A-Za-z]+)/i);
  const lawMatch = safeText.match(/laws?\s+of\s+([A-Za-z\s]+?)(?:\s+and|\.|,)/i);
  if (cityMatch && lawMatch) {
    jurisdiction = `Courts in ${capitalize(cityMatch[1])} (Laws of ${capitalize(lawMatch[1].trim())})`;
  } else if (cityMatch) {
    jurisdiction = `Courts in ${capitalize(cityMatch[1])}`;
  } else if (lawMatch) {
    jurisdiction = `Laws of ${capitalize(lawMatch[1].trim())}`;
  }

  function capitalize(s) {
    return s.split(/\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
  }

  const highClauses = clauses.filter(c => c.severity === "high");
  const mediumClauses = clauses.filter(c => c.severity === "medium");
  const infoClauses = clauses.filter(c => c.severity === "info");
  const topRisks = highClauses.slice(0, 3).map(c => c.name);

  // Hindi names for top risks
  const hindiNames = {
    "Unilateral Termination": "एकतरफा समाप्ति",
    "Unlimited Liability": "असीमित देनदारी",
    "Auto-Renewal Trap": "स्वतः-नवीनीकरण जाल",
    "IP Ownership Grab": "बौद्धिक संपदा हड़पना",
    "Broad Non-Compete Clause": "व्यापक गैर-प्रतिस्पर्धा खंड",
    "Excessive Penalty": "अत्यधिक जुर्माना",
    "Unfavorable Payment Terms": "प्रतिकूल भुगतान शर्तें",
    "Foreign Jurisdiction": "विदेशी न्याय क्षेत्र",
    "Perpetual Confidentiality": "स्थायी गोपनीयता"
  };
  const topRisksHindi = topRisks.map(n => hindiNames[n] || n);

  const partyA = parties[0] || "Party A";
  const partyB = parties[1] || "Party B";

  const englishSummary =
    `This agreement is between ${partyA} and ${partyB}, dated ${date}. ` +
    `The contract involves a monthly value of ${amount}, governed by ${jurisdiction}. ` +
    `Our AI analysis detected ${highClauses.length} high-risk clauses, ${mediumClauses.length} medium-risk clauses, and ${infoClauses.length} standard clauses. ` +
    (topRisks.length
      ? `Critical issues requiring legal review: ${topRisks.join(", ")}.`
      : `No critical issues detected. The document appears relatively standard.`);

  const hindiSummary =
    `यह समझौता ${partyA} और ${partyB} के बीच ${date} को हुआ है। ` +
    `अनुबंध मूल्य: ${amount}, न्याय क्षेत्र: ${jurisdiction}। ` +
    `AI विश्लेषण में ${highClauses.length} उच्च जोखिम, ${mediumClauses.length} मध्यम जोखिम खंड पाए गए। ` +
    (topRisksHindi.length
      ? `मुख्य चेतावनियाँ: ${topRisksHindi.join(", ")}।`
      : `कोई बड़ा जोखिम नहीं पाया गया।`);

  return {
    englishSummary,
    hindiSummary,
    parties,
    date,
    amount,
    jurisdiction,
    highRiskCount: highClauses.length,
    mediumRiskCount: mediumClauses.length,
    infoCount: infoClauses.length,
    topRisks
  };
};
