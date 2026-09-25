import React from 'react';
import { 
  Clock, Network, ShieldCheck, Search, Sparkles, Building2, GitCompare, Newspaper, Database, Cpu, Layers, ArrowRight, CheckCircle2 
} from 'lucide-react';
import { PROBLEM_CARDS, FEATURES_LIST, WORKFLOW_STEPS, USE_CASES } from './landingData';

export const ProblemSection: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    Clock: <Clock className="w-5 h-5 text-blue-400" />,
    Network: <Network className="w-5 h-5 text-cyan-400" />,
    ShieldCheck: <ShieldCheck className="w-5 h-5 text-indigo-400" />,
  };

  return (
    <section className="py-20 border-t border-slate-800/80 bg-[#0D1527]/70 backdrop-blur-sm bg-striped-lines-dense">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            The News Is Everywhere. The Intelligence Isn't.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Modern newsrooms, financial analysts, and researchers waste hours sifting through noisy feeds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROBLEM_CARDS.map((card, i) => (
            <div key={i} className="bg-[#111A2E]/90 p-8 rounded-xl border border-slate-700/60 hover:border-blue-500/50 transition-all space-y-4 shadow-xl">
              <div className="w-10 h-10 rounded-lg bg-slate-900/80 border border-slate-700 flex items-center justify-center">
                {iconMap[card.icon]}
              </div>
              <h3 className="text-xl font-bold text-white">{card.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const RAGWorkflowSection: React.FC = () => {
  return (
    <section id="workflow" className="py-20 border-t border-slate-800/80 bg-[#0A0F1D]/90 bg-striped-lines">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950 text-blue-400 border border-blue-800 text-xs font-mono font-semibold">
            <span>RAG ARCHITECTURE PIPELINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How NewsIntel Delivers Grounded Answers
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            From multi-format document ingestion to semantic hybrid search and evidence citation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WORKFLOW_STEPS.map((step, i) => (
            <div key={i} className="bg-[#111A2E]/90 p-6 rounded-xl border border-slate-800 hover:border-slate-700 transition-all space-y-3 relative">
              <div className="text-xs font-mono font-bold text-blue-400">STEP {step.step}</div>
              <h3 className="text-lg font-bold text-white">{step.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const FeaturesSection: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    Search: <Search className="w-5 h-5 text-blue-400" />,
    Sparkles: <Sparkles className="w-5 h-5 text-cyan-400" />,
    ShieldCheck: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
    Building2: <Building2 className="w-5 h-5 text-indigo-400" />,
    Clock: <Clock className="w-5 h-5 text-amber-400" />,
    GitCompare: <GitCompare className="w-5 h-5 text-slate-300" />,
  };

  return (
    <section id="features" className="py-20 border-t border-slate-800/80 bg-[#0D1527]/70 backdrop-blur-sm bg-striped-lines-dense">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Built for Enterprise Research Speed & Precision
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Six core capabilities that transform raw news feeds into actionable intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES_LIST.map((feat, i) => (
            <div key={i} className="bg-[#111A2E]/90 p-8 rounded-xl border border-slate-700/60 hover:border-blue-500/50 transition-all space-y-4 shadow-xl">
              <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center">
                {iconMap[feat.icon]}
              </div>
              <h3 className="text-xl font-bold text-white">{feat.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const UseCasesSection: React.FC = () => {
  return (
    <section className="py-20 border-t border-slate-800/80 bg-[#0A0F1D]/90 bg-striped-lines">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Tailored for High-Stakes Workflows
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Empowering corporate strategy, financial markets, newsrooms, and policy research teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {USE_CASES.map((uc, i) => (
            <div key={i} className="bg-[#111A2E]/90 p-6 rounded-xl border border-slate-800 hover:border-slate-700 transition-all space-y-3">
              <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-wider block">{uc.category}</span>
              <h3 className="text-base font-bold text-white">{uc.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{uc.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const LandingFooter: React.FC = () => (
  <footer className="py-12 border-t border-slate-800/80 bg-[#070A0F] text-slate-400 text-xs">
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <Newspaper className="w-4 h-4 text-blue-500" />
        <span className="font-bold text-white">NewsIntel Enterprise</span>
      </div>
      <div>© 2026 NewsIntel. Enterprise RAG News Research Platform.</div>
    </div>
  </footer>
);
