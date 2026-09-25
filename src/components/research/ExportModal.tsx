import React from 'react';
import { ResearchAnswer } from '../../types';
import { Download, Copy, Check, X, FileText, FileCode, Printer, Shield, Eye } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  answerData: ResearchAnswer;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  answerData,
}) => {
  const [format, setFormat] = React.useState<'markdown' | 'text' | 'pdf'>('markdown');
  const [includeCitations, setIncludeCitations] = React.useState(true);
  const [includeMetadata, setIncludeMetadata] = React.useState(true);
  const [analystName, setAnalystName] = React.useState('Senior Intelligence Analyst');
  const [classification, setClassification] = React.useState('INTERNAL RESEARCH BRIEFING');
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const generateMarkdownReport = () => {
    let output = `# ${answerData.question}\n\n`;
    if (includeMetadata) {
      output += `> **Classification:** ${classification}\n`;
      output += `> **Generated:** ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}\n`;
      output += `> **Prepared by:** ${analystName}\n`;
      output += `> **System:** NewsIntel Enterprise RAG Engine v2.4\n\n`;
      output += `---\n\n`;
    }

    output += `## Executive Answer\n\n`;
    answerData.paragraphs.forEach((p) => {
      output += `${p}\n\n`;
    });

    if (includeCitations) {
      output += `## Verified Evidence & Citations\n\n`;
      Object.values(answerData.citations).forEach((cit) => {
        output += `### Citation [${cit.id}]: ${cit.documentTitle} (Page ${cit.pageNumber})\n`;
        output += `> "${cit.highlightSentence}"\n\n`;
        output += `*Full passage:* "${cit.excerptText}"\n\n`;
      });

      output += `## Primary Document Sources\n\n`;
      answerData.sources.forEach((src) => {
        output += `- **[${src.citationId}] ${src.name}** (${src.details})\n`;
      });
      output += `\n`;
    }

    if (answerData.relatedQuestions && answerData.relatedQuestions.length > 0) {
      output += `## Follow-up Research Directions\n\n`;
      answerData.relatedQuestions.forEach((q) => {
        output += `- ${q}\n`;
      });
    }

    return output;
  };

  const handleCopy = () => {
    const content = generateMarkdownReport();
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const content = generateMarkdownReport();
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const filename = `NewsIntel_Research_${answerData.question.slice(0, 30).replace(/[^a-zA-Z0-9]/g, '_')}.md`;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrintPDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const mdContent = generateMarkdownReport();
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>NewsIntel Intelligence Briefing - ${answerData.question}</title>
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; padding: 40px; color: #1e293b; }
            .header { border-bottom: 2px solid #2563eb; padding-bottom: 12px; margin-bottom: 24px; }
            .badge { display: inline-block; background: #eff6ff; color: #1e40af; border: 1px solid #bfdbfe; font-size: 11px; font-weight: bold; padding: 3px 8px; border-radius: 4px; text-transform: uppercase; margin-bottom: 8px; }
            h1 { font-size: 22px; color: #0f172a; margin-top: 0; }
            h2 { font-size: 15px; color: #1e293b; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-top: 24px; }
            blockquote { background: #f8fafc; border-left: 4px solid #2563eb; margin: 0; padding: 12px 16px; font-style: italic; color: #334155; }
            .meta { font-size: 12px; color: #64748b; margin-bottom: 20px; }
            .source-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 10px; margin-bottom: 8px; font-size: 13px; }
            @media print {
              body { padding: 0; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <span class="badge">${classification}</span>
            <h1>${answerData.question}</h1>
            <div class="meta">
              <strong>Prepared by:</strong> ${analystName} | 
              <strong>Generated:</strong> ${new Date().toLocaleDateString()} | 
              <strong>Source Engine:</strong> NewsIntel RAG Engine
            </div>
          </div>
          <h2>Executive Briefing Summary</h2>
          ${answerData.paragraphs.map(p => `<p>${p}</p>`).join('')}
          
          ${includeCitations ? `
            <h2>Verified Source Evidence</h2>
            ${Object.values(answerData.citations).map(c => `
              <div style="margin-bottom: 16px;">
                <strong>[Citation ${c.id}] ${c.documentTitle} — Page ${c.pageNumber}</strong>
                <blockquote>"${c.highlightSentence}"</blockquote>
                <p style="font-size: 12px; color: #64748b; margin-top: 4px;">Full Excerpt: "${c.excerptText}"</p>
              </div>
            `).join('')}
          ` : ''}
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-panel border border-border rounded-lg shadow-card w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between bg-canvas">
          <div className="flex items-center gap-2.5">
            <Download className="w-5 h-5 text-navy-800" />
            <div>
              <h3 className="font-bold text-sm text-ink-900">Export Research Report</h3>
              <p className="text-xs text-ink-500">Generate executive briefing or markdown report</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-ink-400 hover:text-ink-900 hover:bg-canvas transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Format Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-ink-400 uppercase tracking-wider">
              Export Format
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setFormat('markdown')}
                className={`p-3 rounded border text-left flex flex-col gap-1 transition-all ${
                  format === 'markdown'
                    ? 'border-navy-800 bg-navy-800/10 text-ink-900'
                    : 'border-border bg-canvas text-ink-500 hover:border-ink-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <FileCode className="w-4 h-4 text-navy-800" />
                  {format === 'markdown' && <Check className="w-3.5 h-3.5 text-navy-800" />}
                </div>
                <span className="font-semibold text-xs text-ink-900">Markdown (.md)</span>
                <span className="text-[11px] text-ink-500">For Notion, Obsidian & GitHub</span>
              </button>

              <button
                type="button"
                onClick={() => setFormat('pdf')}
                className={`p-3 rounded border text-left flex flex-col gap-1 transition-all ${
                  format === 'pdf'
                    ? 'border-navy-800 bg-navy-800/10 text-ink-900'
                    : 'border-border bg-canvas text-ink-500 hover:border-ink-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Printer className="w-4 h-4 text-navy-800" />
                  {format === 'pdf' && <Check className="w-3.5 h-3.5 text-navy-800" />}
                </div>
                <span className="font-semibold text-xs text-ink-900">Printable PDF</span>
                <span className="text-[11px] text-ink-500">Formatted executive briefing</span>
              </button>

              <button
                type="button"
                onClick={() => setFormat('text')}
                className={`p-3 rounded border text-left flex flex-col gap-1 transition-all ${
                  format === 'text'
                    ? 'border-navy-800 bg-navy-800/10 text-ink-900'
                    : 'border-border bg-canvas text-ink-500 hover:border-ink-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <FileText className="w-4 h-4 text-navy-800" />
                  {format === 'text' && <Check className="w-3.5 h-3.5 text-navy-800" />}
                </div>
                <span className="font-semibold text-xs text-ink-900">Plain Text (.txt)</span>
                <span className="text-[11px] text-ink-500">Simple unformatted text</span>
              </button>
            </div>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded bg-canvas border border-border">
            <div className="space-y-3">
              <label className="text-xs font-semibold text-ink-400 uppercase tracking-wider block">
                Metadata Settings
              </label>

              <div className="space-y-1.5">
                <span className="text-xs text-ink-500">Classification Label</span>
                <select
                  value={classification}
                  onChange={(e) => setClassification(e.target.value)}
                  className="w-full bg-panel border border-border rounded px-2.5 py-1.5 text-xs text-ink-900 focus:outline-none focus:border-navy-800"
                >
                  <option value="INTERNAL RESEARCH BRIEFING">INTERNAL RESEARCH BRIEFING</option>
                  <option value="CONFIDENTIAL - NEWSROOM">CONFIDENTIAL - NEWSROOM</option>
                  <option value="RESTRICTED EDITORIAL">RESTRICTED EDITORIAL</option>
                  <option value="PUBLIC DISCLOSURE">PUBLIC DISCLOSURE</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <span className="text-xs text-ink-500">Analyst Signature</span>
                <input
                  type="text"
                  value={analystName}
                  onChange={(e) => setAnalystName(e.target.value)}
                  className="w-full bg-panel border border-border rounded px-2.5 py-1.5 text-xs text-ink-900 focus:outline-none focus:border-navy-800"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-semibold text-ink-400 uppercase tracking-wider block">
                Content Inclusion
              </label>

              <label className="flex items-center gap-2.5 text-xs text-ink-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeCitations}
                  onChange={(e) => setIncludeCitations(e.target.checked)}
                  className="rounded border-border text-navy-800 focus:ring-0 bg-panel"
                />
                <span>Include Evidence Quotes & Citation Markers</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs text-ink-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeMetadata}
                  onChange={(e) => setIncludeMetadata(e.target.checked)}
                  className="rounded border-border text-navy-800 focus:ring-0 bg-panel"
                />
                <span>Include System Stamp & Timestamp</span>
              </label>
            </div>
          </div>

          {/* Live Preview Box */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-ink-400 uppercase tracking-wider flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-navy-800" />
                Live Report Preview
              </span>
              <span className="text-[11px] font-mono text-ink-500">
                {generateMarkdownReport().length} characters
              </span>
            </div>
            <pre className="p-3 bg-canvas border border-border rounded text-xs text-ink-700 font-mono h-36 overflow-y-auto whitespace-pre-wrap select-text">
              {generateMarkdownReport()}
            </pre>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-border bg-canvas flex items-center justify-between">
          <button
            onClick={handleCopy}
            className="px-4 py-2 border border-border hover:bg-panel text-ink-700 text-xs font-semibold rounded flex items-center gap-2 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-subtle-green" /> : <Copy className="w-4 h-4 text-ink-500" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy to Clipboard'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-border hover:bg-panel text-ink-500 text-xs font-semibold rounded transition-colors"
            >
              Cancel
            </button>
            {format === 'pdf' ? (
              <button
                onClick={handlePrintPDF}
                className="px-4 py-2 bg-navy-800 hover:bg-navy-700 text-white text-xs font-semibold rounded flex items-center gap-2 transition-colors shadow-subtle"
              >
                <Printer className="w-4 h-4" />
                <span>Open Print / Save PDF</span>
              </button>
            ) : (
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-navy-800 hover:bg-navy-700 text-white text-xs font-semibold rounded flex items-center gap-2 transition-colors shadow-subtle"
              >
                <Download className="w-4 h-4" />
                <span>Download Report</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
