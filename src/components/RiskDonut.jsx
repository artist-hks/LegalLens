// ═══════════════════════════════════════════
// LegalLens — Risk Breakdown Donut (pure SVG)
// ═══════════════════════════════════════════

window.RiskDonut = function RiskDonut({ counts }) {
  const total = counts.high + counts.medium + counts.info;
  const R = 54;
  const C = 2 * Math.PI * R; // circumference
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const t = setTimeout(() => setMounted(true), 150);
    return () => clearTimeout(t);
  }, []);

  const segments = [
    { key: "high", count: counts.high, color: "#DC2626", label: "High" },
    { key: "medium", count: counts.medium, color: "#D97706", label: "Medium" },
    { key: "info", count: counts.info, color: "#059669", label: "Info" }
  ].filter((s) => s.count > 0);

  // Build cumulative offsets
  let acc = 0;
  const rendered = segments.map((s) => {
    const frac = total > 0 ? s.count / total : 0;
    const seg = { ...s, dash: frac * C, offset: -acc * C };
    acc += frac;
    return seg;
  });

  return (
    <div className="ll-card p-5 anim-fade-up" id="risk-donut-card">
      <h3 className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#64748B" }}>
        Risk Breakdown
      </h3>

      <div className="relative flex justify-center">
        <svg viewBox="0 0 140 140" className="w-[150px]" role="img" aria-label={`${total} issues detected`}>
          <circle cx="70" cy="70" r={R} fill="none" stroke="#F1F5F9" strokeWidth="16" />
          {rendered.map((s) => (
            <circle
              key={s.key}
              cx="70" cy="70" r={R}
              fill="none"
              stroke={s.color}
              strokeWidth="16"
              strokeDasharray={`${mounted ? s.dash : 0} ${C}`}
              strokeDashoffset={s.offset}
              transform="rotate(-90 70 70)"
              className="donut-seg"
              strokeLinecap="butt"
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-bold text-navy leading-none">{total}</span>
          <span className="text-[11px] font-medium" style={{ color: "#64748B" }}>Issues</span>
        </div>
      </div>

      {/* Legend */}
      <p className="text-center text-[13px] font-medium mt-3 m-0" style={{ color: "#475569" }}>
        <span style={{ color: "#DC2626" }}>● {counts.high} High</span>
        {" · "}
        <span style={{ color: "#D97706" }}>● {counts.medium} Medium</span>
        {" · "}
        <span style={{ color: "#059669" }}>● {counts.info} Info</span>
      </p>
    </div>
  );
};
