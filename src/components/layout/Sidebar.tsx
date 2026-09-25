import React from 'react';
import { NavigationPage } from '../../types';
import { 
  FileText, 
  Search, 
  Files, 
  Folder, 
  Bookmark, 
  Activity, 
  ShieldCheck, 
  Settings, 
  Globe
} from 'lucide-react';

interface SidebarProps {
  currentPage: NavigationPage;
  onNavigate: (page: NavigationPage) => void;
  documentCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  documentCount,
}) => {
  const navItems: { id: NavigationPage; label: string; icon: React.ElementType; count?: number }[] = [
    { id: 'landing', label: 'Public Landing Page', icon: Globe },
    { id: 'research', label: 'Research Workspace', icon: Search },
    { id: 'documents', label: 'Documents', icon: Files, count: documentCount },
    { id: 'collections', label: 'Collections', icon: Folder },
    { id: 'saved', label: 'Saved Research', icon: Bookmark },
    { id: 'activity', label: 'Activity', icon: Activity },
    { id: 'admin', label: 'Admin Dashboard', icon: ShieldCheck },
  ];

  return (
    <aside className="w-60 bg-panel border-r border-border flex flex-col justify-between h-screen shrink-0 select-none">
      {/* Top Header Logo */}
      <div>
        <div 
          onClick={() => onNavigate('landing')}
          className="h-14 px-5 border-b border-border flex items-center gap-2.5 cursor-pointer hover:bg-slate-900 transition-colors"
          title="Go to Public Landing Page"
        >
          <div className="w-7 h-7 rounded bg-blue-600 text-white flex items-center justify-center font-bold">
            <FileText className="w-4 h-4" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-base tracking-tight text-white">NewsIntel</span>
            <span className="text-[10px] font-mono font-medium px-1.5 py-0.2 bg-slate-800 text-slate-300 rounded border border-slate-700">
              v2.4
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-3 space-y-0.5">
          <div className="px-2 py-1.5 text-[11px] font-semibold uppercase text-slate-400 tracking-wider">
            Workspace
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id || (currentPage === 'results' && item.id === 'research') || (currentPage === 'doc-viewer' && item.id === 'documents');

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 font-semibold'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.count !== undefined && (
                  <span className="text-xs font-mono px-1.5 py-0.2 bg-slate-800 text-slate-300 rounded border border-slate-700">
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile & Settings Section */}
      <div className="p-3 border-t border-border space-y-1">
        <button
          onClick={() => alert('NewsIntel Platform Settings: Enterprise RAG Indexing & Model Config.')}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <Settings className="w-4 h-4 text-slate-400" />
          <span>Settings</span>
        </button>

        <div className="pt-2 border-t border-border/60 px-3 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shadow-sm">
              A
            </div>
            <div className="text-left">
              <div className="text-xs font-semibold text-white leading-tight">Ashik</div>
              <div className="text-[11px] text-slate-400">Senior Journalist</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
