// ═══════════════════════════════════════════
// LegalLens — Clause List
// ═══════════════════════════════════════════

window.ClauseList = function ClauseList({ clauses }) {
  const { CheckCircle } = window.LLIcons;
  const order = { high: 0, medium: 1, info: 2 };
  const sorted = [...clauses].sort((a, b) => order[a.severity] - order[b.severity]);
  const highCount = clauses.filter((c) => c.severity === "high").length;

  if (clauses.length === 0) {
    return (
      <div className="ll-card p-10 text-center anim-fade-up" id="no-risks-state">
        <div className="flex justify-center mb-4" style={{ color: "#059669" }}>
          <CheckCircle size={56} strokeWidth={1.5} />
        </div>
        <h3 className="text-lg font-bold m-0" style={{ color: "#059669" }}>No major risks detected</h3>
        <p className="text-sm mt-2 m-0" style={{ color: "#64748B" }}>
          Our engine didn't flag any known risky clauses. Still, always have a lawyer review before signing.
        </p>
      </div>
    );
  }

  return (
    <section id="clause-list" aria-label="Detected clauses">
      <p className="text-sm font-medium mb-4" style={{ color: "#64748B" }}>
        <strong className="text-navy">{clauses.length} clauses detected</strong>
        {highCount > 0 && (
          <span> · <strong style={{ color: "#DC2626" }}>{highCount} require immediate attention</strong></span>
        )}
      </p>
      <div className="flex flex-col gap-4 stagger">
        {sorted.map((clause) => (
          <window.ClauseCard key={clause.ruleId} clause={clause} />
        ))}
      </div>
    </section>
  );
};
