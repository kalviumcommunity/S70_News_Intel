import React from 'react';
import { Newspaper, ArrowRight, LogOut, User as UserIcon } from 'lucide-react';
import { User } from '../../types';

interface LandingHeaderProps {
  scrolled: boolean;
  onLaunchApp: () => void;
  currentUser: User | null;
  onOpenLogin: () => void;
  onSignOut: () => void;
}

export const LandingHeader: React.FC<LandingHeaderProps> = ({ 
  scrolled, 
  onLaunchApp,
  currentUser,
  onOpenLogin,
  onSignOut
}) => (
  <header className={`sticky top-0 z-50 transition-all duration-300 ${
    scrolled 
      ? 'bg-[#070A0F]/85 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl shadow-black/40' 
      : 'bg-transparent border-b border-white/5'
  }`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <div className="flex items-center gap-3 cursor-pointer" onClick={onLaunchApp}>
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-600/20">
          <Newspaper className="w-4 h-4" />
        </div>
        <span className="font-bold text-lg text-white tracking-tight">NewsIntel</span>
      </div>

      <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
        <a href="#product" className="hover:text-white transition-colors">Product</a>
        <a href="#features" className="hover:text-white transition-colors">Features</a>
        <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
      </nav>

      <div className="flex items-center gap-3">
        {currentUser ? (
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-slate-800/80 border border-slate-700/80 rounded-full text-xs text-slate-200">
              <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <span className="font-medium text-white">{currentUser.name}</span>
            </div>

            <button
              onClick={onLaunchApp}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm px-4 py-2 rounded-lg border border-blue-400/30 shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Go to Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onSignOut}
              title="Sign Out"
              className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenLogin}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-800/50"
            >
              Sign In
            </button>
            <button
              onClick={onLaunchApp}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm px-4 py-2 rounded-lg border border-blue-400/30 shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Try NewsIntel</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  </header>
);
