import React from 'react';
import { ResearchAnswer, Citation } from '../../types';
import { EvidencePanel } from './EvidencePanel';
import { FileText, ArrowLeft, HelpCircle, ExternalLink } from 'lucide-react';

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

  const activeCitation = answerData.citations[activeCitationId] || null;

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
      {/* Main Content Area (65 - 70%) */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 max-w-4xl">
        {/* Top Breadcrumb & Question Header */}
        <div className="space-y-3">
          <button
            onClick={onBackToSearch}
            className="flex items-center gap-1.5 text-xs font-medium text-ink-500 hover:text-navy-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>New Search</span>
          </button>

          <div className="space-y-1">
            <span className="text-xs font-semibold text-ink-500 uppercase tracking-wider">
              Research Question
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-ink-900">
              {answerData.question}
            </h1>
          </div>
        </div>

        {/* Answer Section */}
        <div className="space-y-4 pt-2">
          <h2 className="text-sm font-bold text-ink-900 uppercase tracking-wider border-b border-border pb-2">
            Answer
          </h2>

          <div className="space-y-3 bg-panel p-5 rounded border border-border shadow-subtle">
            {answerData.paragraphs.map((para, i) => (
              <React.Fragment key={i}>
                {renderParagraphWithCitations(para)}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Sources Section */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-ink-900 uppercase tracking-wider border-b border-border pb-2">
            Sources
          </h2>

          <div className="divide-y divide-border border border-border rounded bg-panel overflow-hidden">
            {answerData.sources.map((src) => {
              const cit = answerData.citations[src.citationId];
              const isSelected = activeCitationId === src.citationId;

              return (
                <div
                  key={src.id}
                  onClick={() => {
                    if (cit) setActiveCitationId(cit.id);
                  }}
                  className={`p-3.5 flex items-center justify-between hover:bg-canvas cursor-pointer transition-colors ${
                    isSelected ? 'bg-navy-50/60' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-navy-800 shrink-0" />
                    <div>
                      <h4 className="font-semibold text-xs text-ink-900 hover:underline">
                        {src.name}
                      </h4>
                      <p className="text-[11px] text-ink-500 font-mono mt-0.5">
                        {src.details}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 text-xs font-mono font-semibold bg-gray-100 text-ink-700 rounded border border-gray-200">
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
        </div>

        {/* Related Questions Section */}
        <div className="space-y-3 pt-2">
          <h2 className="text-sm font-bold text-ink-900 uppercase tracking-wider flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-navy-800" />
            Related questions
          </h2>

          <div className="space-y-2">
            {answerData.relatedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => onAskNewQuestion(q)}
                className="w-full text-left px-3.5 py-2.5 rounded border border-border bg-panel hover:bg-canvas transition-colors text-xs font-medium text-ink-800 flex items-center justify-between group"
              >
                <span>"{q}"</span>
                <span className="text-[11px] text-navy-800 font-semibold group-hover:underline">
                  Ask →
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side Evidence Panel (30 - 35%) */}
      <div className="w-full md:w-80 lg:w-96 shrink-0 h-full">
        <EvidencePanel
          activeCitation={activeCitation}
          onOpenDocument={onOpenDocument}
        />
      </div>
    </div>
  );
};
