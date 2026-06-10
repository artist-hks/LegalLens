// ═══════════════════════════════════════════
// LegalLens — Upload Zone (drag & drop)
// ═══════════════════════════════════════════

window.UploadZone = function UploadZone({ onFileSelected, onTryDemo, error }) {
  const { Upload, FileText, AlertCircle } = window.LLIcons;
  const [dragOver, setDragOver] = React.useState(false);
  const inputRef = React.useRef(null);

  const handleFiles = (files) => {
    if (files && files.length > 0) onFileSelected(files[0]);
  };

  return (
    <div id="upload-section" className="w-full max-w-2xl mx-auto">
      <div
        className={`upload-zone bg-white flex flex-col items-center justify-center text-center cursor-pointer px-6 ${dragOver ? "dragover" : ""}`}
        style={{ height: "320px" }}
        role="button"
        tabIndex={0}
        aria-label="Upload legal document"
        onClick={() => inputRef.current && inputRef.current.click()}
        onKeyDown={(e) => { if (e.key === "Enter") inputRef.current.click(); }}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFiles(e.dataTransfer.files);
        }}
      >
        <div
          className="flex items-center justify-center rounded-full mb-4"
          style={{ width: 84, height: 84, background: "#EFF4FB" }}
        >
          <Upload size={48} className="text-navy" strokeWidth={1.7} />
        </div>
        <p className="text-lg font-semibold text-navy">Drop your legal document here</p>
        <p className="text-sm mt-1" style={{ color: "#64748B" }}>
          PDF, DOCX, or TXT · Max 10MB
        </p>
        <p className="text-xs mt-3 px-3 py-1 rounded-full" style={{ background: "#F1F5F9", color: "#64748B" }}>
          or click to browse files
        </p>
        <input
          ref={inputRef}
          id="file-input"
          type="file"
          accept=".pdf,.docx,.txt"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {error && (
        <div
          className="anim-fade-in flex items-center gap-2 mt-4 px-4 py-3 rounded-lg text-sm font-medium"
          style={{ background: "#FEF2F2", color: "#DC2626", border: "1px solid #FECACA" }}
          role="alert"
        >
          <AlertCircle size={17} />
          {error}
        </div>
      )}

      {/* OR divider */}
      <div className="flex items-center gap-4 my-6" aria-hidden="true">
        <div className="flex-1 h-px" style={{ background: "#E2E8F0" }}></div>
        <span className="text-xs font-semibold tracking-widest" style={{ color: "#94A3B8" }}>OR</span>
        <div className="flex-1 h-px" style={{ background: "#E2E8F0" }}></div>
      </div>

      <button
        id="demo-btn"
        onClick={onTryDemo}
        className="btn-navy w-full flex items-center justify-center gap-2 py-3.5 text-[15px]"
      >
        <FileText size={18} />
        Try with Demo Agreement →
      </button>
    </div>
  );
};
