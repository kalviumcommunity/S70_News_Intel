import React from 'react';
import { DocumentItem } from '../../types';
import { ArrowLeft, Download, Share2, MessageSquare, Send, Tag, Building, Layers } from 'lucide-react';

interface DocumentViewerProps {
  document: DocumentItem;
  onBack: () => void;
  onAskAboutDoc: (question: string) => void;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({
  document,
  onBack,
  onAskAboutDoc,
}) => {
  const [docQuestion, setDocQuestion] = React.useState('');

  const handleDocQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (docQuestion.trim()) {
      onAskAboutDoc(`Regarding ${document.name}: ${docQuestion.trim()}`);
    }
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row h-full overflow-hidden bg-canvas">
      {/* Main Document Reading Column */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 max-w-4xl">
        {/* Top Controls */}
        <div className="space-y-4 border-b border-border pb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-medium text-ink-500 hover:text-navy-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Documents</span>
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-ink-900">
                {document.name}
              </h1>
              <p className="text-xs text-ink-500 font-mono mt-1">
                {document.type.toUpperCase()} · {document.pages} pages · Uploaded {document.uploadedDate} by {document.uploadedBy}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => alert(`Downloading document: ${document.name}`)}
                className="px-3 py-1.5 border border-border hover:bg-panel text-ink-700 rounded text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-ink-500" />
                <span>Download</span>
              </button>
              <button
                onClick={() => alert(`Share link copied for ${document.name}`)}
                className="px-3 py-1.5 border border-border hover:bg-panel text-ink-700 rounded text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5 text-ink-500" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* Reading Article Body */}
        <article className="bg-panel p-8 border border-border rounded shadow-subtle space-y-4">
          <div className="prose prose-slate max-w-none text-sm text-ink-900 leading-relaxed font-sans whitespace-pre-wrap">
            {document.content}
          </div>
        </article>
      </div>

      {/* Right Document Info Panel */}
      <aside className="w-full md:w-80 shrink-0 bg-panel border-l border-border flex flex-col h-full sticky top-0 justify-between">
        <div className="p-6 space-y-6 overflow-y-auto">
          <h3 className="font-bold text-sm text-ink-900 border-b border-border pb-3 uppercase tracking-wider">
            Document Information
          </h3>

          {/* Topics */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-ink-500 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-navy-800" />
              Topics
            </div>
            <div className="flex flex-wrap gap-1.5">
              {document.topics.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded text-xs bg-canvas text-ink-700 border border-border"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Entities */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-ink-500 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-navy-800" />
              Extracted Entities
            </div>
            <div className="flex flex-wrap gap-1.5">
              {document.entities.map((e, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded text-xs font-mono bg-navy-50 text-navy-800 border border-navy-800/20"
                >
                  {e}
                </span>
              ))}
            </div>
          </div>

          {/* Metadata Fields */}
          <div className="space-y-2 pt-2 border-t border-border text-xs text-ink-700">
            <div className="flex justify-between">
              <span className="text-ink-500">Pages:</span>
              <span className="font-mono font-semibold text-ink-900">{document.pages}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-500">File Size:</span>
              <span className="font-mono font-semibold text-ink-900">{document.size}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-ink-500">Status:</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-subtle-greenBg text-subtle-green border border-subtle-green/30">
                {document.status}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Document Question Input */}
        <div className="p-4 border-t border-border bg-canvas space-y-2">
          <div className="text-xs font-semibold text-ink-700 flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-navy-800" />
            Ask about this document
          </div>
          <form onSubmit={handleDocQuestionSubmit} className="flex gap-1.5">
            <input
              type="text"
              value={docQuestion}
              onChange={(e) => setDocQuestion(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 px-3 py-1.5 bg-panel border border-border rounded text-xs text-ink-900 placeholder:text-ink-400 focus:outline-none focus:border-navy-800"
            />
            <button
              type="submit"
              disabled={!docQuestion.trim()}
              className="p-1.5 bg-navy-800 hover:bg-navy-700 text-white rounded disabled:opacity-50 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </aside>
    </div>
  );
};
