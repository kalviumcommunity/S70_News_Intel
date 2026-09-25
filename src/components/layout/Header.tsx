import React from 'react';
import { Search, Upload, Database, Home, Settings } from 'lucide-react';

interface HeaderProps {
  onOpenGlobalSearch: () => void;
  onOpenUpload: () => void;
  onOpenSettings?: () => void;
  onNavigateToLanding?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onOpenGlobalSearch, 
  onOpenUpload, 
  onOpenSettings,
  onNavigateToLanding 
}) => {
  return (
    <header className="h-14 bg-panel border-b border-border px-6 flex items-center justify-between shrink-0">
      {/* Search Input Trigger */}
      <div className="w-96 flex items-center gap-2">
        {onNavigateToLanding && (
          <button
            onClick={onNavigateToLanding}
            title="Return to Public Landing Page"
            className="p-1.5 rounded border border-border bg-canvas hover:bg-panel text-ink-700 hover:text-ink-900 transition-colors"
          >
            <Home className="w-4 h-4 text-navy-800" />
          </button>
        )}
        <button
          onClick={onOpenGlobalSearch}
          className="flex-1 flex items-center justify-between px-3 py-1.5 rounded border border-border bg-canvas text-ink-500 hover:border-ink-400 text-xs transition-colors"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-ink-400" />
            <span>Search keywords, entities, or dates...</span>
          </div>
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-panel border border-border rounded text-ink-500">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right Quick Actions */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 text-xs text-ink-500 bg-canvas rounded border border-border font-mono">
          <Database className="w-3.5 h-3.5 text-navy-800" />
          <span>Archive: <strong className="text-ink-900 font-semibold">1,284 Documents</strong></span>
        </div>

        {onOpenSettings && (
          <button
            onClick={onOpenSettings}
            title="Settings & RAG Engine Preferences"
            className="p-1.5 rounded border border-border bg-canvas hover:bg-panel text-ink-500 hover:text-ink-900 transition-colors"
          >
            <Settings className="w-4 h-4 text-navy-800" />
          </button>
        )}

        <button
          onClick={onOpenUpload}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-navy-800 hover:bg-navy-700 text-white text-xs font-semibold transition-colors shadow-subtle"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload Documents</span>
        </button>
      </div>
    </header>
  );
};
