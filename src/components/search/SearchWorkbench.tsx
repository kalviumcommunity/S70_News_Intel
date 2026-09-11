import React from 'react';
import { SearchResult } from '../../types';
import { MOCK_SEARCH_RESULTS } from '../../mock/data';
import { 
  Search, 
  SlidersHorizontal, 
  FileText, 
  Tag, 
  ExternalLink, 
  Sparkles, 
  X, 
  Filter, 
  Cpu, 
  BookOpen,
  ArrowRight
} from 'lucide-react';

interface SearchWorkbenchProps {
  onAskAIWithResult: (result: SearchResult) => void;
}

export const SearchWorkbench: React.FC<SearchWorkbenchProps> = ({ onAskAIWithResult }) => {
  const [query, setQuery] = React.useState('FTC compute partnerships antitrust');
  const [denseRatio, setDenseRatio] = React.useState(70); // 70% Dense, 30% Sparse
  const [selectedFileType, setSelectedFileType] = React.useState<string>('all');
  const [selectedEntity, setSelectedEntity] = React.useState<string>('all');
  const [activeModalResult, setActiveModalResult] = React.useState<SearchResult | null>(null);

  const entitiesList = ['FTC', 'Clayton Act', 'EU AI Act', 'Whistleblower', 'Cloud Compute', 'Paywalls'];

  const filteredResults = MOCK_SEARCH_RESULTS.filter((res) => {
    if (selectedFileType !== 'all' && res.fileType !== selectedFileType) return false;
    if (selectedEntity !== 'all' && !res.entities.includes(selectedEntity)) return false;
    if (query.trim()) {
      const q = query.toLowerCase();
      return (
        res.documentTitle.toLowerCase().includes(q) ||
        res.snippet.toLowerCase().includes(q) ||
        res.entities.some((e) => e.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#0B0F17] h-[calc(100vh-4rem)]">
      {/* Header Banner */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
        <div>
          <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Search className="w-5 h-5 text-brand-400" />
            Semantic & Hybrid Search Workbench
          </h1>
          <p className="text-xs text-slate-400">
            Combine Dense Vector Embeddings (cos-sim) with Sparse Keyword Matching (BM25)
          </p>
        </div>
      </div>

      {/* Main Search Controls & Hybrid Slider Box */}
      <div className="glass-panel p-5 rounded-2xl space-y-4 border-brand-500/20 shadow-xl">
        {/* Search Input Bar */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type semantic query, document keyphrases, or entity terms..."
            className="w-full glass-input pl-12 pr-28 py-3 rounded-xl text-sm font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Hybrid Weighting Slider */}
        <div className="p-3.5 rounded-xl bg-surface-50/60 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-300 flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-brand-400" />
              Hybrid Search Scoring Mix
            </span>
            <div className="flex items-center gap-3 font-mono text-[11px]">
              <span className="text-accent-purple font-semibold">{denseRatio}% Dense Vector (Semantic)</span>
              <span className="text-slate-400">•</span>
              <span className="text-accent-cyan font-semibold">{100 - denseRatio}% Sparse (BM25 Lexical)</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono text-accent-purple shrink-0">Dense Only</span>
            <input
              type="range"
              min="0"
              max="100"
              value={denseRatio}
              onChange={(e) => setDenseRatio(Number(e.target.value))}
              className="flex-1 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-500"
            />
            <span className="text-[10px] font-mono text-accent-cyan shrink-0">Sparse Only</span>
          </div>
        </div>

        {/* Entity Chips & File Type Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-slate-800/60">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
              <Filter className="w-3 h-3" /> Entity Filter:
            </span>
            <button
              onClick={() => setSelectedEntity('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                selectedEntity === 'all'
                  ? 'bg-brand-500/20 text-brand-300 border border-brand-500/40'
                  : 'bg-surface-100 text-slate-400 hover:text-slate-200'
              }`}
            >
              All Entities
            </button>
            {entitiesList.map((ent) => (
              <button
                key={ent}
                onClick={() => setSelectedEntity(ent === selectedEntity ? 'all' : ent)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                  selectedEntity === ent
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 font-semibold'
                    : 'bg-surface-100 text-slate-400 hover:text-slate-200'
                }`}
              >
                #{ent}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-400">File Format:</span>
            {['all', 'pdf', 'docx', 'txt'].map((ft) => (
              <button
                key={ft}
                onClick={() => setSelectedFileType(ft)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono uppercase font-semibold transition-colors ${
                  selectedFileType === ft
                    ? 'bg-brand-500 text-white'
                    : 'bg-surface-100 text-slate-400 hover:text-slate-200'
                }`}
              >
                {ft}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Header & Counter */}
      <div className="flex items-center justify-between text-xs font-medium text-slate-400 px-1">
        <span>Found <strong>{filteredResults.length}</strong> matching document passages</span>
        <span>Ranked by Hybrid Formula: α × Score(Dense) + (1-α) × Score(Sparse)</span>
      </div>

      {/* Results Cards List */}
      <div className="space-y-4">
        {filteredResults.map((res) => {
          // Weighted hybrid score formula preview
          const computedScore = Math.round((denseRatio / 100) * res.denseScore + ((100 - denseRatio) / 100) * res.sparseScore);

          return (
            <div
              key={res.id}
              className="glass-panel p-5 rounded-2xl space-y-3 hover:border-brand-500/40 transition-all duration-200 group shadow-lg"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-surface-100 text-brand-300 border border-slate-700">
                      {res.fileType.toUpperCase()} • p.{res.pageNumber}
                    </span>
                    <span className="text-xs text-slate-400">• {res.outlet}</span>
                    <span className="text-xs text-slate-400">• {res.publishDate}</span>
                  </div>
                  <h3 
                    onClick={() => setActiveModalResult(res)}
                    className="text-base font-semibold text-slate-100 hover:text-brand-300 cursor-pointer transition-colors"
                  >
                    {res.documentTitle}
                  </h3>
                </div>

                {/* Score Gauge Badge */}
                <div className="flex items-center gap-2 shrink-0">
                  <div className="text-right">
                    <span className="text-lg font-bold font-mono text-emerald-400 block leading-none">
                      {computedScore}%
                    </span>
                    <span className="text-[9px] font-mono text-slate-400">Hybrid Match</span>
                  </div>
                </div>
              </div>

              {/* Snippet */}
              <p className="text-xs text-slate-300 leading-relaxed font-sans bg-[#090D14] p-3 rounded-xl border border-slate-800">
                "{res.snippet}"
              </p>

              {/* Card Footer Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                <div className="flex items-center gap-1.5">
                  {res.entities.map((e, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-mono bg-surface-100 text-slate-400 border border-slate-700/60">
                      #{e}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveModalResult(res)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-surface-100 hover:bg-surface-200 border border-slate-700 transition-colors"
                  >
                    Inspect Full Text
                  </button>
                  <button
                    onClick={() => onAskAIWithResult(res)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-brand-600 hover:bg-brand-500 shadow-sm flex items-center gap-1.5 transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Ask AI About This</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search Result Detail Modal */}
      {activeModalResult && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-2xl rounded-2xl p-6 space-y-4 border-slate-700 shadow-2xl relative animate-in zoom-in-95">
            <button
              onClick={() => setActiveModalResult(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-brand-500/20 text-brand-300 border border-brand-500/30">
                {activeModalResult.fileType.toUpperCase()} • Page {activeModalResult.pageNumber}
              </span>
              <span className="text-xs text-slate-400">{activeModalResult.outlet}</span>
            </div>

            <h2 className="text-lg font-bold text-slate-100">{activeModalResult.documentTitle}</h2>

            <div className="p-4 rounded-xl bg-[#090D14] border border-slate-800 text-xs text-slate-200 leading-relaxed font-sans max-h-60 overflow-y-auto">
              {activeModalResult.fullContent}
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="text-xs text-slate-400 font-mono">
                Dense Vector: {activeModalResult.denseScore}% • BM25 Lexical: {activeModalResult.sparseScore}%
              </div>
              <button
                onClick={() => {
                  onAskAIWithResult(activeModalResult);
                  setActiveModalResult(null);
                }}
                className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>Transfer to AI Research Chat</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
