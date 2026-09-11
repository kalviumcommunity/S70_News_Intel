import React from 'react';
import { DocumentItem } from '../../types';
import { Search, X, FileText, ArrowRight, Filter } from 'lucide-react';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  documents: DocumentItem[];
  onSelectDocument: (docId: string) => void;
  onExecuteSearch: (query: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  documents,
  onSelectDocument,
  onExecuteSearch,
}) => {
  const [query, setQuery] = React.useState('');
  const [selectedTopic, setSelectedTopic] = React.useState('all');
  const [selectedType, setSelectedType] = React.useState('all');

  if (!isOpen) return null;

  const topics = ['all', 'Transport', 'Railway', 'Politics', 'Infrastructure', 'Audit'];
  const types = ['all', 'pdf', 'docx', 'txt', 'csv'];

  const results = documents.filter((doc) => {
    if (selectedTopic !== 'all' && !doc.topics.includes(selectedTopic)) return false;
    if (selectedType !== 'all' && doc.type !== selectedType) return false;
    if (query.trim()) {
      const q = query.toLowerCase();
      return (
        doc.name.toLowerCase().includes(q) ||
        doc.content.toLowerCase().includes(q) ||
        doc.entities.some((e) => e.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-start justify-center pt-20 p-4">
      <div className="bg-panel w-full max-w-2xl rounded-md border border-border shadow-lg overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Bar */}
        <div className="p-4 border-b border-border flex items-center gap-3 bg-canvas">
          <Search className="w-4 h-4 text-ink-500 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search keywords, topics, entities (e.g., 'railway delay', 'signal failure')..."
            className="flex-1 bg-transparent text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && query.trim()) {
                onExecuteSearch(query);
                onClose();
              }
            }}
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-ink-400 hover:text-ink-700">
              <X className="w-4 h-4" />
            </button>
          )}
          <button onClick={onClose} className="text-xs px-2 py-1 bg-gray-200 text-ink-700 rounded hover:bg-gray-300">
            Esc
          </button>
        </div>

        {/* Filter Bar */}
        <div className="px-4 py-2 border-b border-border bg-panel flex items-center justify-between text-xs text-ink-500">
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-ink-400" />
            <span>Topic:</span>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="bg-canvas border border-border rounded px-2 py-0.5 text-ink-700 focus:outline-none"
            >
              {topics.map((t) => (
                <option key={t} value={t}>
                  {t === 'all' ? 'All Topics' : t}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span>Type:</span>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-canvas border border-border rounded px-2 py-0.5 text-ink-700 focus:outline-none"
            >
              {types.map((ft) => (
                <option key={ft} value={ft}>
                  {ft === 'all' ? 'All Types' : ft.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-2 divide-y divide-border/60">
          {results.length === 0 ? (
            <div className="p-8 text-center text-xs text-ink-500">
              No matching documents found in archive.
            </div>
          ) : (
            results.map((doc) => (
              <div
                key={doc.id}
                onClick={() => {
                  onSelectDocument(doc.id);
                  onClose();
                }}
                className="p-3 hover:bg-canvas rounded cursor-pointer transition-colors space-y-1 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-navy-800" />
                    <span className="font-semibold text-xs text-ink-900 group-hover:text-navy-800">
                      {doc.name}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-ink-400 uppercase">
                    {doc.type} • {doc.pages} pages
                  </span>
                </div>
                <p className="text-xs text-ink-500 line-clamp-2 pl-6">
                  {doc.content}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        {query.trim() && (
          <div className="p-3 border-t border-border bg-canvas flex items-center justify-between text-xs">
            <span className="text-ink-500">Press Enter to run full RAG research query</span>
            <button
              onClick={() => {
                onExecuteSearch(query);
                onClose();
              }}
              className="flex items-center gap-1 font-semibold text-navy-800 hover:underline"
            >
              <span>Ask NewsIntel AI</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
