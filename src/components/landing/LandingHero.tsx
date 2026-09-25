import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { STATS_BAR } from './landingData';

interface LandingHeroProps {
  onLaunchApp: () => void;
}

// Multi-color character palettes (cyan, blue, purple, pink, emerald, amber, rose)
const COLOR_GRADIENTS = [
  'from-cyan-300 to-blue-500',
  'from-blue-400 to-indigo-500',
  'from-indigo-300 to-purple-500',
  'from-purple-300 to-pink-500',
  'from-pink-300 to-rose-500',
  'from-emerald-300 to-teal-500',
  'from-amber-300 to-orange-500',
  'from-sky-300 to-cyan-500',
];

const MultiColorText: React.FC<{ text: string }> = ({ text }) => {
  let charCounter = 0;
  return (
    <span>
      {text.split('').map((char, index) => {
        if (char === ' ') return <span key={index}> </span>;
        const gradientClass = COLOR_GRADIENTS[charCounter % COLOR_GRADIENTS.length];
        charCounter++;
        return (
          <span
            key={index}
            className={`inline-block pb-3 bg-gradient-to-b ${gradientClass} bg-clip-text text-transparent drop-shadow-md font-extrabold`}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
};

export const LandingHero: React.FC<LandingHeroProps> = ({ onLaunchApp }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChipClick = (query: string) => {
    setSearchQuery(query);
    onLaunchApp();
  };

  return (
    <section className="relative z-10 pt-16 pb-20 md:pt-28 md:pb-28 max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 space-y-16 text-center">
      
      {/* Expanded Main Hero Block */}
      <div className="flex flex-col items-center justify-center space-y-8 max-w-5xl mx-auto">
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 border border-slate-700/80 text-blue-300 text-xs sm:text-sm font-semibold shadow-xl">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span>AI-Powered News Intelligence Platform</span>
        </div>

        {/* Scaled Up 84px Multi-Color Headline with full descender clearance */}
        <h1 className="text-5xl sm:text-7xl lg:text-[84px] font-extrabold tracking-tight leading-[1.18]">
          <MultiColorText text="Turn News Into" /> <br />
          <MultiColorText text="Intelligence." />
        </h1>

        {/* Scaled Up Subtitle */}
        <p className="text-lg sm:text-2xl text-slate-300 leading-relaxed max-w-3xl font-medium">
          Search, analyze, and connect information from thousands of verified news sources with AI-powered RAG research and source-backed evidence.
        </p>

        {/* Scaled Up Search Console Bar */}
        <div className="w-full max-w-2xl space-y-4 pt-2">
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onLaunchApp()}
              placeholder="Ask any news research question..."
              className="w-full bg-[#0D1527]/95 backdrop-blur-2xl border-2 border-blue-500/50 rounded-2xl py-4.5 pl-6 pr-40 text-base sm:text-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-500/30 transition-all shadow-2xl"
            />
            <button
              onClick={onLaunchApp}
              className="absolute right-3 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl shadow-xl shadow-blue-600/30 transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Research</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Clickable Quick Sample Query Chips */}
          <div className="flex items-center justify-center flex-wrap gap-2.5 text-xs sm:text-sm text-slate-400 pt-1">
            <span className="text-xs font-mono text-slate-400 font-semibold">Trending Queries:</span>
            <button
              onClick={() => handleChipClick("Semiconductor Fab Expansion")}
              className="px-3 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-medium transition-colors shadow-sm"
            >
              Semiconductor Fab Subsidies
            </button>
            <button
              onClick={() => handleChipClick("Indian AI Startup Funding")}
              className="px-3 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-medium transition-colors shadow-sm"
            >
              Venture AI Investments
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800/80 flex items-center justify-center gap-6 text-sm font-medium text-slate-400">
          <span className="text-slate-200 font-semibold">Search</span> • 
          <span className="text-slate-200 font-semibold">Analyze</span> • 
          <span className="text-slate-200 font-semibold">Discover</span> • 
          <span className="text-slate-200 font-semibold">Verify</span>
        </div>

      </div>

      {/* Enterprise Metrics & Stats Banner */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-6 text-left">
        {STATS_BAR.map((stat, i) => (
          <div key={i} className="bg-[#0D1527]/90 backdrop-blur-md p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all space-y-1.5 shadow-xl">
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight">{stat.value}</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-300">{stat.label}</div>
            <div className="text-xs font-mono text-blue-400 pt-0.5">{stat.change}</div>
          </div>
        ))}
      </div>

    </section>
  );
};
