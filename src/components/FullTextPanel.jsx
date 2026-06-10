// ═══════════════════════════════════════════
// LegalLens — Full Text Panel (with highlights)
// ═══════════════════════════════════════════

window.FullTextPanel = function FullTextPanel({ docText, clauses }) {
  // Build highlight ranges from matched keywords (high → yellow, medium → orange)
  const segments = React.useMemo(() => {
    const lower = docText.toLowerCase();
    const ranges = [];

    clauses.forEach((c) => {
      if (c.severity === "info") return;
      const kw = c.matchedKeyword.toLowerCase();
      // Highlight the full sentence containing the match
      const idx = lower.indexOf(kw);
      if (idx === -1) return;
      // expand to sentence boundaries
      let start = docText.lastIndexOf(".", idx);
      start = start === -1 ? 0 : start + 1;
      let end = docText.indexOf(".", idx + kw.length);
      end = end === -1 ? docText.length : end + 1;
      ranges.push({ start, end, severity: c.severity });
    });

    // Sort & merge overlapping (high wins over medium)
    ranges.sort((a, b) => a.start - b.start);
    const merged = [];
    for (const r of ranges) {
      const last = merged[merged.length - 1];
      if (last && r.start < last.end) {
        last.end = Math.max(last.end, r.end);
        if (r.severity === "high") last.severity = "high";
      } else {
        merged.push({ ...r });
      }
    }

    // Build segments
    const segs = [];
    let pos = 0;
    for (const r of merged) {
      if (r.start > pos) segs.push({ text: docText.slice(pos, r.start), severity: null });
      segs.push({ text: docText.slice(r.start, r.end), severity: r.severity });
      pos = r.end;
    }
    if (pos < docText.length) segs.push({ text: docText.slice(pos), severity: null });
    return segs;
  }, [docText, clauses]);

  const charCount = docText.length;
  const wordCount = docText.trim().split(/\s+/).filter(Boolean).length;

  return (
    <section id="fulltext-panel" className="ll-card overflow-hidden anim-fade-up" aria-label="Full document text">
      {/* Legend */}
      <div className="flex items-center gap-4 px-5 py-3" style={{ borderBottom: "1px solid #E2E8F0" }}>
        <span className="text-xs font-semibold" style={{ color: "#64748B" }}>Highlights:</span>
        <span className="text-xs flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm inline-block" style={{ background: "#FEF08A" }}></span> High risk
        </span>
        <span className="text-xs flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm inline-block" style={{ background: "#FED7AA" }}></span> Medium risk
        </span>
      </div>

      <pre
        className="mono-snippet m-0 px-5 py-4 overflow-y-auto whitespace-pre-wrap"
        style={{ background: "#F8FAFC", maxHeight: "500px", fontSize: "13px", color: "#334155" }}
      >
        {segments.map((seg, i) =>
          seg.severity ? (
            <mark key={i} className={seg.severity === "high" ? "hl-high" : "hl-medium"}>{seg.text}</mark>
          ) : (
            <React.Fragment key={i}>{seg.text}</React.Fragment>
          )
        )}
      </pre>

      <footer className="px-5 py-2.5 text-xs font-medium" style={{ borderTop: "1px solid #E2E8F0", color: "#94A3B8" }}>
        Characters: {charCount.toLocaleString("en-IN")} · Words: {wordCount.toLocaleString("en-IN")}
      </footer>
    </section>
  );
};
