import React from 'react';
import { Citation } from '../../types';
import { FileText, ExternalLink, Copy, Check, ShieldCheck } from 'lucide-react';

interface EvidencePanelProps {
  activeCitation: Citation | null;
  onOpenDocument: (docId: string) => void;
}

export const EvidencePanel: React.FC<EvidencePanelProps> = ({
  activeCitation,
  onOpenDocument,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    if (!activeCitation) return;
    const text = `"${activeCitation.highlightSentence}" — ${activeCitation.documentTitle}, Page ${activeCitation.pageNumber}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!activeCitation) {
    return (
      <div className="w-full h-full bg-panel border-l border-border p-6 flex flex-col items-center justify-center text-center text-ink-500">
        <ShieldCheck className="w-8 h-8 text-ink-400 mb-2" />
        <h3 className="font-semibold text-sm text-ink-700">Evidence Verification</h3>
        <p className="text-xs text-ink-500 mt-1 max-w-xs">
          Click any citation marker <span className="font-mono font-bold text-navy-800">[1]</span>, <span className="font-mono font-bold text-navy-800">[2]</span>, or <span className="font-mono font-bold text-navy-800">[3]</span> in the answer to inspect verified source excerpts.
        </p>
      </div>
    );
  }

  return (
    <aside className="w-full bg-panel border-l border-border flex flex-col h-full sticky top-0 overflow-y-auto">
      {/* Header */}
      <div className="h-14 px-5 border-b border-border flex items-center justify-between bg-canvas shrink-0">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-navy-800" />
          <h3 className="font-bold text-sm text-ink-900">Evidence</h3>
        </div>
        <span className="px-2 py-0.5 text-xs font-mono font-bold bg-navy-800 text-white rounded">
          Citation #{activeCitation.id}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 space-y-6 flex-1">
        {/* Highlighted Sentence Quote */}
        <div className="space-y-2">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-400">
            Verified Passages
          </div>
          <div className="p-3.5 bg-canvas border border-border rounded text-sm text-ink-900 leading-relaxed font-sans relative">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-navy-800 rounded-l"></div>
            <p className="pl-2">
              "<strong className="bg-amber-100 text-ink-900 font-normal px-0.5 rounded">{activeCitation.highlightSentence}</strong>"
            </p>
          </div>
          <p className="text-xs text-ink-500 italic pl-1">
            Full Excerpt: "{activeCitation.excerptText}"
          </p>
        </div>

        {/* Source Meta */}
        <div className="p-3.5 border border-border rounded bg-panel space-y-2">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-400">
            Source Document
          </div>

          <div className="flex items-start gap-2.5">
            <FileText className="w-4 h-4 text-navy-800 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-sm text-ink-900">
                {activeCitation.documentTitle}
              </h4>
              <div className="text-xs text-ink-500 font-mono mt-0.5">
                Page {activeCitation.pageNumber} • {activeCitation.type.toUpperCase()}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 border-t border-border space-y-2">
          <button
            onClick={() => onOpenDocument(activeCitation.documentId)}
            className="w-full py-2 px-3 bg-navy-800 hover:bg-navy-700 text-white text-xs font-semibold rounded flex items-center justify-center gap-2 transition-colors shadow-subtle"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open document</span>
          </button>

          <button
            onClick={handleCopy}
            className="w-full py-2 px-3 border border-border hover:bg-canvas text-ink-700 text-xs font-medium rounded flex items-center justify-center gap-2 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-subtle-green" /> : <Copy className="w-3.5 h-3.5 text-ink-500" />}
            <span>{copied ? 'Citation Copied!' : 'Copy citation'}</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
