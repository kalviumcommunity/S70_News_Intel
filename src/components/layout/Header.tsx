import React from 'react';
import { UserRole, ActiveTab } from '../../types';
import { Newspaper, Search, ShieldCheck, Database, Bell, UserCheck, Sparkles, ChevronDown } from 'lucide-react';

interface HeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onGlobalSearchClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleChange,
  activeTab,
  onTabChange,
  onGlobalSearchClick,
}) => {
  const [showRoleDropdown, setShowRoleDropdown] = React.useState(false);

  const roles: UserRole[] = ['Journalist', 'Senior Editor', 'System Admin'];

  return (
    <header className="h-16 border-b border-slate-800/80 bg-[#0E1420]/90 backdrop-blur-md sticky top-0 z-40 px-4 flex items-center justify-between gap-4">
      {/* Brand & Logo */}
      <div className="flex items-center gap-3 min-w-[240px]">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-700 via-brand-500 to-accent-purple p-0.5 shadow-lg shadow-brand-500/20">
          <div className="w-full h-full bg-[#0B0F17] rounded-[10px] flex items-center justify-center">
            <Newspaper className="w-5 h-5 text-brand-500" />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              NewsIntel
            </span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-brand-500/10 text-brand-400 border border-brand-500/20">
              RAG v2.4
            </span>
          </div>
          <p className="text-[11px] text-slate-400 font-medium">Enterprise News Research Platform</p>
        </div>
      </div>

      {/* Global Quick Search Bar */}
      <div className="flex-1 max-w-xl hidden md:block">
        <button
          onClick={() => {
            onTabChange('search');
            onGlobalSearchClick();
          }}
          className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl bg-surface-50/70 border border-slate-700/60 text-slate-400 hover:text-slate-200 hover:border-brand-500/40 hover:bg-surface-100/80 transition-all group"
        >
          <Search className="w-4 h-4 text-slate-400 group-hover:text-brand-400 transition-colors" />
          <span className="text-sm font-medium">Search newsroom archive, transcripts, or ask RAG AI...</span>
          <div className="ml-auto flex items-center gap-1">
            <kbd className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 border border-slate-700 text-slate-300">
              ⌘ K
            </kbd>
          </div>
        </button>
      </div>

      {/* Right Controls: System Health & RBAC Selector */}
      <div className="flex items-center gap-3">
        {/* Live Vector DB Status Indicator */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-50/50 border border-slate-800 text-xs text-slate-300">
          <Database className="w-3.5 h-3.5 text-accent-emerald animate-pulse" />
          <span>Vector DB: <strong className="text-emerald-400 font-semibold">1,482 Chunks</strong></span>
          <span className="w-1 h-1 rounded-full bg-slate-600"></span>
          <span className="text-slate-400">pgvector + Redis</span>
        </div>

        {/* Notifications */}
        <button 
          title="System notifications"
          className="p-2 rounded-lg bg-surface-50 border border-slate-800 text-slate-400 hover:text-white hover:bg-surface-100 relative"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-500 ring-2 ring-[#0E1420]" />
        </button>

        {/* Role-Based Access Control Switcher */}
        <div className="relative">
          <button
            onClick={() => setShowRoleDropdown(!showRoleDropdown)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-100 border border-slate-700/70 hover:border-brand-500/50 text-xs font-medium text-slate-200 transition-all"
          >
            <div className="w-6 h-6 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center border border-brand-500/30">
              <UserCheck className="w-3.5 h-3.5" />
            </div>
            <div className="text-left">
              <span className="block text-[10px] text-slate-400 leading-none">Perspective</span>
              <span className="font-semibold text-slate-100">{currentRole}</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
          </button>

          {showRoleDropdown && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl bg-surface-100 border border-slate-700/80 shadow-2xl p-1 z-50 animate-in fade-in zoom-in-95">
              <div className="px-3 py-2 border-b border-slate-800 text-[10px] font-semibold uppercase text-slate-400 tracking-wider">
                Select RBAC Role
              </div>
              {roles.map((role) => (
                <button
                  key={role}
                  onClick={() => {
                    onRoleChange(role);
                    setShowRoleDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between transition-colors ${
                    currentRole === role
                      ? 'bg-brand-500/20 text-brand-300 font-semibold border border-brand-500/30'
                      : 'text-slate-300 hover:bg-surface-200/60 hover:text-white'
                  }`}
                >
                  <span>{role}</span>
                  {currentRole === role && <ShieldCheck className="w-3.5 h-3.5 text-brand-400" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
