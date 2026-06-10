// ═══════════════════════════════════════════
// LegalLens — App Root: State & Flow
// ═══════════════════════════════════════════

function App() {
  const [screen, setScreen] = React.useState("landing");      // landing | loading | analysis
  const [docName, setDocName] = React.useState("");
  const [docText, setDocText] = React.useState("");
  const [clauses, setClauses] = React.useState([]);
  const [summary, setSummary] = React.useState(null);
  const [score, setScore] = React.useState(0);
  const [riskInfo, setRiskInfo] = React.useState(null);
  const [activeTab, setActiveTab] = React.useState("clauses");
  const [summaryLang, setSummaryLang] = React.useState("english");
  const [error, setError] = React.useState("");

  // Core analysis pipeline: loading screen for 2.5s, then results
  const runAnalysis = (text, name) => {
    setError("");
    setScreen("loading");
    const startedAt = Date.now();

    // Run detection while the loading animation plays
    const detected = window.detectClauses(text);
    const sum = window.generateSummary(text, detected);
    const risk = window.calculateRiskScore(detected);

    const elapsed = Date.now() - startedAt;
    const wait = Math.max(0, 2500 - elapsed);
    setTimeout(() => {
      setDocText(text);
      setDocName(name);
      setClauses(detected);
      setSummary(sum);
      setScore(risk.score);
      setRiskInfo(risk);
      setActiveTab("clauses");
      setSummaryLang("english");
      setScreen("analysis");
      window.scrollTo(0, 0);
    }, wait);
  };

  const handleFileSelected = async (file) => {
    setError("");
    try {
      setScreen("loading");
      const text = await window.parseFile(file);
      // parseFile may finish fast; runAnalysis manages min loading time
      const startedAt = Date.now();
      const detected = window.detectClauses(text);
      const sum = window.generateSummary(text, detected);
      const risk = window.calculateRiskScore(detected);
      const wait = Math.max(0, 2500 - (Date.now() - startedAt));
      setTimeout(() => {
        setDocText(text);
        setDocName(file.name);
        setClauses(detected);
        setSummary(sum);
        setScore(risk.score);
        setRiskInfo(risk);
        setActiveTab("clauses");
        setSummaryLang("english");
        setScreen("analysis");
        window.scrollTo(0, 0);
      }, wait);
    } catch (err) {
      setScreen("landing");
      setError(err.message || "Could not read this file. Please try PDF or TXT format.");
    }
  };

  const handleTryDemo = () => {
    runAnalysis(window.sampleDocText, window.sampleDocName);
  };

  const handleReset = () => {
    setScreen("landing");
    setError("");
    window.scrollTo(0, 0);
  };

  const handleReanalyze = () => {
    runAnalysis(docText, docName);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <window.Header screen={screen} onReset={handleReset} />

      <div className="flex-1">
        {screen === "landing" && (
          <window.LandingScreen
            onFileSelected={handleFileSelected}
            onTryDemo={handleTryDemo}
            error={error}
          />
        )}

        {screen === "loading" && <window.LoadingOverlay />}

        {screen === "analysis" && riskInfo && (
          <window.AnalysisScreen
            docName={docName}
            docText={docText}
            clauses={clauses}
            summary={summary}
            score={score}
            riskInfo={riskInfo}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            summaryLang={summaryLang}
            setSummaryLang={setSummaryLang}
            onReanalyze={handleReanalyze}
          />
        )}
      </div>

      {/* Disclaimer footer — every page */}
      <footer
        id="disclaimer-footer"
        className="text-center px-4 py-4 mt-8"
        style={{ background: "#0F2342" }}
      >
        <p className="text-xs m-0" style={{ color: "#94A8C4" }}>
          ⚠️ LegalLens is an AI tool for awareness only. Always consult a qualified lawyer before signing. Not legal advice.
        </p>
      </footer>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
