import React from 'react';
import { Citation } from '../../types';
import { 
  X, 
  ExternalLink, 
  CheckCircle2, 
  FileText, 
  ShieldCheck, 
  Tag, 
  Copy, 
  Check, 
  Download, 
  Sparkles,
  BookOpen,
  Scale
} from 'lucide-react';

interface EvidenceViewerProps {
  citation: Citation | null;
  onClose: () => void;
}

export const EvidenceViewer: React.FC<EvidenceViewerProps> = ({ citation, onClose }) => {
  const [copied, setCopied] = React.useState(false);
  const [clipped, setClipped] = React.useState(false);

  if (!citation) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(citation.fullExcerpt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClip = () => {
    setClipped(true);
    setTimeout(() => setClipped(false), 2500);
  };

  return (
    <aside className="w-96 border-l border-slate-800/80 bg-[#0E1420]/95 backdrop-blur-xl flex flex-col h-[calc(100vh-4rem)] shrink-0 z-30 shadow-2xl animate-in slide-in-from-right duration-200">
      {/* Panel Top Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-surface-50/50">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-accent-purple/20 border border-accent-purple/30 flex items-center justify-center text-accent-purple">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-slate-100 flex items-center gap-1.5">
              Evidence Viewer
            </h3>
            <p className="text-[11px] text-slate-400 font-mono">ID: {citation.id}</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-surface-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Panel Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* Source Document Details */}
        <div className="glass-panel p-3.5 rounded-xl space-y-2 border-brand-500/20">
          <div className="flex items-start justify-between gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-brand-500/20 text-brand-300 border border-brand-500/30">
              {citation.fileType.toUpperCase()} • Page {citation.pageNumber}
            </span>
            <span className="text-[11px] text-slate-400 font-mono">{citation.publishDate}</span>
          </div>

          <h4 className="font-semibold text-sm text-slate-100 leading-snug">
            {citation.documentTitle}
          </h4>

          <div className="text-xs text-slate-400 space-y-0.5 pt-1">
            <p><strong className="text-slate-300">Outlet:</strong> {citation.sourceOutlet}</p>
            <p><strong className="text-slate-300">Author:</strong> {citation.author}</p>
          </div>
        </div>

        {/* Verifiability & Relevance Scores */}
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-accent-emerald" />
            Verification & Relevance Metrics
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="glass-panel p-3 rounded-xl">
              <span className="text-[10px] text-slate-400 font-medium block">Relevance Match</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-xl font-bold font-mono text-emerald-400">{citation.relevanceScore}%</span>
                <span className="text-[10px] text-emerald-500">Vector Sim</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full rounded-full" 
                  style={{ width: `${citation.relevanceScore}%` }}
                />
              </div>
            </div>

            <div className="glass-panel p-3 rounded-xl">
              <span className="text-[10px] text-slate-400 font-medium block">Groundedness Score</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-xl font-bold font-mono text-accent-purple">{citation.groundednessScore}%</span>
                <span className="text-[10px] text-purple-400">Fact Grounded</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className="bg-accent-purple h-full rounded-full" 
                  style={{ width: `${citation.groundednessScore}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Verbatim Excerpt Block */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-brand-400" />
              Verbatim Document Passage
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-[11px] text-brand-400 hover:text-brand-300 font-medium transition-colors"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied!' : 'Copy Text'}</span>
            </button>
          </div>

          <div className="p-3.5 rounded-xl bg-[#090D14] border border-slate-700/80 text-xs leading-relaxed text-slate-200 font-sans shadow-inner relative group">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-500 rounded-l-xl"></div>
            <p className="whitespace-pre-wrap pl-2 italic text-slate-300">
              "{citation.fullExcerpt}"
            </p>
          </div>
        </div>

        {/* Entity & Topic Tags */}
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2 flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-accent-amber" />
            Extracted Named Entities
          </span>
          <div className="flex flex-wrap gap-1.5">
            {citation.entityTags.map((tag, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-surface-100 text-slate-300 border border-slate-700/60"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Panel Action Footer */}
      <div className="p-4 border-t border-slate-800 bg-surface-50/80 flex items-center gap-2">
        <button
          onClick={handleClip}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
            clipped 
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30' 
              : 'bg-brand-600 hover:bg-brand-500 text-white shadow-md shadow-brand-600/20'
          }`}
        >
          {clipped ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span>Clipped to Notebook!</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Clip to Research Notepad</span>
            </>
          )}
        </button>

        <button
          title="Download original file"
          onClick={() => alert(`Downloading full source document: ${citation.documentTitle}`)}
          className="p-2 rounded-xl bg-surface-100 hover:bg-surface-200 border border-slate-700 text-slate-300 transition-colors"
        >
          <Download className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
