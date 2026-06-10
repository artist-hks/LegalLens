// ═══════════════════════════════════════════
// LegalLens — Analysis Sidebar
// ═══════════════════════════════════════════

window.Sidebar = function Sidebar({ docName, score, riskInfo, summary, onReanalyze }) {
  const { FileText, RefreshCw, Users, IndianRupee, MapPin } = window.LLIcons;
  const analyzedDate = new Date().toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric"
  });

  return (
    <aside id="analysis-sidebar" className="analysis-sidebar flex flex-col gap-4 stagger">

      {/* Card 1 — Document info */}
      <div className="ll-card p-5" id="doc-info-card">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center rounded-lg shrink-0" style={{ width: 40, height: 40, background: "#EFF4FB", color: "#0F2342" }}>
            <FileText size={20} />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-navy truncate m-0" title={docName}>{docName}</p>
            <p className="text-xs mt-0.5 m-0" style={{ color: "#64748B" }}>Analyzed on {analyzedDate}</p>
          </div>
        </div>
        <button
          onClick={onReanalyze}
          className="btn-outline flex items-center gap-1.5 text-xs px-3 py-1.5 mt-3.5"
        >
          <RefreshCw size={13} />
          Re-analyze
        </button>
      </div>

      {/* Card 2 — Risk gauge */}
      <window.RiskGauge score={score} riskInfo={riskInfo} />

      {/* Card 3 — Donut */}
      <window.RiskDonut counts={riskInfo.counts} />

      {/* Card 4 — Quick stats */}
      <div className="ll-card p-5" id="quick-stats-card">
        <h3 className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#64748B" }}>
          Quick Stats
        </h3>
        <dl className="grid gap-3.5 m-0">
          <div className="flex items-start gap-2.5">
            <Users size={16} className="mt-0.5 shrink-0" style={{ color: "#2D5282" }} />
            <div>
              <dt className="text-[11px] font-medium uppercase tracking-wide" style={{ color: "#94A3B8" }}>Parties</dt>
              <dd className="text-[13px] font-semibold text-navy m-0">{summary.parties.join(" & ")}</dd>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <IndianRupee size={16} className="mt-0.5 shrink-0" style={{ color: "#2D5282" }} />
            <div>
              <dt className="text-[11px] font-medium uppercase tracking-wide" style={{ color: "#94A3B8" }}>Value</dt>
              <dd className="text-[13px] font-semibold text-navy m-0">{summary.amount}</dd>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <MapPin size={16} className="mt-0.5 shrink-0" style={{ color: "#2D5282" }} />
            <div>
              <dt className="text-[11px] font-medium uppercase tracking-wide" style={{ color: "#94A3B8" }}>Jurisdiction</dt>
              <dd className="text-[13px] font-semibold text-navy m-0">{summary.jurisdiction}</dd>
            </div>
          </div>
        </dl>
      </div>
    </aside>
  );
};
