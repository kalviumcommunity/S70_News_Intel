import React from 'react';
import { ActiveTab, ResearchSession, UserRole } from '../../types';
import { 
  MessageSquareText, 
  Search, 
  FolderKanban, 
  BarChart3, 
  ShieldCheck, 
  Plus, 
  History, 
  Users, 
  Bookmark, 
  FileText,
  Sparkles
} from 'lucide-react';

interface SidebarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  sessions: ResearchSession[];
  activeSessionId: string;
  onSelectSession: (id: string) => void;
  onNewSession: () => void;
  currentRole: UserRole;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  sessions,
  activeSessionId,
  onSelectSession,
  onNewSession,
  currentRole,
}) => {
  const mainNavItems = [
    { id: 'chat' as ActiveTab, label: 'AI Research Chat', icon: MessageSquareText, badge: 'RAG' },
    { id: 'search' as ActiveTab, label: 'Hybrid Search', icon: Search, badge: 'Dense/Sparse' },
    { id: 'documents' as ActiveTab, label: 'Document Library', icon: FolderKanban, badge: '5 Files' },
    { id: 'eval' as ActiveTab, label: 'RAG Quality Eval', icon: BarChart3, badge: '94%' },
    { id: 'admin' as ActiveTab, label: 'Admin & Audit Logs', icon: ShieldCheck, roleRestricted: false },
  ];

  return (
    <aside className="w-64 border-r border-slate-800/80 bg-[#0E1420]/80 backdrop-blur-md flex flex-col justify-between h-[calc(100vh-4rem)] shrink-0 select-none">
      {/* Upper Navigation Section */}
      <div className="p-3 space-y-6 overflow-y-auto">
        {/* Main Tab Links */}
        <div>
          <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Platform Workspaces
          </div>
          <nav className="space-y-1">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                    isActive
                      ? 'bg-gradient-to-r from-brand-600/30 to-brand-500/10 text-white border border-brand-500/40 shadow-sm shadow-brand-500/10'
                      : 'text-slate-400 hover:bg-surface-50/80 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-brand-400' : 'text-slate-400 group-hover:text-slate-200'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                      isActive ? 'bg-brand-500/30 text-brand-200' : 'bg-slate-800/80 text-slate-400'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Multi-turn Research Sessions */}
        <div className="pt-2 border-t border-slate-800/60">
          <div className="flex items-center justify-between px-3 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <History className="w-3 h-3 text-brand-400" />
              Research Sessions
            </span>
            <button
              onClick={onNewSession}
              title="Start New Research Session"
              className="p-1 rounded bg-brand-500/20 text-brand-300 hover:bg-brand-500/30 transition-colors border border-brand-500/30"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-1">
            {sessions.map((sess) => {
              const isSelected = activeSessionId === sess.id && activeTab === 'chat';
              return (
                <button
                  key={sess.id}
                  onClick={() => {
                    onSelectSession(sess.id);
                    onTabChange('chat');
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all border ${
                    isSelected
                      ? 'bg-surface-100 text-slate-100 border-brand-500/40 font-medium'
                      : 'text-slate-400 hover:bg-surface-50/60 hover:text-slate-300 border-transparent'
                  }`}
                >
                  <div className="truncate font-medium flex items-center gap-1.5">
                    <FileText className={`w-3 h-3 shrink-0 ${isSelected ? 'text-brand-400' : 'text-slate-400'}`} />
                    <span className="truncate">{sess.title}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1 text-[10px] text-slate-400">
                    <span>{sess.category}</span>
                    <span className="font-mono text-slate-400">{sess.updatedAt}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Footer: Platform Team Credits */}
      <div className="p-3 border-t border-slate-800/80 bg-surface-50/40">
        <div className="px-2 py-2 rounded-xl bg-surface-100/60 border border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-accent-purple" />
              Engineering Team
            </span>
            <span className="px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-300 text-[10px] font-mono border border-purple-500/20">
              NewsIntel
            </span>
          </div>

          <div className="text-[10px] text-slate-400 space-y-1 font-mono">
            <div className="flex justify-between">
              <span className="text-slate-300">Ashik</span>
              <span className="text-slate-400">Frontend / UI-UX</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Saideep</span>
              <span className="text-slate-400">Backend / Platform</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Shreeya</span>
              <span className="text-slate-400">AI/ML Pipeline</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
