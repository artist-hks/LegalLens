// ═══════════════════════════════════════════
// LegalLens — Custom SVG Semicircle Risk Gauge
// ═══════════════════════════════════════════

window.RiskGauge = function RiskGauge({ score, riskInfo }) {
  const R = 80;                       // arc radius
  const CX = 100, CY = 100;           // center bottom
  const halfCirc = Math.PI * R;       // semicircle length ≈ 251.33
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const pct = Math.max(0, Math.min(100, score)) / 100;
  const dashOffset = mounted ? halfCirc * (1 - pct) : halfCirc;
  const needleAngle = mounted ? -90 + pct * 180 : -90;

  const arcPath = `M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`;

  return (
    <div className="ll-card p-5 anim-fade-up" id="risk-gauge-card">
      <h3 className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#64748B" }}>
        Overall Risk Score
      </h3>

      <div className="relative flex justify-center">
        <svg viewBox="0 0 200 110" className="w-full max-w-[260px]" role="img" aria-label={`Risk score ${score} out of 100`}>
          {/* Background arc */}
          <path d={arcPath} fill="none" stroke="#E2E8F0" strokeWidth="14" strokeLinecap="round" />
          {/* Colored arc */}
          <path
            d={arcPath}
            fill="none"
            stroke={riskInfo.color}
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray={halfCirc}
            strokeDashoffset={dashOffset}
            className="gauge-arc"
          />
          {/* Needle */}
          <g className="gauge-needle" style={{ transform: `rotate(${needleAngle}deg)` }}>
            <line x1={CX} y1={CY} x2={CX} y2={CY - R + 22} stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
            <circle cx={CX} cy={CY} r="6" fill="#0F2342" />
            <circle cx={CX} cy={CY} r="2.5" fill="#F59E0B" />
          </g>
        </svg>

        {/* Score number */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-baseline gap-1" style={{ transform: "translate(-50%, 0)" }}>
          <span className="font-bold" style={{ fontSize: "48px", lineHeight: 1, color: riskInfo.color }}>{score}</span>
          <span className="text-xs font-medium" style={{ color: "#64748B" }}>/ 100</span>
        </div>
      </div>

      {/* Risk badge */}
      <div className="flex justify-center mt-3">
        <span
          className="text-xs font-bold px-3 py-1.5 rounded-lg tracking-wide"
          style={{ color: riskInfo.color, background: riskInfo.labelBg, border: `1px solid ${riskInfo.color}33` }}
        >
          {riskInfo.label}
        </span>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between mt-4 gap-1.5">
        {[
          { label: "LOW", color: "#059669" },
          { label: "MEDIUM", color: "#D97706" },
          { label: "HIGH", color: "#DC2626" }
        ].map((seg) => (
          <div key={seg.label} className="flex-1 text-center">
            <div className="h-1.5 rounded-full mb-1" style={{ background: seg.color, opacity: riskInfo.label.startsWith(seg.label) ? 1 : 0.25 }}></div>
            <span className="text-[10px] font-semibold" style={{ color: "#64748B" }}>{seg.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
