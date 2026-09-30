import React, { useState } from 'react';
import { Sparkles, ArrowRight, Search, FileText, Zap, ShieldCheck, Users } from 'lucide-react';

interface LandingHeroProps {
  onLaunchApp: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onLaunchApp }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChipClick = (query: string) => {
    setSearchQuery(query);
    onLaunchApp();
  };

  return (
    <section className="relative z-10 pt-16 pb-20 md:pt-24 md:pb-28 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 text-center text-slate-100">
      
      {/* Clean Centered Main Hero Block */}
      <div className="flex flex-col items-center justify-center space-y-8 max-w-4xl mx-auto mb-16">

        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 border border-slate-700/80 text-blue-300 text-xs sm:text-sm font-semibold shadow-xl backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span>AI-Powered News Intelligence Platform</span>
        </div>

        {/* Clean Headline: White 'Turn News Into' & Sky Blue 'Intelligence.' */}
        <h1 className="text-5xl sm:text-7xl lg:text-[80px] font-extrabold tracking-tight leading-[1.12]">
          <span className="text-white block">Turn News Into</span>
          <span className="text-[#38BDF8] block">Intelligence.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-slate-300 leading-relaxed max-w-2xl font-normal">
          Search, analyze, and connect information from thousands of verified news sources with AI-powered RAG research and source-backed evidence.
        </p>

        {/* Search Console Bar */}
        <div className="w-full max-w-2xl space-y-4 pt-2">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-slate-400 absolute left-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onLaunchApp()}
              placeholder="Ask any news research question..."
              className="w-full bg-[#0D1527]/95 backdrop-blur-2xl border border-blue-500/40 rounded-2xl py-4 pl-14 pr-36 text-base text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-500/20 transition-all shadow-2xl"
            />
            <button
              onClick={onLaunchApp}
              className="absolute right-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2"
            >
              <span>Research</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Sample Query Chips */}
          <div className="flex items-center justify-center flex-wrap gap-2.5 text-xs sm:text-sm text-slate-400 pt-1">
            <span className="text-xs font-mono text-slate-400 font-semibold">Trending Queries:</span>
            <button
              onClick={() => handleChipClick("US Election 2024")}
              className="px-3 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-medium transition-colors shadow-sm"
            >
              US Election 2024
            </button>
            <button
              onClick={() => handleChipClick("Israel-Hamas Conflict")}
              className="px-3 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-medium transition-colors shadow-sm"
            >
              Israel-Hamas Conflict
            </button>
            <button
              onClick={() => handleChipClick("Global Economy")}
              className="px-3 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-medium transition-colors shadow-sm"
            >
              Global Economy
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-center gap-6 text-sm font-medium text-slate-400">
          <span className="text-slate-200 font-semibold">Search</span> • 
          <span className="text-slate-200 font-semibold">Analyze</span> • 
          <span className="text-slate-200 font-semibold">Discover</span> • 
          <span className="text-slate-200 font-semibold">Verify</span>
        </div>

      </div>

      {/* Enterprise Metrics & Stats Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-6 text-left">
        <div className="bg-[#0D1527]/90 backdrop-blur-md p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all flex items-center gap-4 shadow-xl">
          <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold font-mono text-white tracking-tight">1,284+</div>
            <div className="text-xs font-medium text-slate-300">Verified News Sources</div>
            <div className="text-[11px] font-mono text-blue-400 pt-0.5">+14% this month</div>
          </div>
        </div>

        <div className="bg-[#0D1527]/90 backdrop-blur-md p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all flex items-center gap-4 shadow-xl">
          <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400 shrink-0">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold font-mono text-white tracking-tight">142ms</div>
            <div className="text-xs font-medium text-slate-300">Semantic Search Latency</div>
            <div className="text-[11px] font-mono text-purple-400 pt-0.5">Sub-second RAG</div>
          </div>
        </div>

        <div className="bg-[#0D1527]/90 backdrop-blur-md p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all flex items-center gap-4 shadow-xl">
          <div className="w-12 h-12 rounded-xl bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold font-mono text-white tracking-tight">100%</div>
            <div className="text-xs font-medium text-slate-300">Source-Backed Grounding</div>
            <div className="text-[11px] font-mono text-emerald-400 pt-0.5">Zero Hallucination</div>
          </div>
        </div>

        <div className="bg-[#0D1527]/90 backdrop-blur-md p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all flex items-center gap-4 shadow-xl">
          <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold font-mono text-white tracking-tight">24+</div>
            <div className="text-xs font-medium text-slate-300">Enterprise Newsrooms</div>
            <div className="text-[11px] font-mono text-indigo-400 pt-0.5">Active Teams</div>
          </div>
        </div>
      </div>

    </section>
  );
};


