import React from 'react';
import { Newspaper, ArrowRight } from 'lucide-react';

interface LandingHeaderProps {
  scrolled: boolean;
  onLaunchApp: () => void;
}

export const LandingHeader: React.FC<LandingHeaderProps> = ({ scrolled, onLaunchApp }) => (
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

      <div className="flex items-center gap-4">
        <button onClick={onLaunchApp} className="text-sm font-medium text-slate-300 hover:text-white transition-colors hidden sm:block">
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
    </div>
  </header>
);
