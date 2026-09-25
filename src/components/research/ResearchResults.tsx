import React from 'react';
import { ResearchAnswer, Citation, FileType } from '../../types';
import { EvidencePanel } from './EvidencePanel';
import { ExportModal } from './ExportModal';
import { 
  FileText, 
  ArrowLeft, 
  HelpCircle, 
  ExternalLink, 
  Download, 
  Filter, 
  Search, 
  ShieldCheck, 
  Share2, 
  Check, 
  Sparkles,
  BarChart2
} from 'lucide-react';

interface ResearchResultsProps {
  answerData: ResearchAnswer;
  onAskNewQuestion: (question: string) => void;
  onOpenDocument: (docId: string) => void;
  onBackToSearch: () => void;
}

export const ResearchResults: React.FC<ResearchResultsProps> = ({
  answerData,
  onAskNewQuestion,
  onOpenDocument,
  onBackToSearch,
}) => {
  const [activeCitationId, setActiveCitationId] = React.useState<number>(1);
  const [isExportOpen, setIsExportOpen] = React.useState(false);
  const [sourceSearch, setSourceSearch] = React.useState('');
  const [selectedTypeFilter, setSelectedTypeFilter] = React.useState<FileType | 'all'>('all');
  const [copiedQuick, setCopiedQuick] = React.useState(false);

  const activeCitation = answerData.citations[activeCitationId] || null;

  // Filter sources based on search and type filter
  const filteredSources = answerData.sources.filter((src) => {
    const matchesSearch = 
      src.name.toLowerCase().includes(sourceSearch.toLowerCase()) ||
      src.details.toLowerCase().includes(sourceSearch.toLowerCase());
    const matchesType = selectedTypeFilter === 'all' || src.type === selectedTypeFilter;
    return matchesSearch && matchesType;
  });

  const handleQuickCopy = () => {
    const text = `${answerData.question}\n\n${answerData.paragraphs.join('\n\n')}\n\nSources: ${answerData.sources.map(s => s.name).join(', ')}`;
    navigator.clipboard.writeText(text);
    setCopiedQuick(true);
    setTimeout(() => setCopiedQuick(false), 2000);
  };

  const renderParagraphWithCitations = (text: string) => {
    // Regex for [1], [2], [3]
    const parts = text.split(/(\[\d+\])/g);

    return (
      <p className="text-sm text-ink-900 leading-relaxed font-sans">
        {parts.map((part, idx) => {
          const match = part.match(/\[(\d+)\]/);
          if (match) {
            const citId = parseInt(match[1], 10);
            const isSelected = activeCitationId === citId;
            return (
              <button
                key={idx}
                onClick={() => setActiveCitationId(citId)}
                className={`citation-btn ${isSelected ? 'active' : ''}`}
                title={`Click to inspect Evidence #${citId}`}
              >
                [{citId}]
              </button>
            );
          }
          return <span key={idx}>{part}</span>;
        })}
      </p>
    );
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row h-full overflow-hidden bg-canvas">
      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 max-w-4xl">
        {/* Top Breadcrumb & Question Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBackToSearch}
              className="flex items-center gap-1.5 text-xs font-medium text-ink-500 hover:text-navy-800 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>New Search</span>
            </button>

            {/* Export & Action Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleQuickCopy}
                className="px-2.5 py-1.5 border border-border hover:bg-panel text-ink-700 hover:text-ink-900 text-xs font-semibold rounded flex items-center gap-1.5 transition-colors"
                title="Quick copy briefing text"
              >
                {copiedQuick ? <Check className="w-3.5 h-3.5 text-subtle-green" /> : <Share2 className="w-3.5 h-3.5 text-ink-500" />}
                <span>{copiedQuick ? 'Copied' : 'Quick Share'}</span>
              </button>

              <button
                onClick={() => setIsExportOpen(true)}
                className="px-3 py-1.5 bg-navy-800 hover:bg-navy-700 text-white text-xs font-semibold rounded flex items-center gap-1.5 transition-colors shadow-subtle"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Briefing</span>
              </button>
            </div>
          </div>

          <div className="space-y-1.5 bg-panel p-5 rounded border border-border">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-ink-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-navy-800" />
                Verified Research Synthesis
              </span>
              <span className="px-2 py-0.5 text-[11px] font-mono font-bold bg-subtle-greenBg text-subtle-green rounded border border-subtle-green/40">
                96.4% Vector Confidence
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-ink-900">
              {answerData.question}
            </h1>
          </div>
        </div>

        {/* Answer Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <h2 className="text-sm font-bold text-ink-900 uppercase tracking-wider">
              Executive Summary Answer
            </h2>
            <span className="text-xs text-ink-500 font-mono">
              {answerData.paragraphs.length} paragraphs • {Object.keys(answerData.citations).length} verified citations
            </span>
          </div>

          <div className="space-y-4 bg-panel p-5 rounded border border-border shadow-subtle">
            {answerData.paragraphs.map((para, i) => (
              <React.Fragment key={i}>
                {renderParagraphWithCitations(para)}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Sources Section with Citation Filter */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border pb-2 gap-2">
            <h2 className="text-sm font-bold text-ink-900 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-navy-800" />
              Primary Sources ({filteredSources.length})
            </h2>

            {/* Filter Controls */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-ink-400 absolute left-2.5 top-2" />
                <input
                  type="text"
                  placeholder="Filter sources..."
                  value={sourceSearch}
                  onChange={(e) => setSourceSearch(e.target.value)}
                  className="bg-canvas border border-border rounded pl-8 pr-2.5 py-1 text-xs text-ink-900 focus:outline-none focus:border-navy-800 w-36 sm:w-44"
                />
              </div>

              <select
                value={selectedTypeFilter}
                onChange={(e) => setSelectedTypeFilter(e.target.value as any)}
                className="bg-canvas border border-border rounded px-2 py-1 text-xs text-ink-700 focus:outline-none focus:border-navy-800"
              >
                <option value="all">All Types</option>
                <option value="pdf">PDF Reports</option>
                <option value="docx">Word (DOCX)</option>
                <option value="txt">Text Logs</option>
                <option value="csv">Datasets</option>
              </select>
            </div>
          </div>

          {filteredSources.length === 0 ? (
            <div className="p-6 text-center text-xs text-ink-500 border border-border rounded bg-panel">
              No sources matched your filter parameters.
            </div>
          ) : (
            <div className="divide-y divide-border border border-border rounded bg-panel overflow-hidden">
              {filteredSources.map((src) => {
                const cit = answerData.citations[src.citationId];
                const isSelected = activeCitationId === src.citationId;

                return (
                  <div
                    key={src.id}
                    onClick={() => {
                      if (cit) setActiveCitationId(cit.id);
                    }}
                    className={`p-3.5 flex items-center justify-between hover:bg-canvas cursor-pointer transition-colors ${
                      isSelected ? 'bg-navy-800/10 border-l-4 border-l-navy-800' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-canvas border border-border flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4 text-navy-800" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-xs text-ink-900 hover:underline flex items-center gap-2">
                          {src.name}
                          {cit && (
                            <span className="px-1.5 py-0.2 text-[10px] font-mono text-ink-400 bg-canvas border border-border rounded">
                              Page {cit.pageNumber}
                            </span>
                          )}
                        </h4>
                        <p className="text-[11px] text-ink-500 font-mono mt-0.5">
                          {src.details}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="px-2 py-0.5 text-xs font-mono font-bold bg-canvas text-navy-800 rounded border border-navy-800/30">
                        [{src.citationId}]
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenDocument(src.id);
                        }}
                        className="p-1 text-ink-400 hover:text-navy-800 transition-colors"
                        title="Open full document"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Related Questions Section */}
        <div className="space-y-3 pt-2">
          <h2 className="text-sm font-bold text-ink-900 uppercase tracking-wider flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-navy-800" />
            Follow-up Research Queries
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {answerData.relatedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => onAskNewQuestion(q)}
                className="text-left p-3 rounded border border-border bg-panel hover:bg-canvas transition-all text-xs font-medium text-ink-800 flex flex-col justify-between group hover:border-navy-800/50"
              >
                <span className="line-clamp-2">"{q}"</span>
                <span className="text-[11px] text-navy-800 font-semibold mt-2 group-hover:underline self-end">
                  Explore query →
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side Evidence Panel */}
      <div className="w-full md:w-80 lg:w-96 shrink-0 h-full">
        <EvidencePanel
          activeCitation={activeCitation}
          onOpenDocument={onOpenDocument}
        />
      </div>

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        answerData={answerData}
      />
    </div>
  );
};
