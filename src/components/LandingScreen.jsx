// ═══════════════════════════════════════════
// LegalLens — Landing Screen
// ═══════════════════════════════════════════

window.LandingScreen = function LandingScreen({ onFileSelected, onTryDemo, error }) {
  return (
    <main id="landing-screen" className="legal-texture min-h-[calc(100vh-64px)] py-10 sm:py-16 px-4">
      <div className="max-w-4xl mx-auto stagger">

        {/* Hero */}
        <section id="hero-section" className="text-center mb-10">
          <h1
            className="font-display text-navy leading-tight"
            style={{ fontSize: "clamp(30px, 5vw, 42px)", fontWeight: 700 }}
          >
            Understand your contracts<br className="hidden sm:block" /> before you sign.
          </h1>
          <p className="mt-4 text-base sm:text-lg" style={{ color: "#64748B" }}>
            AI-powered risk detection for Indian legal documents. Free, instant, no signup.
          </p>

          {/* Feature pills */}
          <ul className="flex flex-wrap items-center justify-center gap-2.5 mt-6 list-none p-0">
            {[
              "🔴 Risk Clause Detection",
              "📝 Plain Hindi + English Summary",
              "📊 Risk Score"
            ].map((pill) => (
              <li
                key={pill}
                className="text-[13px] font-medium px-4 py-2 rounded-full bg-white"
                style={{ border: "1px solid #E2E8F0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", color: "#1E3A5F" }}
              >
                {pill}
              </li>
            ))}
          </ul>
        </section>

        {/* Upload zone */}
        <section aria-label="Upload document">
          <window.UploadZone onFileSelected={onFileSelected} onTryDemo={onTryDemo} error={error} />
        </section>

        {/* Stat boxes */}
        <section id="stats-section" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 max-w-2xl mx-auto">
          {[
            { big: "63M+", small: "SMEs in India" },
            { big: "₹5K–50K", small: "Saved Per Review" },
            { big: "🇮🇳", small: "Indian Law Focused" }
          ].map((s) => (
            <div key={s.small} className="ll-card text-center py-5 px-4">
              <p className="text-2xl font-bold text-navy m-0">{s.big}</p>
              <p className="text-xs mt-1 m-0" style={{ color: "#64748B" }}>{s.small}</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
};
