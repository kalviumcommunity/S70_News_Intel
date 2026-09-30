import React, { useState } from 'react';
import { Search, Upload, Database, Home, Settings, LogOut, LogIn, ChevronDown, User as UserIcon } from 'lucide-react';
import { User } from '../../types';

interface HeaderProps {
  onOpenGlobalSearch: () => void;
  onOpenUpload: () => void;
  onOpenSettings?: () => void;
  onNavigateToLanding?: () => void;
  currentUser: User | null;
  onOpenAuthModal: () => void;
  onSignOut: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onOpenGlobalSearch, 
  onOpenUpload, 
  onOpenSettings,
  onNavigateToLanding,
  currentUser,
  onOpenAuthModal,
  onSignOut,
}) => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const getInitial = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  return (
    <header className="h-14 bg-panel border-b border-border px-6 flex items-center justify-between shrink-0 select-none">
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

      {/* Right Quick Actions & User Session Control */}
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

        {/* User Profile / Auth Control */}
        <div className="relative border-l border-border pl-3">
          {currentUser ? (
            <div>
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-800/60 text-slate-200 transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                  {getInitial(currentUser.name)}
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-xs font-semibold text-white leading-tight">{currentUser.name}</div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {showUserDropdown && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowUserDropdown(false)} 
                  />
                  <div className="absolute right-0 mt-2 w-52 bg-slate-900 border border-slate-700 rounded-xl shadow-xl z-50 py-1.5 text-slate-200 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="px-3 py-2 border-b border-slate-800">
                      <div className="text-xs font-semibold text-white">{currentUser.name}</div>
                      <div className="text-[11px] text-slate-400 truncate">{currentUser.email}</div>
                      <div className="text-[10px] text-blue-400 mt-0.5 font-mono">{currentUser.role}</div>
                    </div>

                    <button
                      onClick={() => {
                        setShowUserDropdown(false);
                        onOpenSettings && onOpenSettings();
                      }}
                      className="w-full px-3 py-2 text-left text-xs hover:bg-slate-800 flex items-center gap-2 text-slate-300 hover:text-white"
                    >
                      <UserIcon className="w-3.5 h-3.5 text-slate-400" />
                      <span>Account Settings</span>
                    </button>

                    <div className="my-1 border-t border-slate-800" />

                    <button
                      onClick={() => {
                        setShowUserDropdown(false);
                        onSignOut();
                      }}
                      className="w-full px-3 py-2 text-left text-xs hover:bg-rose-500/10 flex items-center gap-2 text-rose-400 font-medium"
                    >
                      <LogOut className="w-3.5 h-3.5 text-rose-400" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors shadow-sm"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};



