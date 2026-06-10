// ═══════════════════════════════════════════
// LegalLens — Plain Language Summary Panel
// ═══════════════════════════════════════════

window.SummaryPanel = function SummaryPanel({ summary, summaryLang, setSummaryLang }) {
  const { Users, IndianRupee, MapPin, Languages } = window.LLIcons;
  const isHindi = summaryLang === "hindi";

  const highlights = [
    { icon: Users, label: "Parties", value: summary.parties.join(" & ") },
    { icon: IndianRupee, label: "Contract Value", value: summary.amount },
    { icon: MapPin, label: "Jurisdiction", value: summary.jurisdiction }
  ];

  return (
    <section id="summary-panel" className="stagger" aria-label="Plain language summary">

      {/* Language toggle */}
      <div className="flex items-center gap-3 mb-5">
        <Languages size={17} style={{ color: "#64748B" }} />
        <div className="inline-flex rounded-lg p-1" style={{ background: "#E8EDF4" }} role="tablist" aria-label="Summary language">
          <button
            id="lang-en-btn"
            onClick={() => setSummaryLang("english")}
            className="px-4 py-1.5 rounded-md text-sm font-semibold"
            style={!isHindi
              ? { background: "#0F2342", color: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.15)" }
              : { color: "#64748B", background: "transparent" }}
            aria-pressed={!isHindi}
          >
            English
          </button>
          <button
            id="lang-hi-btn"
            onClick={() => setSummaryLang("hindi")}
            className="px-4 py-1.5 rounded-md text-sm font-semibold"
            style={isHindi
              ? { background: "#0F2342", color: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.15)" }
              : { color: "#64748B", background: "transparent" }}
            aria-pressed={isHindi}
          >
            हिंदी
          </button>
        </div>
      </div>

      {/* Summary text */}
      <div className="ll-card p-6">
        <p
          className="m-0"
          style={{ fontSize: "16px", lineHeight: 1.8, color: "#1E293B" }}
          lang={isHindi ? "hi" : "en"}
        >
          {isHindi ? summary.hindiSummary : summary.englishSummary}
        </p>
      </div>

      {/* Highlight cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
        {highlights.map((h) => (
          <div key={h.label} className="ll-card p-4">
            <div className="flex items-center gap-2 mb-1.5" style={{ color: "#2D5282" }}>
              <h.icon size={15} />
              <span className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: "#94A3B8" }}>{h.label}</span>
            </div>
            <p className="text-sm font-bold text-navy m-0">{h.value}</p>
          </div>
        ))}
      </div>

      {/* Top risks */}
      {summary.topRisks.length > 0 && (
        <div className="ll-card p-6 mt-4" id="top-risks-section">
          <h3 className="text-xs font-bold tracking-widest uppercase mb-4 mt-0" style={{ color: "#64748B" }}>
            Top Risks
          </h3>
          <ol className="m-0 p-0 list-none flex flex-col gap-3">
            {summary.topRisks.map((risk, i) => (
              <li key={risk} className="flex items-center gap-3">
                <span
                  className="flex items-center justify-center text-xs font-bold rounded-full shrink-0"
                  style={{ width: 24, height: 24, background: "#FEF2F2", color: "#DC2626", border: "1px solid #FECACA" }}
                >
                  {i + 1}
                </span>
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: "#DC2626" }} aria-hidden="true"></span>
                <span className="text-sm font-semibold text-navy">{risk}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </section>
  );
};
