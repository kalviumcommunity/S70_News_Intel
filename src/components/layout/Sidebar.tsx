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
  User, 
  ChevronRight
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
    { id: 'research', label: 'Research', icon: Search },
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
        <div className="h-14 px-5 border-b border-border flex items-center gap-2.5">
          <div className="w-7 h-7 rounded bg-navy-800 text-white flex items-center justify-center font-bold">
            <FileText className="w-4 h-4" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-base tracking-tight text-ink-900">NewsIntel</span>
            <span className="text-[10px] font-mono font-medium px-1.5 py-0.2 bg-gray-100 text-ink-500 rounded border border-gray-200">
              v1.0
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-3 space-y-0.5">
          <div className="px-2 py-1.5 text-[11px] font-semibold uppercase text-ink-400 tracking-wider">
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
                    ? 'bg-navy-50 text-navy-800 font-semibold'
                    : 'text-ink-700 hover:bg-gray-100 hover:text-ink-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-navy-800' : 'text-ink-500'}`} />
                  <span>{item.label}</span>
                </div>
                {item.count !== undefined && (
                  <span className="text-xs font-mono px-1.5 py-0.2 bg-gray-100 text-ink-500 rounded">
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
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded text-sm font-medium text-ink-700 hover:bg-gray-100 hover:text-ink-900 transition-colors"
        >
          <Settings className="w-4 h-4 text-ink-500" />
          <span>Settings</span>
        </button>

        <div className="pt-2 border-t border-border/60 px-3 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-navy-800 text-white flex items-center justify-center text-xs font-bold">
              A
            </div>
            <div className="text-left">
              <div className="text-xs font-semibold text-ink-900 leading-tight">Ashik</div>
              <div className="text-[11px] text-ink-500">Senior Journalist</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
