// ═══════════════════════════════════════════
// LegalLens — Loading Overlay
// ═══════════════════════════════════════════

window.LoadingOverlay = function LoadingOverlay() {
  const { Scale } = window.LLIcons;
  const messages = [
    "Extracting document text...",
    "Scanning for risk clauses...",
    "Generating plain language summary...",
    "Calculating risk score..."
  ];
  const [msgIndex, setMsgIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((i) => Math.min(i + 1, messages.length - 1));
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="loading-overlay"
      className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center anim-fade-in"
      role="status"
      aria-live="polite"
    >
      <div className="spin-icon mb-6" style={{ color: "#0F2342" }}>
        <Scale size={56} strokeWidth={1.6} />
      </div>
      <h2 className="text-xl font-bold text-navy mb-6">Analyzing Document...</h2>

      {/* Progress bar */}
      <div className="w-72 h-2 rounded-full overflow-hidden mb-5" style={{ background: "#E2E8F0" }}>
        <div className="progress-fill h-full rounded-full" style={{ background: "linear-gradient(90deg, #0F2342, #2D5282)" }}></div>
      </div>

      {/* Cycling messages */}
      <p key={msgIndex} className="msg-fade text-sm font-medium" style={{ color: "#64748B", minHeight: "20px" }}>
        {messages[msgIndex]}
      </p>
    </div>
  );
};
