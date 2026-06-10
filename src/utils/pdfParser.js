// ═══════════════════════════════════════════
// LegalLens — File Parsers (PDF / DOCX / TXT)
// ═══════════════════════════════════════════

// Set the PDF.js worker from CDN (critical — must be set before getDocument)
if (window.pdfjsLib) {
  window.pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
}

window.parsePDF = async function parsePDF(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const pages = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map(item => item.str).join(" ");
    pages.push(pageText);
  }
  return pages.join("\n");
};

window.parseDOCX = async function parseDOCX(file) {
  const arrayBuffer = await file.arrayBuffer();
  const result = await window.mammoth.extractRawText({ arrayBuffer });
  return result.value;
};

window.parseTXT = function parseTXT(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Could not read this file. Please try PDF or TXT format."));
    reader.readAsText(file);
  });
};

window.parseFile = async function parseFile(file) {
  const name = (file.name || "").toLowerCase();
  if (file.size > 10 * 1024 * 1024) {
    throw new Error("File is larger than 10MB. Please upload a smaller document.");
  }
  let text;
  try {
    if (name.endsWith(".pdf")) {
      text = await window.parsePDF(file);
    } else if (name.endsWith(".docx")) {
      text = await window.parseDOCX(file);
    } else if (name.endsWith(".txt")) {
      text = await window.parseTXT(file);
    } else {
      throw new Error("Unsupported format. Please upload a PDF, DOCX, or TXT file.");
    }
  } catch (err) {
    if (err.message && (err.message.startsWith("Unsupported") || err.message.includes("10MB"))) throw err;
    throw new Error("Could not read this file. Please try PDF or TXT format.");
  }
  if (!text || text.trim().length < 20) {
    throw new Error("Document appears to be empty. Try a different file.");
  }
  return text;
};
