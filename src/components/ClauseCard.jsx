// ═══════════════════════════════════════════
// LegalLens — Clause Card (expandable)
// ═══════════════════════════════════════════

const SEVERITY_STYLES = {
  high:   { border: "#DC2626", bg: "#FEF2F2", text: "#DC2626", label: "HIGH" },
  medium: { border: "#D97706", bg: "#FFFBEB", text: "#D97706", label: "MEDIUM" },
  info:   { border: "#059669", bg: "#ECFDF5", text: "#059669", label: "INFO" }
};

window.ClauseCard = function ClauseCard({ clause }) {
  const { ChevronDown, ChevronUp, AlertTriangle, AlertCircle, CheckCircle } = window.LLIcons;
  const [expanded, setExpanded] = React.useState(false);
  const sev = SEVERITY_STYLES[clause.severity];
  const isInfo = clause.severity === "info";
  const SevIcon = clause.severity === "high" ? AlertTriangle : clause.severity === "medium" ? AlertCircle : CheckCircle;

  return (
    <article
      className="ll-card overflow-hidden"
      style={{
        borderLeft: `4px solid ${sev.border}`,
        opacity: isInfo ? 0.92 : 1
      }}
    >
      <div className="p-4 sm:p-5">
        {/* Header row */}
        <header className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <SevIcon size={17} style={{ color: sev.text }} className="shrink-0" />
            <h4 className="font-bold text-[15px] text-navy m-0 truncate">{clause.name}</h4>
          </div>
          <span
            className="text-[10px] font-bold px-2.5 py-1 rounded-lg tracking-wider shrink-0"
            style={{ color: sev.text, background: sev.bg, border: `1px solid ${sev.border}33` }}
          >
            {sev.label}
          </span>
        </header>

        {/* Snippet */}
        <div className="mt-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide mb-1.5 m-0" style={{ color: "#94A3B8" }}>
            Found in document:
          </p>
          <blockquote
            className="mono-snippet m-0 px-3.5 py-3 rounded-lg"
            style={{ background: sev.bg, color: "#475569", border: `1px solid ${sev.border}22` }}
          >
            {window.highlightKeyword(clause.snippetText, clause.matchedKeyword, sev.text)}
          </blockquote>
        </div>

        {/* Expandable explanation */}
        <div
          className="expandable"
          style={{ maxHeight: expanded ? "400px" : "0px", opacity: expanded ? 1 : 0 }}
          aria-hidden={!expanded}
        >
          <div className="pt-4">
            <p className="text-[12px] font-bold uppercase tracking-wide m-0 mb-1" style={{ color: sev.text }}>
              What this means:
            </p>
            <p className="text-sm m-0 leading-relaxed" style={{ color: "#334155" }}>
              {clause.explanation}
            </p>
            <p className="text-[12px] font-bold uppercase tracking-wide m-0 mt-3 mb-1" style={{ color: "#0F2342" }}>
              What to do:
            </p>
            <p className="text-sm font-semibold m-0 leading-relaxed" style={{ color: "#0F172A" }}>
              {clause.recommendation}
            </p>
            <div className="mt-3 px-3 py-2.5 rounded-lg" style={{ background: "#F8FAFC", border: "1px solid #E2E8F0" }}>
              <p className="text-[13px] m-0 leading-relaxed" style={{ color: "#475569" }} lang="hi">
                <span className="font-semibold">हिंदी:</span> {clause.hindiExplanation} <strong>{clause.hindiRecommendation}</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-[13px] font-semibold mt-3 hover:underline"
          style={{ color: "#2D5282" }}
          aria-expanded={expanded}
        >
          {expanded ? <>Hide <ChevronUp size={14} /></> : <>See explanation <ChevronDown size={14} /></>}
        </button>
      </div>
    </article>
  );
};

// Highlight the matched keyword inside the snippet
window.highlightKeyword = function highlightKeyword(snippet, keyword, color) {
  const idx = snippet.toLowerCase().indexOf(keyword.toLowerCase());
  if (idx === -1) return snippet;
  return (
    <React.Fragment>
      {snippet.slice(0, idx)}
      <strong style={{ color, fontWeight: 700 }}>{snippet.slice(idx, idx + keyword.length)}</strong>
      {snippet.slice(idx + keyword.length)}
    </React.Fragment>
  );
};
