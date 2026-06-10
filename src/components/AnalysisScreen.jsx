// ═══════════════════════════════════════════
// LegalLens — Analysis Screen (2-col layout + tabs)
// ═══════════════════════════════════════════

window.AnalysisScreen = function AnalysisScreen({
  docName, docText, clauses, summary, score, riskInfo,
  activeTab, setActiveTab, summaryLang, setSummaryLang, onReanalyze
}) {
  const { Download } = window.LLIcons;
  const [exporting, setExporting] = React.useState(false);

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => {
      try {
        window.exportPDFReport({ docName, score, riskInfo, clauses, summary });
      } finally {
        setExporting(false);
      }
    }, 50);
  };

  const tabs = [
    { id: "clauses", label: "Clause Analysis", badge: clauses.length },
    { id: "summary", label: "Plain Summary" },
    { id: "fulltext", label: "Full Text" }
  ];

  return (
    <main id="analysis-screen" className="max-w-7xl mx-auto px-4 sm:px-6 py-6 anim-fade-in">
      <div
        className="analysis-grid grid gap-5"
        style={{ gridTemplateColumns: "minmax(280px, 30%) 1fr" }}
      >
        {/* Sidebar */}
        <window.Sidebar
          docName={docName}
          score={score}
          riskInfo={riskInfo}
          summary={summary}
          onReanalyze={onReanalyze}
        />

        {/* Main content */}
        <section id="analysis-main" className="min-w-0">
          {/* Tab bar + export */}
          <div className="ll-card mb-5 flex items-center justify-between flex-wrap" style={{ borderRadius: "12px 12px 12px 12px" }}>
            <nav className="flex flex-wrap" role="tablist" aria-label="Analysis sections">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={activeTab === t.id}
                  className={`tab-btn ${activeTab === t.id ? "active" : ""}`}
                  onClick={() => setActiveTab(t.id)}
                >
                  {t.label}
                  {t.badge !== undefined && (
                    <span
                      className="ml-1.5 text-[11px] font-bold px-1.5 py-0.5 rounded-full"
                      style={{ background: activeTab === t.id ? "#0F2342" : "#E2E8F0", color: activeTab === t.id ? "#fff" : "#64748B" }}
                    >
                      {t.badge}
                    </span>
                  )}
                </button>
              ))}
            </nav>
            <div className="px-3 py-2">
              <button
                id="export-btn"
                onClick={handleExport}
                disabled={exporting}
                className="btn-navy flex items-center gap-2 text-[13px] px-4 py-2"
              >
                <Download size={15} />
                {exporting ? "Generating…" : "Export PDF Report"}
              </button>
            </div>
          </div>

          {/* Tab panels */}
          {activeTab === "clauses" && <window.ClauseList clauses={clauses} />}
          {activeTab === "summary" && (
            <window.SummaryPanel summary={summary} summaryLang={summaryLang} setSummaryLang={setSummaryLang} />
          )}
          {activeTab === "fulltext" && <window.FullTextPanel docText={docText} clauses={clauses} />}
        </section>
      </div>
    </main>
  );
};
