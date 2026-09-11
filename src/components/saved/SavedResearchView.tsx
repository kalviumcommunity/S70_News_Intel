import React from 'react';
import { SavedSession } from '../../types';
import { Bookmark, FileText, ArrowRight, Clock } from 'lucide-react';

interface SavedResearchViewProps {
  sessions: SavedSession[];
  onOpenSession: (question: string) => void;
}

export const SavedResearchView: React.FC<SavedResearchViewProps> = ({
  sessions,
  onOpenSession,
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 max-w-5xl mx-auto w-full">
      {/* Header */}
      <div className="border-b border-border pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-ink-900">Saved Research</h1>
        <p className="text-sm text-ink-500 mt-0.5">
          Access your previous research sessions and grounded answers.
        </p>
      </div>

      {/* Sessions List Table / Rows */}
      <div className="bg-panel border border-border rounded divide-y divide-border shadow-subtle overflow-hidden">
        {sessions.map((sess) => (
          <div
            key={sess.id}
            onClick={() => onOpenSession(sess.question)}
            className="p-4 flex items-center justify-between hover:bg-canvas cursor-pointer transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-navy-50 text-navy-800 flex items-center justify-center shrink-0">
                <Bookmark className="w-4 h-4" />
              </div>

              <div>
                <h3 className="font-semibold text-sm text-ink-900 group-hover:text-navy-800">
                  "{sess.question}"
                </h3>
                <div className="flex items-center gap-3 text-xs text-ink-500 font-mono mt-0.5">
                  <span className="flex items-center gap-1">
                    <FileText className="w-3 h-3 text-ink-400" />
                    {sess.sourceCount} sources cited
                  </span>
                  <span>•</span>
                  <span>{sess.date}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 text-xs font-semibold text-navy-800 group-hover:underline">
              <span>Reopen session</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
