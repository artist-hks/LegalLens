// ═══════════════════════════════════════════
// LegalLens — Header
// ═══════════════════════════════════════════

window.Header = function Header({ screen, onReset }) {
  const { Scale, Plus } = window.LLIcons;
  return (
    <header
      id="app-header"
      className="sticky top-0 z-40 flex items-center justify-between px-4 sm:px-6"
      style={{
        height: "64px",
        background: "linear-gradient(90deg, #0F2342 0%, #1E3A5F 100%)",
        boxShadow: "0 2px 8px rgba(15,35,66,0.25)"
      }}
    >
      <button
        className="flex items-center gap-2.5 focus:outline-none"
        onClick={onReset}
        aria-label="LegalLens home"
      >
        <Scale size={26} className="text-amber-400" strokeWidth={2.2} />
        <span className="font-display text-white" style={{ fontSize: "26px", fontWeight: 700, letterSpacing: "0.3px" }}>
          LegalLens
        </span>
        <span
          className="text-[10px] font-bold px-2 py-0.5 rounded-full"
          style={{ background: "#F59E0B", color: "#0F2342", letterSpacing: "0.5px" }}
        >
          AI
        </span>
      </button>

      <p className="hidden md:block text-sm" style={{ color: "#94A8C4" }}>
        For Indian SMEs · Hindi &amp; English
      </p>

      <div>
        {screen === "analysis" ? (
          <button
            id="new-doc-btn"
            onClick={onReset}
            className="flex items-center gap-1.5 text-sm font-semibold text-white border border-white/40 rounded-lg px-3 py-1.5 hover:bg-white/10"
          >
            <Plus size={15} />
            <span className="hidden sm:inline">Analyze New Document</span>
            <span className="sm:hidden">New</span>
          </button>
        ) : (
          <span className="text-xs hidden sm:block" style={{ color: "#94A8C4" }}>Free · No Signup</span>
        )}
      </div>
    </header>
  );
};
