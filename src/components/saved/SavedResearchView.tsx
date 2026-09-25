import React from 'react';
import { SavedSession } from '../../types';
import { Bookmark, FileText, ArrowRight, Trash2, Search, Sparkles, Share2, Check } from 'lucide-react';

interface SavedResearchViewProps {
  sessions: SavedSession[];
  onOpenSession: (question: string) => void;
}

export const SavedResearchView: React.FC<SavedResearchViewProps> = ({
  sessions: initialSessions,
  onOpenSession,
}) => {
  const [sessionsList, setSessionsList] = React.useState<SavedSession[]>(initialSessions);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const filteredSessions = sessionsList.filter((s) =>
    s.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteSession = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSessionsList(sessionsList.filter((s) => s.id !== id));
  };

  const handleShareSession = (sess: SavedSession, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`Research Query: "${sess.question}" — ${sess.sourceCount} verified sources cited.`);
    setCopiedId(sess.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 max-w-5xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border pb-4 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink-900">Saved Research Sessions</h1>
          <p className="text-sm text-ink-500 mt-0.5">
            Bookmarked investigation queries and grounded evidence outputs.
          </p>
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 text-ink-400 absolute left-2.5 top-2.5" />
          <input
            type="text"
            placeholder="Search saved queries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-panel border border-border rounded pl-8 pr-3 py-1.5 text-xs text-ink-900 focus:outline-none focus:border-navy-800 w-48 sm:w-64"
          />
        </div>
      </div>

      {/* Sessions List Rows */}
      {filteredSessions.length === 0 ? (
        <div className="p-8 text-center text-xs text-ink-500 bg-panel border border-border rounded">
          No saved research sessions match your search.
        </div>
      ) : (
        <div className="bg-panel border border-border rounded divide-y divide-border shadow-subtle overflow-hidden">
          {filteredSessions.map((sess) => (
            <div
              key={sess.id}
              onClick={() => onOpenSession(sess.question)}
              className="p-4 flex items-center justify-between hover:bg-canvas cursor-pointer transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded bg-navy-800/10 border border-navy-800/30 text-navy-800 flex items-center justify-center shrink-0">
                  <Bookmark className="w-4 h-4 fill-navy-800/20 text-navy-800" />
                </div>

                <div>
                  <h3 className="font-semibold text-sm text-ink-900 group-hover:text-navy-800 flex items-center gap-2">
                    "{sess.question}"
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-ink-500 font-mono mt-1">
                    <span className="flex items-center gap-1">
                      <FileText className="w-3 h-3 text-ink-400" />
                      {sess.sourceCount} sources cited
                    </span>
                    <span>•</span>
                    <span>{sess.date}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => handleShareSession(sess, e)}
                  className="p-1 text-ink-400 hover:text-navy-800 transition-colors"
                  title="Share session summary"
                >
                  {copiedId === sess.id ? <Check className="w-4 h-4 text-subtle-green" /> : <Share2 className="w-4 h-4" />}
                </button>

                <button
                  onClick={(e) => handleDeleteSession(sess.id, e)}
                  className="p-1 text-ink-400 hover:text-subtle-red transition-colors"
                  title="Remove saved session"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-1 text-xs font-semibold text-navy-800 group-hover:underline ml-2">
                  <span>Reopen session</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
